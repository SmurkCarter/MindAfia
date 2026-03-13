from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.clinicians.models import ClinicianProfile
from apps.profiles.models import PatientProfile
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_clinician",
            "is_patient",
        )


# ----------------------------
# DOCTOR REGISTER
# ----------------------------
class DoctorRegisterSerializer(serializers.ModelSerializer):
    # These belong to ClinicianProfile, NOT User
    specialization = serializers.CharField(write_only=True)
    bio = serializers.CharField(write_only=True, required=False, allow_blank=True)
    dob = serializers.DateField(write_only=True, required=False)
    gender = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
            "specialization",
            "bio",
            "dob",
            "gender",
        )
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        # Remove profile fields before creating user
        specialization = validated_data.pop("specialization")
        bio = validated_data.pop("bio", "")
        dob = validated_data.pop("dob", None)
        gender = validated_data.pop("gender", "")

        # Create user properly
        user = User.objects.create_user(**validated_data)

        # If you use boolean flags instead of role
        if hasattr(user, "is_clinician"):
            user.is_clinician = True
            user.save()

        # Create clinician profile
        ClinicianProfile.objects.create(
            user=user,
            specialization=specialization,
            bio=bio,
            dob=dob,
            gender=gender,
        )

        return user

    # 🔥 Prevent DRF from trying to serialize write_only fields
    def to_representation(self, instance):
        return {
            "id": instance.id,
            "username": instance.username,
            "email": instance.email,
        }


# ----------------------------
# PATIENT REGISTER
# ----------------------------
class PatientRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)

        if hasattr(user, "is_patient"):
            user.is_patient = True
            user.save()

        PatientProfile.objects.create(user=user)
        return user

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):

        login_value = attrs.get("username")   # can be email OR username
        password = attrs.get("password")

        # Try username login
        user = authenticate(
            request=self.context.get("request"),
            username=login_value,
            password=password
        )

        # If not found, try email login
        if not user:
            from django.contrib.auth import get_user_model
            User = get_user_model()

            try:
                user_obj = User.objects.get(email=login_value)

                user = authenticate(
                    request=self.context.get("request"),
                    username=user_obj.username,
                    password=password
                )

            except User.DoesNotExist:
                pass

        if not user:
            raise serializers.ValidationError("Invalid login credentials")

        data = super().validate({
            "username": user.username,
            "password": password
        })

        return data