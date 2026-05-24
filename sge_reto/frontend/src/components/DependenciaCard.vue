<script setup lang="ts">
import type {Dependencia} from '@/types'

const props = defineProps<{ dependencia: Dependencia }>()
const emit = defineEmits(['editar', 'borrar'])
</script>

<template>
  <div class="card mb-3 border-secondary-subtle bg-light-subtle shadow">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0">
          Dependencia #{{ dependencia.id }}
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

      <div class="row text-muted small">
        <div class="col-md-4">
          <strong>Tarea Origen:</strong> {{ dependencia.tarea_origen }}
        </div>
        <div class="col-md-4">
          <strong>Tarea Dependiente:</strong> {{ dependencia.tarea_dependiente }}
        </div>
        <div class="col-md-4">
          <strong>Tipo de dependencia:</strong> {{ dependencia.tipo_dependencia }}
        </div>
      </div>
    </div>
  </div>
</template>
