import { createWebHistory, createRouter } from 'vue-router'

import Home from './pages/Home.vue'
import ModList from './pages/ModList.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/strangefuture-modlist', component: ModList }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;