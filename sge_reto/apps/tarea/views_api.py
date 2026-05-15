from rest_framework import viewsets

from .models import Dependencia, Tarea
from .serializers import DependenciaSerializer, TareaSerializer


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer


class DependenciaViewSet(viewsets.ModelViewSet):
    queryset = Dependencia.objects.all()
    serializer_class = DependenciaSerializer
