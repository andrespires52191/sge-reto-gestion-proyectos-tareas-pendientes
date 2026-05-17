<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useProyectoStore} from '@/stores/proyectoStore'

const proyectoStore = useProyectoStore()
const proyectos = computed(() => proyectoStore.proyectos)

onMounted(() => {
  proyectoStore.cargarProyectos()
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
    <h1 class="mb-4">Proyectos</h1>

    <div v-if="proyectoStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="proyectoStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ proyectoStore.error }}
    </div>

    <div v-else>
      <div v-if="proyectos.length === 0" class="alert alert-info">No hay proyectos en la base de datos.</div>

      <div class="row">
        <div class="col-12" v-for="proyecto in proyectos" :key="proyecto.id">
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
        </div>
      </div>
    </div>
  </div>
</template>
