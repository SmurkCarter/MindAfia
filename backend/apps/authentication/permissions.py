from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class IsClinician(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, "clinician_profile")


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, "patient_profile")


class IsClinicianOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_staff or
            hasattr(request.user, "clinician_profile")
        )
