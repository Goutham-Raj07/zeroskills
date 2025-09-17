from django.core.management.base import BaseCommand
from pathlib import Path
import numpy as np
from sklearn.neural_network import MLPClassifier
import joblib
from django.conf import settings

MODEL_DIR = Path(settings.BASE_DIR) / "models"
MODEL_DIR.mkdir(exist_ok=True)
MODEL_PATH = MODEL_DIR / "mlp_course_recommender.joblib"

class Command(BaseCommand):
    help = "Train a simple MLP model for course recommendation"

    def handle(self, *args, **options):
        # Tiny synthetic dataset: features=15 (keyword bag), classes=8 courses
        # NOTE: Replace with real labeled data later
        X = []
        y = []
        def vec(tokens):
            vocab = [
                "computer","program","math","physics","chem","bio","business","account","design","art","psych","sport","manage","history","language"
            ]
            v = np.zeros(len(vocab))
            for t in tokens:
                if t in vocab:
                    v[vocab.index(t)] = 1
            return v
        # Examples per course id
        # 0: CS, 1: Physics, 2: Commerce, 3: Psychology, 4: Management, 5: Biology, 6: Design, 7: Sports
        samples = [
            (vec(["computer","program","math"]), 0),
            (vec(["physics","math","chem"]), 1),
            (vec(["business","account","math"]), 2),
            (vec(["psych","help","language"]), 3),
            (vec(["manage","business","language"]), 4),
            (vec(["bio","chem","medicine"]), 5),
            (vec(["design","art","creative"]), 6),
            (vec(["sport","fitness","physical"]), 7),
        ]
        for v, label in samples:
            X.append(v); y.append(label)
        X = np.array(X)
        y = np.array(y)

        clf = MLPClassifier(hidden_layer_sizes=(32,16), max_iter=500, random_state=42)
        clf.fit(X, y)
        joblib.dump(clf, MODEL_PATH)
        self.stdout.write(self.style.SUCCESS(f"Model trained and saved to {MODEL_PATH}"))
