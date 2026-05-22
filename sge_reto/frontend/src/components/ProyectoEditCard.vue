<script setup lang="ts">
import { ref } from 'vue'
import type { Proyecto } from '@/types'
import { useProyectoStore } from '@/stores/proyectoStore'

const props = defineProps<{ proyecto: Proyecto }>()
const emit = defineEmits(['cancelar', 'guardado'])

const proyectoStore = useProyectoStore()
const editProyecto = ref<Proyecto>({ ...props.proyecto })

const guardar = async () => {
  const success = await proyectoStore.actualizarProyecto(editProyecto.value)
  if (success) {
    emit('guardado')
  }
}
</script>

<template>
  <div class="card mb-3 border-primary">
    <div class="card-body">
      <div class="mb-3">
        <label class="small text-muted">Nombre del Proyecto</label>
        <input v-model="editProyecto.nombre" class="form-control form-control-sm font-weight-bold" />
      </div>

      <div class="mb-3">
        <label class="small text-muted">Descripción</label>
        <textarea v-model="editProyecto.descripcion" class="form-control form-control-sm" rows="3"></textarea>
      </div>

      <div class="row g-3 text-muted small">
        <div class="col-md-3">
          <label>Estado (%)</label>
          <input v-model.number="editProyecto.estado" type="number" min="0" max="100" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label>Responsable (ID)</label>
          <input v-model.number="editProyecto.responsable_principal" type="number" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label>Inicio</label>
          <input v-model="editProyecto.fecha_inicio" type="datetime-local" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label>Fin Previsto</label>
          <input v-model="editProyecto.fecha_fin_prevista" type="datetime-local" class="form-control form-control-sm" />
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
label { font-weight: bold; margin-bottom: 2px; display: block; }
</style>

