<template>
  <div class="vision-page">
    <div class="page-header">
      <h1 class="page-title">愿景：用真正的 Agent 铺满宇宙</h1>
      <p class="page-subtitle">这不只关乎编程 agent</p>
    </div>

    <div class="intro-section">
      <p class="intro-text">
        每一个人类从事复杂、多步骤、需要判断力的工作的领域，都是 agent 可以运作的领域 -- 只要有对的 harness。
        <br />
        <strong>模式是通用的：</strong>
      </p>
    </div>

    <div class="examples-grid">
      <div class="example-card">
        <div class="example-icon">🏰</div>
        <h3>庄园管理 agent</h3>
        <p class="example-formula">= 模型 + 物业传感器 + 维护工具 + 租户通信</p>
      </div>
      <div class="example-card">
        <div class="example-icon">🌾</div>
        <h3>农业 agent</h3>
        <p class="example-formula">= 模型 + 土壤/气象数据 + 灌溉控制 + 作物知识</p>
      </div>
      <div class="example-card">
        <div class="example-icon">🏨</div>
        <h3>酒店运营 agent</h3>
        <p class="example-formula">= 模型 + 预订系统 + 客户渠道 + 设施 API</p>
      </div>
      <div class="example-card">
        <div class="example-icon">🔬</div>
        <h3>医学研究 agent</h3>
        <p class="example-formula">= 模型 + 文献检索 + 实验仪器 + 协议文档</p>
      </div>
      <div class="example-card">
        <div class="example-icon">🏭</div>
        <h3>制造业 agent</h3>
        <p class="example-formula">= 模型 + 产线传感器 + 质量控制 + 物流系统</p>
      </div>
      <div class="example-card">
        <div class="example-icon">📚</div>
        <h3>教育 agent</h3>
        <p class="example-formula">= 模型 + 课程知识 + 学生进度 + 评估工具</p>
      </div>
    </div>

    <div class="core-section">
      <div class="core-content">
        <h3>核心洞察</h3>
        <div class="core-items">
          <div class="core-item">
            <span class="core-icon">🔄</span>
            <span><strong>循环永远不变</strong></span>
          </div>
          <div class="core-item">
            <span class="core-icon">🛠️</span>
            <span><strong>工具在变</strong></span>
          </div>
          <div class="core-item">
            <span class="core-icon">📚</span>
            <span><strong>知识在变</strong></span>
          </div>
          <div class="core-item">
            <span class="core-icon">🔒</span>
            <span><strong>权限在变</strong></span>
          </div>
        </div>
        <p class="core-conclusion">
          Agent -- 那个模型 -- 泛化一切。
        </p>
      </div>
    </div>

    <div class="motto-section">
      <blockquote class="motto">
        <p>Bash is all you need.</p>
        <p>Real agents are all the universe needs.</p>
      </blockquote>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.vision-page {
  padding: 40px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 20px;
  color: var(--text-secondary);
}

.intro-section {
  text-align: center;
  margin-bottom: 48px;
  padding: 32px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 20px;
  border: 2px solid #0ea5e9;
}

.intro-text {
  font-size: 18px;
  color: #075985;
  line-height: 1.8;
  margin: 0;
}

.intro-text strong {
  color: #0369a1;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

.example-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  text-align: center;
  transition: all 0.3s ease;
}

.example-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  border-color: #2563eb;
}

.example-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.example-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.example-formula {
  font-size: 12px;
  color: #6b7280;
  font-family: monospace;
  margin: 0;
}

.core-section {
  margin-bottom: 48px;
}

.core-content {
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border-radius: 20px;
  padding: 32px;
  border: 2px solid #8b5cf6;
}

.core-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #5b21b6;
  text-align: center;
  margin-bottom: 24px;
}

.core-items {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.core-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border-radius: 12px;
}

.core-icon {
  font-size: 20px;
}

.core-item span:last-child {
  font-size: 14px;
  color: #4b5563;
}

.core-conclusion {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #5b21b6;
  margin: 0;
  padding-top: 16px;
  border-top: 1px solid #ddd6fe;
}

.motto-section {
  text-align: center;
}

.motto {
  display: inline-block;
  padding: 32px 48px;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: 20px;
}

.motto p {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.6;
  font-family: Georgia, serif;
}

.motto p:first-child {
  margin-bottom: 12px;
}

@media (max-width: 1024px) {
  .examples-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .examples-grid {
    grid-template-columns: 1fr;
  }

  .core-items {
    flex-direction: column;
    align-items: center;
  }

  .motto p {
    font-size: 18px;
  }
}
</style>
