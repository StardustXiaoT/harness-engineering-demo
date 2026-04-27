import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EvolutionView from '../views/EvolutionView.vue'
import AgentView from '../views/AgentView.vue'
import HarnessView from '../views/HarnessView.vue'
import ClaudeCodeView from '../views/ClaudeCodeView.vue'
import OpenclawView from '../views/OpenclawView.vue'
import LLMProviderView from '../views/LLMProviderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
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
    },
    {
      path: '/claude-code',
      name: 'claude-code',
      component: ClaudeCodeView
    },
    {
      path: '/openclaw',
      name: 'openclaw',
      component: OpenclawView
    },
    {
      path: '/llm-providers',
      name: 'llm-providers',
      component: LLMProviderView
    }
  ]
})

export default router
