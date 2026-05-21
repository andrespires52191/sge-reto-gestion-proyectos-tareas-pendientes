from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Dependencia, Tarea
from .serializers import DependenciaSerializer, TareaSerializer


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer


class DependenciaViewSet(viewsets.ModelViewSet):
    queryset = Dependencia.objects.all()
    serializer_class = DependenciaSerializer

@api_view(['GET'])
def api_tareas_por_proyecto(request, id_proyecto):
    if id_proyecto == 0:
        tareas = Tarea.objects.all()
    else:
        tareas = Tarea.objects.filter(proyecto_asociado_id=id_proyecto)
    tareas = tareas.order_by('-fecha_inicio')
    serializer = TareaSerializer(tareas, many=True)
    return Response(serializer.data)
