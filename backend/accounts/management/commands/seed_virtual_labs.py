from django.core.management.base import BaseCommand
from accounts.models import VirtualLabCourse, VirtualLabModule, VirtualLabExercise

class Command(BaseCommand):
    help = 'Seed virtual lab courses with sample data'

    def handle(self, *args, **options):
        # Create Python Programming Lab
        python_course = VirtualLabCourse.objects.create(
            id="CS-PYTHON-101",
            title="Python Programming Lab",
            description="Master Python fundamentals through hands-on coding exercises and real-world projects.",
            type="coding",
            duration="2 hours",
            difficulty="Beginner",
            category="Computer Science",
            rating=4.9,
            enrolled_count=2500,
            completion_rate=94.0,
            lab_count=8,
            prerequisites=["Basic computer literacy"],
            skills=["Python Syntax", "Data Types", "Control Flow", "Functions", "OOP"],
            projects=["Calculator App", "Data Analyzer", "Web Scraper"],
            instructor_name="Dr. Sarah Chen",
            instructor_title="Senior Software Engineer",
            instructor_avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        )

        # Create modules for Python course
        module1 = VirtualLabModule.objects.create(
            course=python_course,
            title="Python Basics",
            description="Learn Python syntax, variables, and basic operations",
            duration="30 minutes",
            order=1
        )

        # Create exercises for module 1
        VirtualLabExercise.objects.create(
            module=module1,
            title="Hello World & Variables",
            description="Write your first Python program and learn about variables",
            duration="10 min",
            order=1,
            code_template="# Write a program that prints 'Hello, World!' and stores your name in a variable\nprint('Hello, World!')\nname = 'Your Name'\nprint(f'My name is {name}')",
            expected_output="Hello, World!\nMy name is Your Name",
            test_cases=[
                {"test": "print('Hello, World!')", "expected": "Hello, World!"},
                {"test": "name = 'Test'; print(f'My name is {name}')", "expected": "My name is Test"}
            ],
            hints=["Use the print() function", "Variables don't need type declaration", "Use f-strings for formatting"]
        )

        VirtualLabExercise.objects.create(
            module=module1,
            title="Data Types & Operations",
            description="Learn about different data types and basic operations",
            duration="10 min",
            order=2,
            code_template="# Create variables of different types and perform operations\nage = 25\nheight = 5.9\nname = 'John'\nis_student = True\n\n# Perform some operations\nprint(f'{name} is {age} years old')\nprint(f'Height: {height} feet')\nprint(f'Is student: {is_student}')",
            expected_output="John is 25 years old\nHeight: 5.9 feet\nIs student: True",
            test_cases=[
                {"test": "age = 20; print(f'Age: {age}')", "expected": "Age: 20"},
                {"test": "height = 6.0; print(f'Height: {height}')", "expected": "Height: 6.0"}
            ],
            hints=["int for whole numbers", "float for decimal numbers", "str for text", "bool for True/False"]
        )

        # Create Molecular Biology Lab
        bio_course = VirtualLabCourse.objects.create(
            id="BIO-MOLECULAR-201",
            title="Molecular Biology Lab",
            description="Explore DNA, RNA, and protein structures through interactive virtual experiments.",
            type="experiment",
            duration="3 hours",
            difficulty="Intermediate",
            category="Life Sciences",
            rating=4.7,
            enrolled_count=1200,
            completion_rate=89.0,
            lab_count=12,
            prerequisites=["Basic biology knowledge"],
            skills=["DNA Extraction", "PCR Techniques", "Gel Electrophoresis", "Protein Analysis"],
            projects=["Gene Mapping", "Protein Structure Analysis", "Mutation Detection"],
            instructor_name="Dr. Michael Rodriguez",
            instructor_title="Molecular Biologist",
            instructor_avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        )

        # Create modules for Biology course
        bio_module1 = VirtualLabModule.objects.create(
            course=bio_course,
            title="DNA Structure & Extraction",
            description="Learn about DNA structure and perform virtual extraction",
            duration="60 minutes",
            order=1
        )

        VirtualLabExercise.objects.create(
            module=bio_module1,
            title="DNA Structure Visualization",
            description="Explore the double helix structure of DNA",
            duration="20 min",
            order=1,
            code_template="# Simulate DNA structure visualization\n# This is a simplified representation\nclass DNA:\n    def __init__(self, sequence):\n        self.sequence = sequence\n    \n    def visualize(self):\n        print(f'DNA Sequence: {self.sequence}')\n        print('Double Helix Structure:')\n        print('A-T')\n        print('T-A')\n        print('G-C')\n        print('C-G')\n\n# Create DNA instance\ndna = DNA('ATCG')\ndna.visualize()",
            expected_output="DNA Sequence: ATCG\nDouble Helix Structure:\nA-T\nT-A\nG-C\nC-G",
            test_cases=[
                {"test": "dna = DNA('GCTA'); dna.visualize()", "expected": "DNA Sequence: GCTA\nDouble Helix Structure:\nA-T\nT-A\nG-C\nC-G"}
            ],
            hints=["DNA has two strands", "A pairs with T", "G pairs with C", "The strands run in opposite directions"]
        )

        # Create Machine Learning Lab
        ml_course = VirtualLabCourse.objects.create(
            id="AI-ML-401",
            title="Machine Learning Lab",
            description="Build and train machine learning models using interactive coding environments.",
            type="coding",
            duration="5 hours",
            difficulty="Advanced",
            category="Artificial Intelligence",
            rating=4.9,
            enrolled_count=1800,
            completion_rate=68.0,
            lab_count=20,
            prerequisites=["Python programming", "Statistics"],
            skills=["Python", "TensorFlow", "Data Preprocessing", "Model Training", "Evaluation"],
            projects=["Image Classifier", "Sentiment Analysis", "Recommendation System"],
            instructor_name="Dr. Alex Kim",
            instructor_title="AI Research Scientist",
            instructor_avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        )

        # Create modules for ML course
        ml_module1 = VirtualLabModule.objects.create(
            course=ml_course,
            title="Introduction to Machine Learning",
            description="Learn the basics of machine learning and data preprocessing",
            duration="90 minutes",
            order=1
        )

        VirtualLabExercise.objects.create(
            module=ml_module1,
            title="Linear Regression from Scratch",
            description="Implement linear regression algorithm from scratch",
            duration="45 min",
            order=1,
            code_template="# Implement Linear Regression from scratch\nimport numpy as np\n\nclass LinearRegression:\n    def __init__(self, learning_rate=0.01, iterations=1000):\n        self.learning_rate = learning_rate\n        self.iterations = iterations\n        self.weights = None\n        self.bias = None\n    \n    def fit(self, X, y):\n        n_samples, n_features = X.shape\n        self.weights = np.zeros(n_features)\n        self.bias = 0\n        \n        for _ in range(self.iterations):\n            y_pred = np.dot(X, self.weights) + self.bias\n            \n            # Compute gradients\n            dw = (1/n_samples) * np.dot(X.T, (y_pred - y))\n            db = (1/n_samples) * np.sum(y_pred - y)\n            \n            # Update parameters\n            self.weights -= self.learning_rate * dw\n            self.bias -= self.learning_rate * db\n    \n    def predict(self, X):\n        return np.dot(X, self.weights) + self.bias\n\n# Test the implementation\nX = np.array([[1], [2], [3], [4]])\ny = np.array([2, 4, 6, 8])\n\nmodel = LinearRegression()\nmodel.fit(X, y)\npredictions = model.predict(X)\nprint(f'Predictions: {predictions}')",
            expected_output="Predictions: [2. 4. 6. 8.]",
            test_cases=[
                {"test": "X = np.array([[1], [2]]); y = np.array([1, 2]); model = LinearRegression(); model.fit(X, y); print(model.predict(X))", "expected": "[1. 2.]"}
            ],
            hints=["Use gradient descent", "Update weights iteratively", "Calculate gradients correctly", "Use appropriate learning rate"]
        )

        self.stdout.write(
            self.style.SUCCESS('Successfully created virtual lab courses with sample data!')
        )
