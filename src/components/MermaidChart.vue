<template>
  <div ref="mermaidRef" class="mermaid-chart">
    <div v-if="!isClient" class="mermaid-placeholder">Loading diagram...</div>
    <div v-else ref="containerRef" class="mermaid-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  diagram: {
    type: String,
    required: true
  }
})

const isClient = ref(false)
const mermaidRef = ref(null)
const containerRef = ref(null)

onMounted(async () => {
  isClient.value = true

  // 动态导入 mermaid，确保只在客户端加载
  const mermaid = (await import('mermaid')).default

  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit'
  })

  // 渲染图表
  if (containerRef.value && props.diagram) {
    try {
      const { svg } = await mermaid.render('mermaid-' + Math.random().toString(36).substr(2, 9), props.diagram)
      containerRef.value.innerHTML = svg
    } catch (e) {
      console.error('Mermaid render error:', e)
      containerRef.value.innerHTML = `<div class="mermaid-error">Diagram render failed</div>`
    }
  }
})

// 监听 diagram 变化，重新渲染
watch(() => props.diagram, async (newDiagram) => {
  if (containerRef.value && isClient.value) {
    const mermaid = (await import('mermaid')).default
    try {
      const { svg } = await mermaid.render('mermaid-' + Math.random().toString(36).substr(2, 9), newDiagram)
      containerRef.value.innerHTML = svg
    } catch (e) {
      console.error('Mermaid render error:', e)
    }
  }
})
</script>

<style scoped>
.mermaid-chart {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.mermaid-container {
  width: 100%;
  max-width: 800px;
}

.mermaid-placeholder {
  text-align: center;
  color: #6b7280;
  padding: 20px;
}

.mermaid-error {
  text-align: center;
  color: #ef4444;
  padding: 20px;
  background: #fee2e2;
  border-radius: 8px;
}
</style>
