from rest_framework.permissions import BasePermission


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, "doctor_profile")


class IsOwnerPatient(BasePermission):
    def has_object_permission(self, request, view, obj):
        return hasattr(request.user, "patient_profile") and obj.patient == request.user.patient_profile
