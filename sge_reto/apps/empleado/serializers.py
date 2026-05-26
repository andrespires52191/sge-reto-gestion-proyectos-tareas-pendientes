from rest_framework import serializers

from apps.empleado.models import Empleado


class EmpleadoSerializer(serializers.ModelSerializer):
    proyectos_asignados = serializers.SerializerMethodField()
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
            "proyectos_asignados",
            "tareas_asignadas",
        ]

    def validate(self, data):
        dni = data.get('dni')

        if len(dni) != 9:
            raise serializers.ValidationError({"dni": "El DNI debe tener 9 caracteres."})

        return data

    def get_proyectos_asignados(self, empleado):
        return [f"#{p.id} - {p.nombre}"
                for p in empleado.proyectos_asignados.all()]

    def get_tareas_asignadas(self, empleado):
        return [f"[#{t.proyecto_asociado.id} - {t.proyecto_asociado}] #{t.id} - {t}"
                for t in empleado.tareas_asignadas.all()]
