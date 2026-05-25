<script setup lang="ts">
import { ref } from 'vue'
import type {Proyecto} from '@/types'

defineProps<{ proyecto: Proyecto }>()
const emit = defineEmits(['editar', 'borrar'])

const expandido = ref(false)

const formatearFecha = (fechaISO: string | null) => {
  if (fechaISO === null) return '';
  return new Date(fechaISO).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}
</script>

<template>
  <div class="card mb-3 border-secondary-subtle bg-light-subtle shadow" @click="expandido = !expandido">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start">
        <h5 class="card-title mb-0">
          #{{ proyecto.id }} - {{ proyecto.nombre }}
          <i class="bi ms-2" :class="expandido ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
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

      <div v-if="expandido" :class="{'mt-2': expandido}">
        <p class="card-text text-muted">
          {{ proyecto.descripcion }}
        </p>

        <div class="row text-muted small">
          <div class="col-md-3">
            <strong>Estado:</strong> {{ proyecto.estado }}%
          </div>
          <div class="col-md-3">
            <strong>Asignado a:</strong> {{ proyecto.responsable_principal_lectura }}
          </div>
          <div class="col-md-3">
            <strong>Inicio:</strong> {{ formatearFecha(proyecto.fecha_inicio) || '-' }}
          </div>
          <div class="col-md-3">
            <strong>Fin Previsto:</strong> {{ formatearFecha(proyecto.fecha_fin_prevista) || '-' }}
          </div>
        </div>

        <div class="text-muted small">
          <strong>Tareas asociadas:</strong>
          <span v-if="!proyecto.tareas_asociadas?.length"> -</span>
          <ul v-else class="list-group">
            <li v-for="(tarea, index) in proyecto.tareas_asociadas" :key="index" class="list-group-item">
              {{ tarea }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
