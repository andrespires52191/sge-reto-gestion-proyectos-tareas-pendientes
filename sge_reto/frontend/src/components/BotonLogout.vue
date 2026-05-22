<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <button @click="authStore.logout" class="btn btn-primary">Cerrar sesión</button>
</template>

<style scoped>

</style>
