<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useDependenciaStore} from '@/stores/dependenciaStore'
import DependenciaCard from '@/components/DependenciaCard.vue'
import DependenciaEditCard from '@/components/DependenciaEditCard.vue'
import type {Dependencia} from "@/types";

const dependenciaStore = useDependenciaStore()
const dependencias = computed(() => dependenciaStore.dependencias)

const editandoId = ref<number | null>(null)
const mostrandoCrear = ref(false)

const nuevaDependenciaBase = (): Partial<Dependencia> => ({
  tarea_origen: 0,
  tarea_dependiente: 0,
  tipo_dependencia: 'FIN_INI'
})

const handleBorrar = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas borrar esta dependencia?')) {
    await dependenciaStore.borrarDependencia(id)
  }
}

onMounted(() => {
  dependenciaStore.cargarDependencias()
})
</script>

<template>
  <div>
    <div class="d-flex align-items-center mb-4">
      <h1 class="mb-0">Dependencias</h1>
      <button @click="mostrandoCrear = true" class="btn btn-success btn-sm ms-auto" v-if="!mostrandoCrear">
        + Añadir Dependencia
      </button>
    </div>

    <div v-if="dependenciaStore.cargando" class="alert alert-info">Cargando...</div>
    <div v-else-if="dependenciaStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ dependenciaStore.error }}
    </div>

    <div v-else>
      <DependenciaEditCard
          v-if="mostrandoCrear"
          :dependencia="(nuevaDependenciaBase() as Dependencia)"
          @cancelar="mostrandoCrear = false"
          @guardado="mostrandoCrear = false"
      />

      <div v-if="dependencias.length === 0 && !mostrandoCrear" class="alert alert-info">No hay dependencias en la base
        de datos.
      </div>

      <div class="row">
        <div class="col-12" v-for="dependencia in dependencias" :key="dependencia.id">
          <DependenciaEditCard
              v-if="editandoId === dependencia.id"
              :dependencia="dependencia"
              @cancelar="editandoId = null"
              @guardado="editandoId = null"
          />
          <DependenciaCard
              v-else
              :dependencia="dependencia"
              @editar="editandoId = dependencia.id"
              @borrar="handleBorrar(dependencia.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

