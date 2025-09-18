from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import (
    User, StudentProfile, MentorProfile, AlumniProfile,
    VirtualLabCourse, VirtualLabModule, VirtualLabExercise,
    VirtualLabEnrollment, VirtualLabProgress, VirtualLabSession
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "role"]

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name", "password", "role"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        role = validated_data.get("role", User.Role.STUDENT)
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        # create role-specific profile
        if role == User.Role.STUDENT:
            StudentProfile.objects.get_or_create(user=user)
        elif role == User.Role.MENTOR:
            MentorProfile.objects.get_or_create(user=user)
        elif role == User.Role.ALUMNI:
            AlumniProfile.objects.get_or_create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.Role.choices, required=False)

    def validate(self, attrs):
        user = authenticate(username=attrs.get("username"), password=attrs.get("password"))
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        requested_role = attrs.get("role")
        if requested_role and user.role != requested_role:
            raise serializers.ValidationError("Role mismatch for this account")
        attrs["user"] = user
        return attrs

# Virtual Lab Serializers
class VirtualLabExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = VirtualLabExercise
        fields = [
            'id', 'title', 'description', 'duration', 'order',
            'code_template', 'expected_output', 'test_cases', 'hints'
        ]

class VirtualLabModuleSerializer(serializers.ModelSerializer):
    exercises = VirtualLabExerciseSerializer(many=True, read_only=True)
    
    class Meta:
        model = VirtualLabModule
        fields = [
            'id', 'title', 'description', 'duration', 'order', 'exercises'
        ]

class VirtualLabCourseSerializer(serializers.ModelSerializer):
    modules = VirtualLabModuleSerializer(many=True, read_only=True)
    
    class Meta:
        model = VirtualLabCourse
        fields = [
            'id', 'title', 'description', 'type', 'duration', 'difficulty',
            'category', 'rating', 'enrolled_count', 'completion_rate',
            'lab_count', 'prerequisites', 'skills', 'projects',
            'instructor_name', 'instructor_title', 'instructor_avatar',
            'created_at', 'updated_at', 'is_active', 'modules'
        ]

class VirtualLabProgressSerializer(serializers.ModelSerializer):
    exercise_title = serializers.CharField(source='exercise.title', read_only=True)
    
    class Meta:
        model = VirtualLabProgress
        fields = [
            'id', 'exercise', 'exercise_title', 'started_at', 'completed_at',
            'is_completed', 'attempts', 'code_submissions', 'test_results', 'score'
        ]

class VirtualLabEnrollmentSerializer(serializers.ModelSerializer):
    course = VirtualLabCourseSerializer(read_only=True)
    progress = VirtualLabProgressSerializer(many=True, read_only=True)
    
    class Meta:
        model = VirtualLabEnrollment
        fields = [
            'id', 'course', 'enrolled_at', 'completed_at', 'is_completed',
            'progress_percentage', 'progress'
        ]

class VirtualLabSessionSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    current_exercise_title = serializers.CharField(source='current_exercise.title', read_only=True)
    
    class Meta:
        model = VirtualLabSession
        fields = [
            'id', 'course', 'course_title', 'current_exercise', 'current_exercise_title',
            'status', 'started_at', 'last_activity', 'session_data', 'total_time_spent'
        ]

class LabCodeSubmissionSerializer(serializers.Serializer):
    code = serializers.CharField()
    exercise_id = serializers.IntegerField()
    
class LabExecutionResultSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    output = serializers.CharField()
    errors = serializers.CharField(allow_blank=True)
    test_results = serializers.ListField()
    score = serializers.FloatField()
    hints = serializers.ListField()
