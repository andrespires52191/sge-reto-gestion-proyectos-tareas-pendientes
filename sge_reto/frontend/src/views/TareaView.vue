<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useTareaStore} from '@/stores/tareaStore'
import TareaCard from '@/components/TareaCard.vue'
import TareaEditCard from '@/components/TareaEditCard.vue'
import type {Tarea} from "@/types";

const tareaStore = useTareaStore()
const tareas = computed(() => tareaStore.tareas)

const editandoId = ref<number | null>(null)
const mostrandoCrear = ref(false)

const nuevaTareaBase = (): Partial<Tarea> => ({
  titulo: '',
  descripcion: '',
  prioridad: 'media',
  estado: 0,
  proyecto_asociado: null,
  responsable_asignado: null,
  fecha_inicio: null,
  fecha_fin_prevista: null
})

const handleBorrar = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas borrar esta tarea?')) {
    await tareaStore.borrarTarea(id)
  }
}

onMounted(() => {
  tareaStore.cargarTareas()
})
</script>

<template>
  <div>
    <div class="d-flex align-items-center mb-4">
      <h1 class="mb-0">Tareas</h1>
      <button @click="mostrandoCrear = true" class="btn btn-success btn-sm ms-auto" v-if="!mostrandoCrear">
        + Añadir Tarea
      </button>
    </div>

    <div v-if="tareaStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="tareaStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ tareaStore.error }}
    </div>

    <div v-else>
      <TareaEditCard
          v-if="mostrandoCrear"
          :tarea="(nuevaTareaBase() as Tarea)"
          @cancelar="mostrandoCrear = false"
          @guardado="mostrandoCrear = false"
      />

      <div v-if="tareas.length === 0 && !mostrandoCrear" class="alert alert-info">No hay tareas en la base de datos.
      </div>

      <div class="row">
        <div class="col-12" v-for="tarea in tareas" :key="tarea.id">
          <TareaEditCard
              v-if="editandoId === tarea.id"
              :tarea="tarea"
              @cancelar="editandoId = null"
              @guardado="editandoId = null"
          />
          <TareaCard
              v-else
              :tarea="tarea"
              @editar="editandoId = tarea.id"
              @borrar="handleBorrar(tarea.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
