<script setup lang="ts">
import type {Tarea} from '@/types'

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
  <div class="card mb-3 border-secondary-subtle bg-light-subtle shadow">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0">
          #{{ tarea.id }} - {{ tarea.titulo }}
        </h5>
        <div>
          <button @click="emit('editar')" class="btn btn-outline-primary btn-sm py-0 mx-1">
            <i class="bi bi-pencil"></i>
          </button>
          <button @click="emit('borrar')" class="btn btn-outline-danger btn-sm py-0 mx-1">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <p class="card-text text-muted">
        {{ tarea.descripcion }}
      </p>
      <div class="row text-muted small">
        <div class="col-md-6">
          <strong>Proyecto:</strong> {{ tarea.proyecto_asociado }}
        </div>
        <div class="col-md-4">
          <strong>Asignada a:</strong> {{ tarea.responsable_asignado || '-' }}
        </div>
      </div>
      <div class="row text-muted small">
        <div class="col-md-3">
          <strong>Prioridad:</strong> {{ tarea.prioridad }}
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
