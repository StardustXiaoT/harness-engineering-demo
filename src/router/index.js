import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EvolutionView from '../views/EvolutionView.vue'
import AgentView from '../views/AgentView.vue'
import HarnessView from '../views/HarnessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ai-evolution',
      name: 'evolution',
      component: EvolutionView
    },
    {
      path: '/agent',
      name: 'agent',
      component: AgentView
    },
    {
      path: '/harness',
      name: 'harness',
      component: HarnessView
    }
  ]
})

export default router
