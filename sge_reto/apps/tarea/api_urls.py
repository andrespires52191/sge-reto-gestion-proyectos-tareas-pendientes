from rest_framework.routers import DefaultRouter
from .views_api import DependenciaViewSet, TareaViewSet

router = DefaultRouter()
router.register(r'tareas', TareaViewSet, basename='api-tareas')
router.register(r'dependencias', DependenciaViewSet, basename='api-dependencias')
urlpatterns = router.urls
