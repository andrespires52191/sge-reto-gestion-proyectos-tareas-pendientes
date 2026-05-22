<script setup lang="ts">
import type { Empleado } from '@/types'

defineProps<{ empleado: Empleado }>()
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0">
          #{{ empleado.id }} - {{ empleado.nombre }} {{ empleado.apellidos }}
        </h5>
      </div>

      <div class="row text-muted small">
        <div class="col-md-3">
          <strong>DNI:</strong> {{ empleado.dni }}
        </div>
        <div class="col-md-3">
          <strong>Rol:</strong> {{ empleado.rol }}
        </div>
        <div class="col-md-3">
          <strong>Teléfono:</strong> {{ empleado.telefono || 'Sin telefono' }}
        </div>
        <div class="col-md-3">
          <strong>Email:</strong> {{ empleado.email }}
        </div>
      </div>

      <div>
        Tareas asignadas:
        <ul>
          <li v-for="(tarea, index) in empleado.tareas_asignadas" :key="index">
            {{ tarea }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

