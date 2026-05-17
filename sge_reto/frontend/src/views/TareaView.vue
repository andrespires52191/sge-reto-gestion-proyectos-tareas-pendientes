<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useTareaStore} from '@/stores/tareaStore'

const tareaStore = useTareaStore()
const tareas = computed(() => tareaStore.tareas)

onMounted(() => {
  tareaStore.cargarTareas()
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
    <h1 class="mb-4">Tareas</h1>

    <div v-if="tareaStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="tareaStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ tareaStore.error }}
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
        </div>
      </div>
    </div>
  </div>
</template>
