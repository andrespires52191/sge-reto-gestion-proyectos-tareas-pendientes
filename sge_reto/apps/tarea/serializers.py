from rest_framework import serializers

from apps.tarea.models import Tarea, Dependencia


class TareaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tarea
        fields = [
            "id",
            "titulo",
            "descripcion",
            "estado",
            "prioridad",
            "fecha_inicio",
            "fecha_fin_prevista",
            "proyecto_asociado",
            "responsable_asignado",
        ]


class DependenciaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tarea_origen = serializers.PrimaryKeyRelatedField(queryset=Tarea.objects.all())
    tarea_dependiente = serializers.PrimaryKeyRelatedField(queryset=Tarea.objects.all())

    class Meta:
        model = Dependencia
        fields = [
            "id",
            "tarea_origen",
            "tarea_dependiente",
            "tipo_dependencia",
        ]
