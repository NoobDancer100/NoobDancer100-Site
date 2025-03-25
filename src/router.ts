import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/Home.vue'

const routes = [
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;