import '@/assets/bootstrap.scss'
// noinspection ES6UnusedImports
import * as bootstrap from 'bootstrap'

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
