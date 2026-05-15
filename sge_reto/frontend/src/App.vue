<script setup lang="ts">

</script>

<template>
  <div class="d-flex flex-column vh-100">
    <header>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/tarea">Tareas</RouterLink>
    </header>
    <div class="flex-grow-1">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>

</style>
