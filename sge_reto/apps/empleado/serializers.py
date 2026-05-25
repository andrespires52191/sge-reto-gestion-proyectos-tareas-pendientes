from rest_framework import serializers

from apps.empleado.models import Empleado


class EmpleadoSerializer(serializers.ModelSerializer):
    tareas_asignadas = serializers.SerializerMethodField()

    class Meta:
        model = Empleado
        fields = [
            "id",
            "dni",
            "nombre",
            "apellidos",
            "email",
            "telefono",
            "rol",
            "tareas_asignadas",
        ]

    def get_tareas_asignadas(self, empleado):
        return [f"[#{t.proyecto_asociado.id} - {t.proyecto_asociado}] #{t.id} - {t}"
                for t in empleado.tareas_asignadas.all()]
