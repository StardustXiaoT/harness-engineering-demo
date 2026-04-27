<template>
  <nav class="menu-bar">
    <div class="menu-brand">Harness Engineering 架构演近</div>
    <div class="menu-items">
      <router-link to="/" class="menu-item" :class="{ active: $route.path === '/' }">
        首页
      </router-link>
      <router-link to="/ai-evolution" class="menu-item" :class="{ active: $route.path === '/ai-evolution' }">
        AI 发展
      </router-link>
      <router-link to="/agent" class="menu-item" :class="{ active: $route.path === '/agent' }">
        Agent
      </router-link>
      <router-link to="/harness" class="menu-item" :class="{ active: $route.path === '/harness' }">
        Harness
      </router-link>
      <router-link to="/claude-code" class="menu-item" :class="{ active: $route.path === '/claude-code' }">
        Claude Code
      </router-link>
      <router-link to="/openclaw" class="menu-item" :class="{ active: $route.path === '/openclaw' }">
        OpenClaw
      </router-link>
      <router-link to="/llm-providers" class="menu-item" :class="{ active: $route.path === '/llm-providers' }">
        LLM 供应商
      </router-link>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 60px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.menu-brand {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.menu-items {
  display: flex;
  gap: 8px;
}

.menu-item {
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.menu-item.active {
  background: #eff6ff;
  color: #2563eb;
}
</style>
