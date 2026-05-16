// src/router/index.ts
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/tarea', component: () => import('../views/TareaView.vue')},
    {path: '/proyecto', component: () => import('../views/ProyectoView.vue')},
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
