<script setup lang="ts">
import {ref} from 'vue'
import type {Tarea} from '@/types'
import {useTareaStore} from '@/stores/tareaStore'

const props = defineProps<{ tarea: Tarea }>()
const emit = defineEmits(['cancelar', 'guardado'])

const tareaStore = useTareaStore()
const editTarea = ref<Tarea>({...props.tarea})

const guardar = async () => {
  let success = false
  if (editTarea.value.id) {
    success = await tareaStore.actualizarTarea(editTarea.value)
  } else {
    success = await tareaStore.crearTarea(editTarea.value)
  }

  if (success) {
    emit('guardado')
  }
}
</script>

<template>
  <div class="card mb-3 border-primary bg-light-subtle shadow">
    <div class="card-body">
      <h5 class="card-title mb-2 text-primary">
        {{ editTarea.id ? 'Editando Tarea #' + editTarea.id : 'Nueva Tarea' }}
      </h5>

      <div class="mb-2">
        <textarea v-model="editTarea.descripcion" class="form-control form-control-sm" rows="2"
                  placeholder="Descripción"></textarea>
      </div>

      <div class="row g-2 text-muted small">
        <div class="col-md-6">
          <label class="small text-muted">Proyecto (ID):</label>
          <input v-model.number="editTarea.proyecto_asociado" type="number" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-6">
          <label>Asignada a (ID):</label>
          <input v-model.number="editTarea.responsable_asignado" type="number" class="form-control form-control-sm"/>
        </div>
      </div>
      <div class="row g-2 text-muted small">
        <div class="col-md-3">
          <label>Prioridad:</label>
          <select v-model="editTarea.prioridad" class="form-select form-select-sm">
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div class="col-md-3">
          <label>Estado (%):</label>
          <input v-model.number="editTarea.estado" type="number" min="0" max="100"
                 class="form-control form-control-sm"/>
        </div>
        <div class="col-md-3">
          <label>Inicio:</label>
          <input v-model="editTarea.fecha_inicio" type="datetime-local" class="form-control form-control-sm"/>
        </div>
        <div class="col-md-3">
          <label>Previsto:</label>
          <input v-model="editTarea.fecha_fin_prevista" type="datetime-local" class="form-control form-control-sm"/>
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
