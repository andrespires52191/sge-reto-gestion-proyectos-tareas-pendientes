<script setup lang="ts">
import type { Tarea } from '@/types'

defineProps<{ tarea: Tarea }>()
const emit = defineEmits(['editar', 'borrar'])

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
          #{{ tarea.id }} - {{ tarea.titulo }}
        </h5>
        <div class="d-flex flex-column align-items-end">
          <div class="mb-1">
            <span class="badge bg-secondary me-2">
              {{ tarea.prioridad }}
            </span>
            <button @click="emit('editar')" class="btn btn-outline-primary btn-sm pt-0 pb-0" style="font-size: 0.75rem;">
              Editar
            </button>
          </div>
          <button @click="emit('borrar')" class="btn btn-outline-danger btn-sm pt-0 pb-0" style="font-size: 0.75rem;">
            Borrar
          </button>
        </div>
      </div>

      <p class="card-text text-muted">
        {{ tarea.descripcion }}
      </p>
      <div>
        <strong>Proyecto:</strong> {{ tarea.proyecto_asociado || 'Sin asignar' }}
      </div>
      <div class="row text-muted small">
        <div class="col-md-3">
          <strong>Asignada a:</strong> {{ tarea.responsable_asignado || 'Sin asignar' }}
        </div>
        <div class="col-md-3">
          <strong>Estado:</strong> {{ tarea.estado }}&percnt;
        </div>
        <div class="col-md-3">
          <strong>Inicio:</strong> {{ formatearFecha(tarea.fecha_inicio) }}
        </div>
        <div class="col-md-3">
          <strong>Previsto:</strong> {{ formatearFecha(tarea.fecha_fin_prevista) }}
        </div>
      </div>
    </div>
  </div>
</template>

