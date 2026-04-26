<template>
  <div ref="mermaidRef" class="mermaid-chart">
    <div v-if="!isClient" class="mermaid-placeholder">Loading diagram...</div>
    <div v-else-if="renderError" class="mermaid-error">{{ renderError }}</div>
    <div v-else ref="containerRef" class="mermaid-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  diagram: {
    type: String,
    required: true
  }
})

const isClient = ref(false)
const mermaidRef = ref(null)
const containerRef = ref(null)
const renderError = ref('')

const renderDiagram = async () => {
  if (!containerRef.value || !props.diagram) return

  renderError.value = ''

  try {
    const mermaid = (await import('mermaid')).default

    await mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit'
    })

    // 使用 mermaid v10+ 的 API
    const id = 'mermaid-' + Math.random().toString(36).substr(2, 9)
    const { svg } = await mermaid.render(id, props.diagram)
    containerRef.value.innerHTML = svg
  } catch (e) {
    console.error('Mermaid render error:', e)
    renderError.value = 'Diagram render failed: ' + e.message
    if (containerRef.value) {
      containerRef.value.innerHTML = ''
    }
  }
}

onMounted(async () => {
  isClient.value = true
  await nextTick()
  await renderDiagram()
})

// 监听 diagram 变化，重新渲染
watch(() => props.diagram, async () => {
  await nextTick()
  await renderDiagram()
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
