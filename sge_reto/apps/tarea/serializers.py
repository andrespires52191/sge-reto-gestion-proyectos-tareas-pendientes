from rest_framework import serializers

from apps.tarea.models import Tarea, Dependencia
from apps.proyecto.models import Proyecto
from apps.empleado.models import Empleado


class TareaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    proyecto_asociado_lectura = serializers.SerializerMethodField()
    responsable_asignado_lectura = serializers.SerializerMethodField()
    antecesoras = serializers.SerializerMethodField()
    sucesoras = serializers.SerializerMethodField()

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
            "proyecto_asociado_lectura",
            "responsable_asignado_lectura",
            "antecesoras",
            "sucesoras",
        ]

    def get_proyecto_asociado_lectura(self, tarea):
        if tarea.proyecto_asociado is None:
            return "?"
        return f"#{tarea.proyecto_asociado.id} - {tarea.proyecto_asociado.nombre}"

    def get_responsable_asignado_lectura(self, tarea):
        if tarea.responsable_asignado is None:
            return "?"
        return f"#{tarea.responsable_asignado.id} - {tarea.responsable_asignado.nombre} {tarea.responsable_asignado.apellidos}"

    def get_antecesoras(self, tarea):
        return [f"#{d.tarea_origen.id} - {d.tarea_origen.titulo}"
                for d in tarea.deps_sucesoras.all()]

    def get_sucesoras(self, tarea):
        return [f"#{d.tarea_dependiente.id} - {d.tarea_dependiente.titulo}"
                for d in tarea.deps_antecesoras.all()]


class DependenciaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tarea_origen_lectura = TareaSerializer(source='tarea_origen', read_only=True)
    tarea_dependiente_lectura = TareaSerializer(source='tarea_dependiente', read_only=True)

    class Meta:
        model = Dependencia
        fields = [
            "id",
            "tarea_origen",
            "tarea_dependiente",
            "tarea_origen_lectura",
            "tarea_dependiente_lectura",
            "tipo_dependencia",
        ]
