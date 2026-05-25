<script setup lang="ts">
import { ref } from 'vue'
import type {Tarea} from '@/types'

defineProps<{ tarea: Tarea }>()
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
  <div class="card mb-3 bg-light-subtle shadow"
       :class="{
        'border-success': tarea.estado === 100,
        'border-secondary-subtle ': tarea.estado !== 100,
      }">
    <div class="card-body">
      <div @click="expandido = !expandido"
          class="d-flex justify-content-between align-items-start">
        <h5 class="card-title mb-0">
          {{ tarea.titulo }} <span class="text-muted small">#{{ tarea.id }}</span>
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
          {{ tarea.descripcion }}
        </p>
        <div class="row text-muted small">
          <div class="col-md-6">
            <strong>Proyecto:</strong> {{ tarea.proyecto_asociado_lectura }}
          </div>
          <div class="col-md-4">
            <strong>Asignada a:</strong> {{ tarea.responsable_asignado_lectura || '-' }}
          </div>
        </div>
        <div class="row text-muted small">
          <div class="col-md-3">
            <strong>Prioridad:</strong> {{
              {
                "baja": "Baja",
                "media": "Media",
                "alta": "Alta",
              }[tarea.prioridad]
            }}
          </div>
          <div class="col-md-3">
            <strong>Estado:</strong> {{ tarea.estado }}&percnt;
          </div>
          <div class="col-md-3">
            <strong>Inicio:</strong> {{ formatearFecha(tarea.fecha_inicio) || '-' }}
          </div>
          <div class="col-md-3">
            <strong>Fin Previsto:</strong> {{ formatearFecha(tarea.fecha_fin_prevista) || '-' }}
          </div>
        </div>

        <div class="row small text-muted">
          <div class="col-md-6">
            <strong>Depende de:</strong>
            <span v-if="!tarea.antecesoras?.length"> -</span>
            <ul v-else class="list-group">
              <li v-for="(ant, idx) in tarea.antecesoras" :key="idx" class="list-group-item">
                {{ ant }}
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <strong>Precede a:</strong>
            <span v-if="!tarea.sucesoras?.length"> -</span>
            <ul v-else class="list-group">
              <li v-for="(suc, idx) in tarea.sucesoras" :key="idx" class="list-group-item">
                {{ suc }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
