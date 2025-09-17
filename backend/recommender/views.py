import json
from pathlib import Path
from typing import List

import joblib
import numpy as np
from django.conf import settings
from django.db import transaction
from rest_framework import permissions, status, views
from rest_framework.response import Response

from .models import QuizAnswer, ModelArtifact
from .serializers import QuizSubmissionSerializer

MODEL_NAME = "mlp_course_recommender"
MODEL_DIR = Path(settings.BASE_DIR) / "models"
MODEL_PATH = MODEL_DIR / f"{MODEL_NAME}.joblib"

COURSES = [
    "B.Tech Computer Science",
    "B.Sc Physics",
    "B.Com Accounting",
    "B.A. Psychology",
    "BBA Management",
    "B.Sc Biology",
    "B.A. Design",
    "BPEd Sports Science",
]

class PredictView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = QuizSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        answers: List[str] = serializer.validated_data["answers"]

        # Persist answers (skip if no user)
        if hasattr(request, 'user') and request.user.is_authenticated:
            with transaction.atomic():
                QuizAnswer.objects.filter(user=request.user).delete()
                for idx, ans in enumerate(answers):
                    QuizAnswer.objects.create(user=request.user, question_index=idx, answer_text=ans)

        # Load model (fallback to heuristic if not trained)
        model = None
        try:
            if MODEL_PATH.exists():
                model = joblib.load(MODEL_PATH)
        except Exception as e:
            print(f"Model loading error: {e}")
            model = None

        # Simple encoding: bag of keywords per answer
        def encode(ans_list: List[str]):
            vocab = {
                "computer": 0,
                "program": 1,
                "math": 2,
                "physics": 3,
                "chem": 4,
                "bio": 5,
                "business": 6,
                "account": 7,
                "design": 8,
                "art": 9,
                "psych": 10,
                "sport": 11,
                "manage": 12,
                "history": 13,
                "language": 14,
            }
            x = np.zeros(len(vocab), dtype=float)
            text = " ".join(ans_list).lower()
            for token, idx in vocab.items():
                if token in text:
                    x[idx] = 1.0
            return x.reshape(1, -1)

        X = encode(answers)

        # Predict scores per course
        if model is not None:
            try:
                scores = model.predict_proba(X)[0]
                # assume model classes aligned to COURSES
                pairs = list(zip(COURSES, scores))
            except Exception:
                # fallback heuristic if model incompatible
                pairs = self._heuristic_scores(answers)
        else:
            pairs = self._heuristic_scores(answers)

        # Normalize to percentage and top N
        total = sum(p for _, p in pairs) or 1.0
        ranked = sorted(((c, (p / total) * 100.0) for c, p in pairs), key=lambda t: t[1], reverse=True)[:5]

        return Response({
            "recommendations": [
                {"course": c, "match": round(m, 1)} for c, m in ranked
            ]
        })

    def _heuristic_scores(self, answers: List[str]):
        text = " ".join(answers).lower()
        scores = []
        def s(*keys):
            return sum(1 for k in keys if k in text) or 0.5
        scores.append(("B.Tech Computer Science", s("computer", "program", "technology", "coding", "cs")))
        scores.append(("B.Sc Physics", s("physics", "math", "experiment")))
        scores.append(("B.Com Accounting", s("business", "commerce", "account")))
        scores.append(("B.A. Psychology", s("psych", "help", "society")))
        scores.append(("BBA Management", s("manage", "lead", "organize")))
        scores.append(("B.Sc Biology", s("bio", "medicine", "health")))
        scores.append(("B.A. Design", s("design", "art", "creative")))
        scores.append(("BPEd Sports Science", s("sport", "fitness", "physical")))
        # scale
        maxv = max(p for _, p in scores) or 1.0
        return [(c, p / maxv) for c, p in scores]
