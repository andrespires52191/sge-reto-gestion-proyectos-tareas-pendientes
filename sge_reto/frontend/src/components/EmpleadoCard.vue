<script setup lang="ts">
import type {Empleado} from '@/types'

const props = defineProps<{ empleado: Empleado }>()
const emit = defineEmits(['editar', 'borrar'])
</script>

<template>
  <div class="card mb-3 border-secondary-subtle bg-light-subtle shadow">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0">
          #{{ empleado.id }} - {{ empleado.nombre }} {{ empleado.apellidos }}
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
        <div class="col-md-3">
          <strong>DNI:</strong> {{ empleado.dni }}
        </div>
        <div class="col-md-3">
          <strong>Rol:</strong> {{ empleado.rol }}
        </div>
        <div class="col-md-3">
          <strong>Teléfono:</strong> {{ empleado.telefono || '-' }}
        </div>
        <div class="col-md-3">
          <strong>Email:</strong> {{ empleado.email }}
        </div>
      </div>

      <div class="text-muted small">
        <strong>Tareas asignadas:</strong>
        <span v-if="!empleado.tareas_asignadas?.length"> -</span>
        <ul v-else class="list-group">
          <li v-for="(tarea, index) in empleado.tareas_asignadas" :key="index" class="list-group-item">
            {{ tarea }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
