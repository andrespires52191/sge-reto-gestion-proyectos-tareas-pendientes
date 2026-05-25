from rest_framework import serializers

from apps.proyecto.models import Proyecto


class ProyectoSerializer(serializers.ModelSerializer):
    responsable_principal = serializers.SerializerMethodField()
    tareas_asociadas = serializers.SerializerMethodField()

    class Meta:
        model = Proyecto
        fields = [
            "id",
            "nombre",
            "descripcion",
            "fecha_inicio",
            "fecha_fin_prevista",
            "estado",
            "responsable_principal",
            "tareas_asociadas",
        ]

    def get_responsable_principal(self, empleado):
        return f"#{empleado.responsable_principal.id} - {empleado.responsable_principal}"

    def get_tareas_asociadas(self, empleado):
        return [f"#{t.id} - {t}" for t in empleado.tareas_asociadas.all()]
