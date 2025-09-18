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
