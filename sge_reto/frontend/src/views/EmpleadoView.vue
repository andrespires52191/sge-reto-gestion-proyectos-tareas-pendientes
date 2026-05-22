<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useEmpleadoStore} from '@/stores/empleadoStore'
import EmpleadoCard from '@/components/EmpleadoCard.vue'

const empleadoStore = useEmpleadoStore()
const empleados = computed(() => empleadoStore.empleados)

onMounted(() => {
  empleadoStore.cargarEmpleados()
})
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
          <EmpleadoCard :empleado="empleado" />
        </div>
      </div>
    </div>
  </div>
</template>
