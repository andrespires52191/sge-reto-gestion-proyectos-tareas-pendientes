import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import api from '@/plugins/axios';
import {useRouter} from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();

    // Estado de los tokens
    const accessToken = ref(localStorage.getItem('access_token') || null);
    const refreshToken = ref(localStorage.getItem('refresh_token') || null);

    // Computed para verificar si el usuario está autenticado
    const isAuthenticated = computed(() => !!accessToken.value);

    // Función para hacer login
    const login = async (username: string, password: string) => {
        try {
            // Más configuración de axios en src/plugins/axios.ts
            const response = await api.post('/api/token/', {
                username,
                password,
            });

            // Guardar tokens en localStorage y estado
            accessToken.value = response.data.access;
            refreshToken.value = response.data.refresh;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Redirigir a la página principal o dashboard
            router.push('/');
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        accessToken.value = null;
        refreshToken.value = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/login');
    };

    // Función para actualizar el access_token
    const setAccessToken = (newToken: string) => {
        accessToken.value = newToken;
        localStorage.setItem('access_token', newToken);
    };

    return {
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
        setAccessToken,
    };
});
