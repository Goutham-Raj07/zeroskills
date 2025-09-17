from django.conf import settings
from django.db import models

class QuizAnswer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="quiz_answers")
    question_index = models.PositiveIntegerField()
    answer_text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class ModelArtifact(models.Model):
    name = models.CharField(max_length=100, unique=True)
    version = models.CharField(max_length=50)
    file_path = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
