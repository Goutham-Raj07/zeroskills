from rest_framework import serializers

class QuizSubmissionSerializer(serializers.Serializer):
    answers = serializers.ListField(
        child=serializers.CharField(), allow_empty=False, min_length=5
    )

class PredictionSerializer(serializers.Serializer):
    course = serializers.CharField()
    match = serializers.FloatField()
