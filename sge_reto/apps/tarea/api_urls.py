from django.urls import path
from rest_framework.routers import DefaultRouter
from .views_api import (
    DependenciaViewSet,
    TareaViewSet,
    api_tareas_por_proyecto
)

router = DefaultRouter()
router.register(r'tareas', TareaViewSet, basename='api-tareas')
router.register(r'dependencias', DependenciaViewSet, basename='api-dependencias')

# Sin terminar de implementar
# urlpatterns = [
#     path('por-proyecto/<int:id_proyecto>/', api_tareas_por_proyecto, name='api-tareas-por-proyecto'),
# ]
#
# urlpatterns += router.urls

urlpatterns = router.urls
