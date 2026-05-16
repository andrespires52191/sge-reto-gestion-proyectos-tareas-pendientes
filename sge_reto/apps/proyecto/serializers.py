from rest_framework import serializers

from apps.proyecto.models import Proyecto


class ProyectoSerializer(serializers.ModelSerializer):
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
        ]
