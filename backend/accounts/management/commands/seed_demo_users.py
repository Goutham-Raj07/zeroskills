from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = "Create demo users for each role"

    def handle(self, *args, **options):
        users = [
            {"username": "student@example.com", "email": "student@example.com", "password": "Pass1234!", "role": "student"},
            {"username": "mentor@example.com", "email": "mentor@example.com", "password": "Pass1234!", "role": "mentor"},
            {"username": "alumni@example.com", "email": "alumni@example.com", "password": "Pass1234!", "role": "alumni"},
        ]
        for u in users:
            user, created = User.objects.get_or_create(username=u["username"], defaults={
                "email": u["email"],
                "role": u["role"],
            })
            if created:
                user.set_password(u["password"])
                user.save()
                self.stdout.write(self.style.SUCCESS(f"Created {u['role']} user: {u['username']} / {u['password']}"))
            else:
                self.stdout.write(self.style.WARNING(f"User exists: {u['username']}"))
