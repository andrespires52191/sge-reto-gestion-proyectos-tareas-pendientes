<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useEmpleadoStore} from '@/stores/empleadoStore'
import EmpleadoCard from '@/components/EmpleadoCard.vue'
import EmpleadoEditCard from '@/components/EmpleadoEditCard.vue'

const empleadoStore = useEmpleadoStore()
const empleados = computed(() => empleadoStore.empleados)

const editandoId = ref<number | null>(null)
const mostrandoCrear = ref(false)

const nuevoEmpleadoBase = (): Partial<Empleado> => ({
  dni: '',
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  rol: '',
  tareas_asignadas: []
})

const handleBorrar = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas borrar este empleado?')) {
    await empleadoStore.borrarEmpleado(id)
  }
}

onMounted(() => {
  empleadoStore.cargarEmpleados()
})
</script>

<template>
  <div>
    <div class="d-flex align-items-center mb-4">
      <h1 class="mb-0">Empleados</h1>
      <button @click="mostrandoCrear = true" class="btn btn-success btn-sm ms-3" v-if="!mostrandoCrear">
        + Añadir Empleado
      </button>
    </div>

    <div v-if="empleadoStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="empleadoStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ empleadoStore.error }}
    </div>

    <div v-else>
      <EmpleadoEditCard
        v-if="mostrandoCrear"
        :empleado="(nuevoEmpleadoBase() as Empleado)"
        @cancelar="mostrandoCrear = false"
        @guardado="mostrandoCrear = false"
      />

      <div v-if="empleados.length === 0 && !mostrandoCrear" class="alert alert-info">No hay empleados en la base de datos.</div>

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
            @borrar="handleBorrar(empleado.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
