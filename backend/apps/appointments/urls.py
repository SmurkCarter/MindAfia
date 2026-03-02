from rest_framework.routers import DefaultRouter
from .views import DoctorAvailabilityViewSet, AppointmentViewSet

router = DefaultRouter()
router.register("availability", DoctorAvailabilityViewSet, basename="availability")
router.register("", AppointmentViewSet, basename="appointments")

urlpatterns = router.urls