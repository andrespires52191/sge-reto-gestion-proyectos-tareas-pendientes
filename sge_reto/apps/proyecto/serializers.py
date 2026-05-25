from rest_framework import serializers

from apps.proyecto.models import Proyecto


class ProyectoSerializer(serializers.ModelSerializer):
    responsable_principal_lectura = serializers.SerializerMethodField()
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
            "responsable_principal_lectura",
            "tareas_asociadas",
        ]

    def validate(self, data):
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin_prevista = data.get('fecha_fin_prevista')
        estado = data.get('estado')

        if fecha_fin_prevista < fecha_inicio:
            raise serializers.ValidationError("La fecha de fin no puede ser anterior a la de inicio.")

        if estado < 0 or estado > 100:
            raise serializers.ValidationError("El estado debe estar entre 0 y 100.")

        return data

    def get_responsable_principal_lectura(self, proyecto):
        if proyecto.responsable_principal is None:
            return "?"
        return f"#{proyecto.responsable_principal.id} - {proyecto.responsable_principal}"

    def get_tareas_asociadas(self, proyecto):
        return [f"#{t.id} - {t}" for t in proyecto.tareas_asociadas.all()]
