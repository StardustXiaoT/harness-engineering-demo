<template>
  <div class="home-page">
    <div class="hero-section">
      <h1 class="title">Harness Engineering 的架构演近</h1>
      <p class="subtitle">From Prompting → Orchestrating Intelligence</p>
    </div>

    <div class="word-cloud-container">
      <div class="timeline">
        <div class="timeline-line"></div>
      </div>

      <div class="cloud-grid">
        <div class="cloud-section" v-for="(section, index) in wordCloudData" :key="index">
          <h3 class="section-title">{{ section.title }}</h3>
          <div class="words">
            <span
              v-for="(word, wordIndex) in section.words"
              :key="wordIndex"
              class="word-tag"
              :class="word.size"
              :style="{ animationDelay: (index * 0.1 + wordIndex * 0.05) + 's' }"
            >
              {{ word.text }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <router-link to="/ai-evolution" class="cta-button">
        探索 AI 发展历程 →
      </router-link>
    </div>
  </div>
</template>

<script setup>
const wordCloudData = [
  {
    title: 'Agentic AI',
    words: [
      { text: 'AI Agents', size: 'large' },
      { text: 'Autonomous Agents', size: 'medium' },
      { text: 'Multi-Agent System', size: 'medium' },
      { text: 'Agent Runtime', size: 'small' },
      { text: 'Agent Loop', size: 'small' },
      { text: 'Agent Orchestration', size: 'medium' },
      { text: 'Agent Workflow', size: 'small' }
    ]
  },
  {
    title: 'Harness Engineering',
    words: [
      { text: 'Harness Engineering', size: 'large' },
      { text: 'Context Engineering', size: 'medium' },
      { text: 'Context Files', size: 'small' },
      { text: 'Session Memory', size: 'small' },
      { text: 'State Persistence', size: 'small' },
      { text: 'Identity Re-injection', size: 'small' },
      { text: 'Prompt Engineering', size: 'medium' }
    ]
  },
  {
    title: 'Tool & Skills',
    words: [
      { text: 'Tool Calling', size: 'large' },
      { text: 'Plugins', size: 'medium' },
      { text: 'Skills', size: 'medium' },
      { text: 'MCP', size: 'medium' },
      { text: 'Tool Registry', size: 'small' }
    ]
  },
  {
    title: 'Execution',
    words: [
      { text: 'Task Decomposition', size: 'medium' },
      { text: 'Subagents', size: 'medium' },
      { text: 'Worktree Isolation', size: 'small' },
      { text: 'Execution Engine', size: 'small' },
      { text: 'Planning', size: 'medium' },
      { text: 'Reflection', size: 'small' }
    ]
  },
  {
    title: 'Tools',
    words: [
      { text: 'Cursor', size: 'large' },
      { text: 'Claude Code', size: 'large' },
      { text: 'Codex', size: 'medium' },
      { text: 'Antigravity', size: 'small' }
    ]
  },
  {
    title: 'AI UI',
    words: [
      { text: 'Figma Make', size: 'medium' },
      { text: 'Google Stitch', size: 'medium' },
      { text: 'Claude Design', size: 'small' },
      { text: 'Code to UI', size: 'medium' },
      { text: 'UI Generation', size: 'small' },
      { text: 'Design to Code', size: 'medium' },
      { text: 'Code to Canvas', size: 'small' },
      { text: 'Design Systems', size: 'small' },
      { text: 'AI UI Generation', size: 'medium' }
    ]
  },
  {
    title: 'Workflow',
    words: [
      { text: 'Human in the Loop', size: 'medium' },
      { text: 'Continuous Execution', size: 'small' },
      { text: 'AI Workflow', size: 'medium' },
      { text: 'Agent Pipeline', size: 'medium' }
    ]
  }
]
</script>

<style scoped>
.home-page {
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.title {
  font-size: 52px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 24px;
  color: var(--text-secondary);
  font-weight: 400;
}

.word-cloud-container {
  position: relative;
  margin-bottom: 60px;
}

.timeline {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
}

.timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 1px;
}

.cloud-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  position: relative;
  z-index: 1;
}

.cloud-section {
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cloud-section:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.cloud-section:nth-child(odd) {
  margin-right: 20px;
}

.cloud-section:nth-child(even) {
  margin-left: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.words {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.word-tag {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 9999px;
  background: #f3f4f6;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  opacity: 0;
  animation: fadeInTag 0.5s ease forwards;
}

.word-tag.large {
  font-size: 18px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #1e40af;
  font-weight: 600;
}

.word-tag.medium {
  font-size: 15px;
  padding: 10px 20px;
  background: #f9fafb;
  color: #4b5563;
}

.word-tag.small {
  font-size: 13px;
  padding: 6px 14px;
  background: #f3f4f6;
  color: #6b7280;
}

.cta-section {
  text-align: center;
}

.cta-button {
  display: inline-block;
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
  color: white;
}

@keyframes fadeInTag {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
  }

  .subtitle {
    font-size: 18px;
  }

  .cloud-grid {
    grid-template-columns: 1fr;
  }

  .cloud-section {
    margin: 0 !important;
  }
}
</style>
