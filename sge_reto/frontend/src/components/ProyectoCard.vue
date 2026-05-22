<script setup lang="ts">
import type { Proyecto } from '@/types'

defineProps<{ proyecto: Proyecto }>()

const formatearFecha = (fechaISO: string | null) => {
  if (fechaISO === null) return '';
  return new Date(fechaISO).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0">
          #{{ proyecto.id }} - {{ proyecto.nombre }}
        </h5>
      </div>

      <p class="card-text text-muted">
        {{ proyecto.descripcion }}
      </p>

      <div class="row text-muted small">
        <div class="col-md-3">
          <strong>Estado:</strong> {{ proyecto.estado }}
        </div>
        <div class="col-md-3">
          <strong>Asignada a:</strong> {{ proyecto.responsable_principal || 'Sin responsable' }}
        </div>
        <div class="col-md-3">
          <strong>Inicio:</strong> {{ formatearFecha(proyecto.fecha_inicio) }}
        </div>
        <div class="col-md-3">
          <strong>Fin Previsto:</strong> {{ formatearFecha(proyecto.fecha_fin_prevista) }}
        </div>
      </div>

      <div>
        Tareas asociadas
        <ul>
          <li v-for="(tarea, index) in proyecto.tareas_asociadas" :key="index">
            {{ tarea }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
