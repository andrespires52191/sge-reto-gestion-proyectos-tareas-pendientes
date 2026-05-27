<script setup lang="ts">
import BotonLogout from "@/components/BotonLogout.vue";
import {useAuthStore} from '@/stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <div class="d-flex flex-column vh-100">
    <nav class="navbar bg-light border pb-0">
      <div class="container-fluid d-flex align-items-center justify-content-start">
        <BotonLogout v-if="authStore.isAuthenticated" class="ms-auto position-absolute top-0 end-0 m-3"/>
        <RouterLink to="/" class="navbar-brand fw-semibold text-secondary-emphasis">
          Gestor de Tareas
        </RouterLink>
        <ul class="nav nav-tabs border-0 col-12 col-lg-8">
          <li v-if="authStore.isAuthenticated" class="nav-item d-none d-sm-inline">
            <RouterLink to="/" class="nav-link px-1 px-sm-3" exact-active-class="active">Inicio</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <RouterLink to="/empleado" class="nav-link px-1 px-sm-3" exact-active-class="active">Empleados</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <RouterLink to="/proyecto" class="nav-link px-1 px-sm-3" exact-active-class="active">Proyectos</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <RouterLink to="/tarea" class="nav-link px-1 px-sm-3" exact-active-class="active">Tareas</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <RouterLink to="/dependencia" class="nav-link px-1 px-sm-3" exact-active-class="active">Dependencias</RouterLink>
          </li>
          <li v-if="!authStore.isAuthenticated" class="nav-item d-none d-sm-inline">
            <RouterLink to="/login" class="nav-link px-1 px-sm-3" exact-active-class="active">Login</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    <div class="flex-grow-1 p-3 col-12 col-xl-10 col-xxl-8 m-auto">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>

</style>
