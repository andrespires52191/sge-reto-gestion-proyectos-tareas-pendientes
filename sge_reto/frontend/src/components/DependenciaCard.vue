<script setup lang="ts">
import type { Dependencia } from '@/types'

const props = defineProps<{ dependencia: Dependencia }>()
const emit = defineEmits(['editar', 'borrar'])
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0">
          Dependencia #{{ dependencia.id }}
        </h5>
        <div class="d-flex flex-column align-items-end">
          <button @click="emit('editar')" class="btn btn-outline-primary btn-sm pt-0 pb-0 mb-1" style="font-size: 0.75rem;">
            Editar
          </button>
          <button @click="emit('borrar')" class="btn btn-outline-danger btn-sm pt-0 pb-0" style="font-size: 0.75rem;">
            Borrar
          </button>
        </div>
      </div>

      <div class="row text-muted small">
        <div class="col-md-4">
          <strong>Tipo de dependencia:</strong> {{ dependencia.tipo_dependencia }}
        </div>
        <div class="col-md-4">
          <strong>Tarea Origen:</strong> {{ dependencia.tarea_origen }}
        </div>
        <div class="col-md-4">
          <strong>Tarea Dependiente:</strong> {{ dependencia.tarea_dependiente }}
        </div>
      </div>
    </div>
  </div>
</template>
