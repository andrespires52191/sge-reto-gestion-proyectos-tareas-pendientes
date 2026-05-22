<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useDependenciaStore } from '@/stores/dependenciaStore'
import DependenciaCard from '@/components/DependenciaCard.vue'
import DependenciaEditCard from '@/components/DependenciaEditCard.vue'

const dependenciaStore = useDependenciaStore()
const dependencias = computed(() => dependenciaStore.dependencias)

const editandoId = ref<number | null>(null)

onMounted(() => {
  dependenciaStore.cargarDependencias()
})
</script>

<template>
  <div>
    <h1 class="mb-4">Dependencias</h1>

    <div v-if="dependenciaStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="dependenciaStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ dependenciaStore.error }}
    </div>

    <div v-else>
      <div v-if="dependencias.length === 0" class="alert alert-info">No hay dependencias en la base de datos.</div>

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
          />
        </div>
      </div>
    </div>
  </div>
</template>

