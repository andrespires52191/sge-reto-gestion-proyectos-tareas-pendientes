<script setup lang="ts">

</script>

<template>
  <div class="d-flex flex-column vh-100">
    <nav class="navbar bg-light border pb-0">
      <div class="container-fluid d-flex align-items-center justify-content-start">
        <RouterLink to="/" class="navbar-brand">Gestión de Proyectos</RouterLink>
        <ul class="nav nav-tabs border-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" exact-active-class="active">Inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/proyecto" class="nav-link" exact-active-class="active">Proyectos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/tarea" class="nav-link" exact-active-class="active">Tareas</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    <div class="flex-grow-1 p-3">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>

</style>
