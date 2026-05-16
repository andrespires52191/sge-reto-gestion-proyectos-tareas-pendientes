from rest_framework.routers import DefaultRouter
from .views_api import ProyectoViewSet

router = DefaultRouter()
router.register(r'proyectos', ProyectoViewSet, basename='api-proyectos')
urlpatterns = router.urls
