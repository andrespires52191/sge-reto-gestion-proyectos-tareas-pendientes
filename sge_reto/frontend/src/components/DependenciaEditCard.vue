<script setup lang="ts">
import {ref} from 'vue'
import type {Dependencia} from '@/types'
import {useDependenciaStore} from '@/stores/dependenciaStore'

const props = defineProps<{ dependencia: Dependencia }>()
const emit = defineEmits(['cancelar', 'guardado'])

const dependenciaStore = useDependenciaStore()
const editDependencia = ref<Dependencia>({...props.dependencia})

const guardar = async () => {
  let success = false
  if (editDependencia.value.id) {
    success = await dependenciaStore.actualizarDependencia(editDependencia.value)
  } else {
    success = await dependenciaStore.crearDependencia(editDependencia.value)
  }

  if (success) {
    emit('guardado')
  }
}
</script>

<template>
  <div class="card mb-3 border-primary bg-light-subtle shadow">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0 text-primary">
          {{ editDependencia.id ? 'Editando Dependencia #' + editDependencia.id : 'Nueva Dependencia' }}
        </h5>
      </div>

      <div class="row g-3 small">
        <div class="col-md-4">
          <label class="text-muted">Tarea Origen (ID)</label>
          <input v-model.number="editDependencia.tarea_origen" type="number" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-4">
          <label class="text-muted">Tarea Dependiente (ID)</label>
          <input v-model.number="editDependencia.tarea_dependiente" type="number" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-4">
          <label class="text-muted">Tipo de dependencia</label>
          <select v-model="editDependencia.tipo_dependencia" class="form-select form-select-sm">
            <option value="FIN_INI">Fin → Inicio</option>
            <option value="INI_INI">Inicio → Inicio</option>
            <option value="FIN_FIN">Fin → Fin</option>
          </select>
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
