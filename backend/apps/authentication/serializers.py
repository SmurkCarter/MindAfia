from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.profiles.models import DoctorProfile, PatientProfile
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username","email","first_name","last_name","is_clinician","is_patient")

class DoctorRegisterSerializer(serializers.ModelSerializer):
    specialization = serializers.CharField()
    license_number = serializers.CharField()

    class Meta:
        model = User
        fields = ("username", "email", "password", "specialization", "license_number")

    def create(self, validated_data):
        specialization = validated_data.pop("specialization")
        license_number = validated_data.pop("license_number")

        user = User.objects.create_user(**validated_data)
        DoctorProfile.objects.create(
            user=user,
            specialization=specialization,
            license_number=license_number,
        )
        return user


class PatientRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        PatientProfile.objects.create(user=user)
        return user