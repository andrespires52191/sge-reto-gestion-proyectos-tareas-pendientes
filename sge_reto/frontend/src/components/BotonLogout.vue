<script setup lang="ts">
import {useAuthStore} from '@/stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <button @click="authStore.logout" class="btn btn-outline-secondary py-0 px-2">Cerrar sesión</button>
</template>

<style scoped>

</style>
