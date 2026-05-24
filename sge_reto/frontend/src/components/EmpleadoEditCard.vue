<script setup lang="ts">
import {ref} from 'vue'
import type {Empleado} from '@/types'
import {useEmpleadoStore} from '@/stores/empleadoStore'

const props = defineProps<{ empleado: Empleado }>()
const emit = defineEmits(['cancelar', 'guardado'])

const empleadoStore = useEmpleadoStore()
const editEmpleado = ref<Empleado>({...props.empleado})

const guardar = async () => {
  let success = false
  if (editEmpleado.value.id) {
    success = await empleadoStore.actualizarEmpleado(editEmpleado.value)
  } else {
    success = await empleadoStore.crearEmpleado(editEmpleado.value)
  }

  if (success) {
    emit('guardado')
  }
}
</script>

<template>
  <div class="card mb-3 border-primary bg-light-subtle shadow">
    <div class="card-body">
      <h5 class="card-title mb-3 text-primary">
        {{ editEmpleado.id ? 'Editando Empleado #' + editEmpleado.id : 'Nuevo Empleado' }}
      </h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="small text-muted">Nombre</label>
          <input v-model="editEmpleado.nombre" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-6">
          <label class="small text-muted">Apellidos</label>
          <input v-model="editEmpleado.apellidos" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-4">
          <label class="small text-muted">DNI</label>
          <input v-model="editEmpleado.dni" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-4">
          <label class="small text-muted">Rol</label>
          <input v-model="editEmpleado.rol" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-4">
          <label class="small text-muted">Teléfono</label>
          <input v-model="editEmpleado.telefono" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-12">
          <label class="small text-muted">Email</label>
          <input v-model="editEmpleado.email" type="email" class="form-control form-control-sm"/>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <button @click="emit('cancelar')" class="btn btn-outline-secondary btn-sm me-2">Cancelar</button>
        <button @click="guardar" class="btn btn-primary btn-sm">Guardar Cambios</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
