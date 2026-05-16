from rest_framework.routers import DefaultRouter
from .views_api import EmpleadoViewSet

router = DefaultRouter()
router.register(r'empleados', EmpleadoViewSet, basename='api-empleados')
urlpatterns = router.urls
