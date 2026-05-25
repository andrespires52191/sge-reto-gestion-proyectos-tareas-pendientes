import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

// Configuración base de axios
const api = axios.create({
    baseURL: '/', // Las peticiones serán manejadas por el proxy de Vite
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420', // Evita que ngrok intercepte la API con su pantalla de aviso
    },
});

// Interceptor para añadir el access_token a cada solicitud
api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.accessToken) {
            config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Interceptor para manejar errores 401 (token expirado)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const authStore = useAuthStore();

        // Si el error es 401 y no se ha intentado refrescar el token antes
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Intentar refrescar el token
                const response = await axios.post('/api/token/refresh/', {
                    refresh: authStore.refreshToken,
                }, {
                    headers: { 'ngrok-skip-browser-warning': '69420' }
                });

                // Guardar el nuevo access_token
                authStore.setAccessToken(response.data.access);

                // Actualizar el header de la solicitud original
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

                // Reintentar la solicitud original usando la instancia 'api'
                return api(originalRequest);
            } catch (refreshError) {
                // Si falla el refresco, cerrar sesión y redirigir al login
                authStore.logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default api;
