import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

// Configuración base de axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // URL de tu backend Django
    headers: {
        'Content-Type': 'application/json',
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
                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: authStore.refreshToken,
                });

                // Guardar el nuevo access_token
                authStore.setAccessToken(response.data.access);

                // Actualizar el header de la solicitud original
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

                // Reintentar la solicitud original
                return axios(originalRequest);
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
