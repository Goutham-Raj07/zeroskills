from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q, Count, Avg
from django.utils import timezone

from .models import (
    User, VirtualLabCourse, VirtualLabEnrollment, VirtualLabSession,
    VirtualLabProgress, VirtualLabExercise
)
from .serializers import (
    SignupSerializer, LoginSerializer, UserSerializer,
    VirtualLabCourseSerializer, VirtualLabEnrollmentSerializer,
    VirtualLabSessionSerializer, LabCodeSubmissionSerializer,
    LabExecutionResultSerializer, VirtualLabProgressSerializer
)
import json
import subprocess
import tempfile
import os

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        data = {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user).data,
        }
        return Response(data)

class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# Virtual Lab API Views
class VirtualLabCourseListView(generics.ListAPIView):
    serializer_class = VirtualLabCourseSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = VirtualLabCourse.objects.filter(is_active=True)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category and category != 'All':
            queryset = queryset.filter(category=category)
        
        # Filter by difficulty
        difficulty = self.request.query_params.get('difficulty')
        if difficulty and difficulty != 'All':
            queryset = queryset.filter(difficulty=difficulty)
        
        # Filter by type
        lab_type = self.request.query_params.get('type')
        if lab_type and lab_type != 'all':
            queryset = queryset.filter(type=lab_type)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(skills__icontains=search)
            )
        
        return queryset.order_by('-rating', '-enrolled_count')

class VirtualLabCourseDetailView(generics.RetrieveAPIView):
    serializer_class = VirtualLabCourseSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'
    queryset = VirtualLabCourse.objects.filter(is_active=True)

class VirtualLabEnrollmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, course_id):
        try:
            course = VirtualLabCourse.objects.get(id=course_id, is_active=True)
        except VirtualLabCourse.DoesNotExist:
            return Response(
                {'error': 'Course not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if already enrolled
        enrollment, created = VirtualLabEnrollment.objects.get_or_create(
            user=request.user,
            course=course
        )
        
        if not created:
            return Response(
                {'message': 'Already enrolled in this course'},
                status=status.HTTP_200_OK
            )
        
        # Update enrollment count
        course.enrolled_count += 1
        course.save()
        
        serializer = VirtualLabEnrollmentSerializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class VirtualLabSessionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, course_id):
        try:
            session = VirtualLabSession.objects.get(
                user=request.user,
                course_id=course_id,
                status='active'
            )
        except VirtualLabSession.DoesNotExist:
            return Response(
                {'error': 'No active session found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = VirtualLabSessionSerializer(session)
        return Response(serializer.data)
    
    def post(self, request, course_id):
        try:
            course = VirtualLabCourse.objects.get(id=course_id, is_active=True)
        except VirtualLabCourse.DoesNotExist:
            return Response(
                {'error': 'Course not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if user is enrolled
        try:
            enrollment = VirtualLabEnrollment.objects.get(
                user=request.user,
                course=course
            )
        except VirtualLabEnrollment.DoesNotExist:
            return Response(
                {'error': 'You must enroll in this course first'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create or get active session
        session, created = VirtualLabSession.objects.get_or_create(
            user=request.user,
            course=course,
            status='active',
            defaults={'session_data': {}}
        )
        
        if not created:
            session.last_activity = timezone.now()
            session.save()
        
        serializer = VirtualLabSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def execute_code(request):
    """Execute code and return results"""
    serializer = LabCodeSubmissionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    code = serializer.validated_data['code']
    exercise_id = serializer.validated_data['exercise_id']
    
    try:
        exercise = VirtualLabExercise.objects.get(id=exercise_id)
    except VirtualLabExercise.DoesNotExist:
        return Response(
            {'error': 'Exercise not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Execute code (simplified version - in production, use secure containers)
    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            f.write(code)
            temp_file = f.name
        
        # Execute code
        result = subprocess.run(
            ['python', temp_file],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        # Clean up
        os.unlink(temp_file)
        
        output = result.stdout
        errors = result.stderr
        
        # Run test cases
        test_results = []
        score = 0.0
        
        for i, test_case in enumerate(exercise.test_cases):
            test_passed = False
            try:
                # Simple test execution (in production, use proper testing framework)
                test_result = subprocess.run(
                    ['python', '-c', f"{code}\n{test_case}"],
                    capture_output=True,
                    text=True,
                    timeout=5
                )
                test_passed = test_result.returncode == 0
            except:
                test_passed = False
            
            test_results.append({
                'test_case': i + 1,
                'passed': test_passed,
                'expected': test_case.get('expected', ''),
                'actual': output
            })
            
            if test_passed:
                score += 100.0 / len(exercise.test_cases)
        
        # Save progress
        try:
            enrollment = VirtualLabEnrollment.objects.get(
                user=request.user,
                course=exercise.module.course
            )
            progress, created = VirtualLabProgress.objects.get_or_create(
                enrollment=enrollment,
                exercise=exercise
            )
            
            progress.attempts += 1
            progress.code_submissions.append({
                'code': code,
                'timestamp': timezone.now().isoformat(),
                'output': output,
                'errors': errors
            })
            progress.test_results = test_results
            progress.score = score
            
            if score >= 80.0:  # 80% threshold for completion
                progress.is_completed = True
                progress.completed_at = timezone.now()
            
            progress.save()
            
            # Update enrollment progress
            total_exercises = exercise.module.course.modules.aggregate(
                total=Count('exercises')
            )['total'] or 0
            completed_exercises = VirtualLabProgress.objects.filter(
                enrollment=enrollment,
                is_completed=True
            ).count()
            
            enrollment.progress_percentage = (completed_exercises / total_exercises) * 100
            if enrollment.progress_percentage >= 100:
                enrollment.is_completed = True
                enrollment.completed_at = timezone.now()
            enrollment.save()
            
        except VirtualLabEnrollment.DoesNotExist:
            pass  # User not enrolled, but still execute code
        
        return Response({
            'success': result.returncode == 0,
            'output': output,
            'errors': errors,
            'test_results': test_results,
            'score': score,
            'hints': exercise.hints if score < 50 else []
        })
        
    except subprocess.TimeoutExpired:
        return Response({
            'success': False,
            'output': '',
            'errors': 'Code execution timed out',
            'test_results': [],
            'score': 0.0,
            'hints': ['Your code is taking too long to execute. Try optimizing it.']
        })
    except Exception as e:
        return Response({
            'success': False,
            'output': '',
            'errors': str(e),
            'test_results': [],
            'score': 0.0,
            'hints': ['There was an error executing your code. Check the syntax.']
        })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_enrollments(request):
    """Get user's lab enrollments"""
    enrollments = VirtualLabEnrollment.objects.filter(user=request.user)
    serializer = VirtualLabEnrollmentSerializer(enrollments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def lab_analytics(request, course_id):
    """Get lab analytics for a course"""
    try:
        course = VirtualLabCourse.objects.get(id=course_id)
    except VirtualLabCourse.DoesNotExist:
        return Response(
            {'error': 'Course not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Get user's progress
    try:
        enrollment = VirtualLabEnrollment.objects.get(
            user=request.user,
            course=course
        )
        progress_data = VirtualLabProgressSerializer(
            enrollment.progress.all(), many=True
        ).data
    except VirtualLabEnrollment.DoesNotExist:
        progress_data = []
    
    # Course statistics
    total_enrollments = course.enrollments.count()
    completed_enrollments = course.enrollments.filter(is_completed=True).count()
    avg_progress = course.enrollments.aggregate(
        avg_progress=Avg('progress_percentage')
    )['avg_progress'] or 0
    
    return Response({
        'course_id': course_id,
        'total_enrollments': total_enrollments,
        'completed_enrollments': completed_enrollments,
        'completion_rate': (completed_enrollments / total_enrollments * 100) if total_enrollments > 0 else 0,
        'average_progress': avg_progress,
        'user_progress': progress_data
    })
