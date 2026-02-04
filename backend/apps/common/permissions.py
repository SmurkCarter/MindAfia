from rest_framework.permissions import BasePermission

class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, "doctor_profile")

class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, "patient_profile")

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff

class IsOwnerDoctorOrPatient(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if hasattr(user, "doctor_profile"):
            return obj.doctor == user.doctor_profile
        if hasattr(user, "patient_profile"):
            return obj.patient == user.patient_profile
        return False
