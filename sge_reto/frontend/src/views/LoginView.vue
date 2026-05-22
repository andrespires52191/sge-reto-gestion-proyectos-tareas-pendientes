<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from '@/stores/authStore';

const username = ref('');
const password = ref('');
const error = ref('');

const authStore = useAuthStore();

const handleLogin = async () => {
  const success = await authStore.login(username.value, password.value);
  if (!success) {
    error.value = 'Credenciales inválidas';
  }
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-8 col-md-4">
      <h1>Iniciar sesión</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <input v-model="username" type="text" placeholder="Usuario" required
                 class="form-control form-control-sm"/>
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" placeholder="Contraseña" required
                 class="form-control form-control-sm"/>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-primary btn-sm">Login</button>
        </div>
      </form>
      <p v-if="error" class="text-danger">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
