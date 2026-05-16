<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useTareaStore} from '@/stores/tareaStore'

const tareaStore = useTareaStore()
const tareas = computed(() => tareaStore.tareas)
const cargando = computed(() => tareaStore.cargando)
const error = computed(() => tareaStore.error)

onMounted(() => {
  tareaStore.fetchTareas()
})

const formatearFecha = (fechaISO: string | null) => {
  if (fechaISO === null) return '';
  return new Date(fechaISO).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}
</script>

<template>
  <div>
    <h1 class="mb-4">Gestión de Tareas</h1>

    <div v-if="cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="error" class="alert alert-danger">
      <strong>Error:</strong> {{ error }}
    </div>

    <div v-else>
      <div v-if="tareas.length === 0" class="alert alert-info">No hay tareas en la base de datos.</div>

      <div class="row">
        <div class="col-12" v-for="tarea in tareas" :key="tarea.id">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">
                  #{{ tarea.id }} - {{ tarea.titulo }}
                </h5>
                <span class="badge bg-secondary">
                  {{ tarea.prioridad }}
                </span>
              </div>

              <p class="card-text text-muted">
                {{ tarea.descripcion }}
              </p>

              <div class="row text-muted small">
                <div class="col-md-3">
                  <strong>Estado:</strong> {{ tarea.estado }}
                </div>
                <div class="col-md-3">
                  <strong>Asignada a:</strong> {{ tarea.responsable_asignado || 'Sin asignar' }}
                </div>
                <div class="col-md-3">
                  <strong>Inicio:</strong> {{ formatearFecha(tarea.fecha_inicio) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
