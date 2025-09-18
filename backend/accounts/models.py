from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        STUDENT = "student", "Student"
        MENTOR = "mentor", "Mentor"
        ALUMNI = "alumni", "Alumni"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.STUDENT)

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    grade = models.CharField(max_length=50, blank=True)
    school = models.CharField(max_length=255, blank=True)

class MentorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="mentor_profile")
    specialization = models.CharField(max_length=255, blank=True)
    years_experience = models.PositiveIntegerField(default=0)

class AlumniProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="alumni_profile")
    graduation_year = models.PositiveIntegerField(null=True, blank=True)
    current_company = models.CharField(max_length=255, blank=True)

# Virtual Lab Models
class VirtualLabCourse(models.Model):
    LAB_TYPE_CHOICES = [
        ('coding', 'Coding'),
        ('simulation', 'Simulation'),
        ('experiment', 'Experiment'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]
    
    id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=LAB_TYPE_CHOICES)
    duration = models.CharField(max_length=50)  # e.g., "2 hours"
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    category = models.CharField(max_length=100)
    rating = models.FloatField(default=0.0)
    enrolled_count = models.PositiveIntegerField(default=0)
    completion_rate = models.FloatField(default=0.0)
    lab_count = models.PositiveIntegerField(default=0)
    prerequisites = models.JSONField(default=list)
    skills = models.JSONField(default=list)
    projects = models.JSONField(default=list)
    instructor_name = models.CharField(max_length=255, blank=True)
    instructor_title = models.CharField(max_length=255, blank=True)
    instructor_avatar = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

class VirtualLabModule(models.Model):
    course = models.ForeignKey(VirtualLabCourse, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.CharField(max_length=50)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class VirtualLabExercise(models.Model):
    module = models.ForeignKey(VirtualLabModule, on_delete=models.CASCADE, related_name='exercises')
    title = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.CharField(max_length=50)
    order = models.PositiveIntegerField(default=0)
    code_template = models.TextField(blank=True)
    expected_output = models.TextField(blank=True)
    test_cases = models.JSONField(default=list)
    hints = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

class VirtualLabEnrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lab_enrollments')
    course = models.ForeignKey(VirtualLabCourse, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    progress_percentage = models.FloatField(default=0.0)

class VirtualLabProgress(models.Model):
    enrollment = models.ForeignKey(VirtualLabEnrollment, on_delete=models.CASCADE, related_name='progress')
    exercise = models.ForeignKey(VirtualLabExercise, on_delete=models.CASCADE)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    attempts = models.PositiveIntegerField(default=0)
    code_submissions = models.JSONField(default=list)
    test_results = models.JSONField(default=list)
    score = models.FloatField(default=0.0)

class VirtualLabSession(models.Model):
    SESSION_STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
        ('abandoned', 'Abandoned'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lab_sessions')
    course = models.ForeignKey(VirtualLabCourse, on_delete=models.CASCADE, related_name='sessions')
    current_exercise = models.ForeignKey(VirtualLabExercise, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=SESSION_STATUS_CHOICES, default='active')
    started_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    session_data = models.JSONField(default=dict)  # Store current lab state
    total_time_spent = models.DurationField(default=0)