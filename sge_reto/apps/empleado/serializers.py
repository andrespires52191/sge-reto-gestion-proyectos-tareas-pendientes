from rest_framework import serializers

from apps.empleado.models import Empleado


class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = [
            "dni",
            "nombre",
            "apellidos",
            "email",
            "telefono",
            "rol",
        ]
