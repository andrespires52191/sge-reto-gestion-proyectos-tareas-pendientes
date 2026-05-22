<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useEmpleadoStore} from '@/stores/empleadoStore'
import EmpleadoCard from '@/components/EmpleadoCard.vue'
import EmpleadoEditCard from '@/components/EmpleadoEditCard.vue'

const empleadoStore = useEmpleadoStore()
const empleados = computed(() => empleadoStore.empleados)

const editandoId = ref<number | null>(null)

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
          <EmpleadoEditCard
            v-if="editandoId === empleado.id"
            :empleado="empleado"
            @cancelar="editandoId = null"
            @guardado="editandoId = null"
          />
          <EmpleadoCard
            v-else
            :empleado="empleado"
            @editar="editandoId = empleado.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
