<script setup lang="ts">
import { ref } from 'vue'
import type { Tarea } from '@/types'
import { useTareaStore } from '@/stores/tareaStore'

const props = defineProps<{ tarea: Tarea }>()
const emit = defineEmits(['cancelar', 'guardado'])

const tareaStore = useTareaStore()
const editTask = ref<Tarea>({ ...props.tarea })

const guardar = async () => {
  let success = false
  if (editTask.value.id) {
    success = await tareaStore.actualizarTarea(editTask.value)
  } else {
    success = await tareaStore.crearTarea(editTask.value)
  }

  if (success) {
    emit('guardado')
  }
}
</script>

<template>
  <div class="card mb-3 border-primary">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0 text-primary">
          {{ editTask.id ? 'Editando Tarea #' + editTask.id : 'Nueva Tarea' }}
        </h5>
        <select v-model="editTask.prioridad" class="form-select form-select-sm w-auto">
          <option value="baja">baja</option>
          <option value="media">media</option>
          <option value="alta">alta</option>
        </select>
      </div>

      <div class="mb-2">
        <textarea v-model="editTask.descripcion" class="form-control form-control-sm" rows="2" placeholder="Descripción"></textarea>
      </div>

      <div class="mb-2">
        <label class="small text-muted">Proyecto (ID):</label>
        <input v-model.number="editTask.proyecto_asociado" type="number" class="form-control form-control-sm" />
      </div>

      <div class="row g-2 text-muted small">
        <div class="col-md-3">
          <label>Asignada a (ID):</label>
          <input v-model.number="editTask.responsable_asignado" type="number" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label>Estado (%):</label>
          <input v-model.number="editTask.estado" type="number" min="0" max="100" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label>Inicio:</label>
          <input v-model="editTask.fecha_inicio" type="datetime-local" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label>Previsto:</label>
          <input v-model="editTask.fecha_fin_prevista" type="datetime-local" class="form-control form-control-sm" />
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
label {
  display: block;
  font-weight: bold;
  margin-bottom: 2px;
}
</style>

