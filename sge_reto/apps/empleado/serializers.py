from rest_framework import serializers

from apps.empleado.models import Empleado


class EmpleadoSerializer(serializers.ModelSerializer):
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
