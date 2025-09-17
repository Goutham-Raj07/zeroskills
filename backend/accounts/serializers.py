from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User, StudentProfile, MentorProfile, AlumniProfile

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
