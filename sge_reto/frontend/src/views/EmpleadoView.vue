<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useEmpleadoStore} from '@/stores/empleadoStore'

const empleadoStore = useEmpleadoStore()
const empleados = computed(() => empleadoStore.empleados)

onMounted(() => {
  empleadoStore.cargarEmpleados()
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
    <h1 class="mb-4">Empleados</h1>

    <div v-if="empleadoStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="empleadoStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ empleadoStore.error }}
    </div>

    <div v-else>
      <div v-if="empleados.length === 0" class="alert alert-info">No hay empleados en la base de datos.</div>

      <div class="row">
        <div class="col-12" v-for="empleado in empleados" :key="empleado.id">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">
                  #{{ empleado.id }} - {{ empleado.nombre }} {{ empleado.apellidos }}
                </h5>
              </div>

              <div class="row text-muted small">
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
                  <li v-for="(tarea, index) in empleado.tareas_asignadas">
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
