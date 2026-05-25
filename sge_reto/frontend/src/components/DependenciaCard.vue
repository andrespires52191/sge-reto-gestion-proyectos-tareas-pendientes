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
          Dependencia <span class="text-muted small">#{{ dependencia.id }}</span>
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
        <div class="col-md-12">
          <strong>Tipo de dependencia:</strong> {{
            {
              "FIN_INI": "Fin → Inicio",
              "INI_INI": "Inicio → Inicio",
              "FIN_FIN": "Fin → Fin",
            }[dependencia.tipo_dependencia]
          }}
        </div>
        <div class="col-md-6">
          <strong>Tarea Origen:</strong>
          <div class="list-group list-group-item" :class="{
            'text-muted': dependencia.tarea_origen.estado !== 100,
            'text-success fw-bold': dependencia.tarea_origen.estado === 100,
          }">
            #{{ dependencia.tarea_origen.id }} - {{ dependencia.tarea_origen.titulo }}
          </div>
        </div>
        <div class="col-md-6">
          <strong>Tarea Dependiente:</strong>
          <div class="list-group list-group-item" :class="{
            'text-muted': dependencia.tarea_dependiente.estado !== 100,
            'text-success fw-bold': dependencia.tarea_dependiente.estado === 100,
          }">
            #{{ dependencia.tarea_dependiente.id }} - {{ dependencia.tarea_dependiente.titulo }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
