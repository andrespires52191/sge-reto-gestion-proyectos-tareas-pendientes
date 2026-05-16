// src/router/index.ts
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import EmpleadoView from "@/views/EmpleadoView.vue";
import ProyectoView from "@/views/ProyectoView.vue";
import TareaView from "@/views/TareaView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/empleado', component: EmpleadoView},
    {path: '/proyecto', component: ProyectoView},
    {path: '/tarea', component: TareaView},
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
