// src/router/index.ts
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import EmpleadoView from "@/views/EmpleadoView.vue";
import ProyectoView from "@/views/ProyectoView.vue";
import TareaView from "@/views/TareaView.vue";
import {useAuthStore} from '@/stores/authStore';
import LoginView from "@/views/LoginView.vue";

const routes = [
    {path: '/', component: HomeView, meta: {requiresAuth: true}},
    {path: '/login', component: LoginView},
    {path: '/empleado', component: EmpleadoView, meta: {requiresAuth: true}},
    {path: '/proyecto', component: ProyectoView, meta: {requiresAuth: true}},
    {path: '/tarea', component: TareaView, meta: {requiresAuth: true}},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Guard para rutas protegidas
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
