<template>
  <div class="agent-page">
    <div class="page-header">
      <h1 class="page-title">理解 Agent</h1>
      <p class="page-subtitle">澄清概念：Agent 框架 vs Agent 模型</p>
    </div>

    <!-- 核心观点 -->
    <div class="core观点">
      <div class="core-icon">🎯</div>
      <div class="core-content">
        <h3>核心观点</h3>
        <blockquote class="core-quote">
          An agent is a model. Not a framework. Not a prompt chain. Not a drag-and-drop workflow.
        </blockquote>
        <p class="core-translation">Agent 是模型。不是框架。不是提示词链。不是拖拽式工作流。</p>
      </div>
    </div>

    <!-- Part 1: 现有的所谓 Agent -->
    <div class="section">
      <div class="section-header">
        <span class="section-number">01</span>
        <h2 class="section-title">现有的所谓 Agent：Agent 框架/工具</h2>
      </div>
      <p class="section-intro">
        众所周知，2025年是<strong>Agent爆发的元年</strong>，各种Agent智能体层出不穷。这些其实是<strong>Agent框架</strong>（Agent Framework），而非真正的 Agent。
      </p>

      <div class="frameworks-grid">
        <div class="framework-card" v-for="fw in frameworks" :key="fw.name">
          <img :src="fw.icon" :alt="fw.name" class="framework-icon" />
          <h4 class="framework-name">{{ fw.name }}</h4>
          <p class="framework-desc">{{ fw.desc }}</p>
          <div class="framework-tags">
            <span v-for="tag in fw.tags" :key="tag" class="framework-tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="comparison-block">
        <h4>这些框架做了什么？</h4>
        <div class="comparison-items">
          <div class="comparison-item">
            <span class="comparison-icon">🔗</span>
            <span>把 LLM API 调用用 if-else 分支串在一起</span>
          </div>
          <div class="comparison-item">
            <span class="comparison-icon">📊</span>
            <span>用节点图（Node Graph）定义工作流</span>
          </div>
          <div class="comparison-item">
            <span class="comparison-icon">🛤️</span>
            <span>硬编码路由逻辑控制流程走向</span>
          </div>
          <div class="comparison-item">
            <span class="comparison-icon">🔄</span>
            <span>循环调用模型直到达到某个条件</span>
          </div>
        </div>
        <div class="comparison-warning">
          <span class="warning-icon">⚠️</span>
          <span><strong>这些不是真正的 Agent</strong>——它们只是<strong>模型调用的编排工具</strong>，本质上是更灵活的 prompt 模板。</span>
        </div>
      </div>

      <div class="workflow-visual">
        <h4>典型 Agent 框架工作流</h4>
        <div class="workflow-diagram">
          <div class="workflow-node start">用户输入</div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-node">LLM<br/><small>决策</small></div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-node action">执行动作</div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-node check">检查条件</div>
          <div class="workflow-arrow loop">↺</div>
        </div>
        <p class="workflow-note">图：典型的 ReAct/Agent 循环模式，本质是模型 + 工具调用的循环</p>
      </div>
    </div>

    <!-- Part 2: 真正的 Agent 概念 -->
    <div class="section part-two">
      <div class="section-header">
        <span class="section-number">02</span>
        <h2 class="section-title">需要理解的 Agent 概念：模型就是 Agent</h2>
      </div>

      <div class="definition-card">
        <div class="definition-icon">🤖</div>
        <div class="definition-content">
          <h3>什么是真正的 Agent？</h3>
          <p>一个真正的 Agent 是一个能够自主<strong>感知</strong>环境、进行<strong>推理</strong>、并采取<strong>行动</strong>的模型。它本身具有推理和规划能力，而不是靠外部框架来控制流程。</p>
        </div>
      </div>

      <div class="concept-comparison">
        <div class="concept-column">
          <h4>❌ Agent 框架（不是 Agent）</h4>
          <ul class="concept-list">
            <li>外部流程控制</li>
            <li>硬编码的决策逻辑</li>
            <li>通过提示词模板"模拟"推理</li>
            <li>需要人工定义工具和流程</li>
            <li>本质：工作流编排工具</li>
          </ul>
        </div>
        <div class="concept-arrow">VS</div>
        <div class="concept-column highlight">
          <h4>✓ 真正的 Agent（模型本身）</h4>
          <ul class="concept-list">
            <li>模型内置推理能力</li>
            <li>自主决策下一步行动</li>
            <li>能够理解任务目标并规划</li>
            <li>可以学习使用新工具</li>
            <li>本质：具有自主性的模型</li>
          </ul>
        </div>
      </div>

      <div class="abilities-section">
        <h4>真正 Agent 应具备的能力</h4>
        <div class="abilities-grid">
          <div class="ability-card">
            <div class="ability-icon">👁️</div>
            <h5>感知 (Perception)</h5>
            <p>接收并理解多模态输入</p>
          </div>
          <div class="ability-card">
            <div class="ability-icon">🧠</div>
            <h5>推理 (Reasoning)</h5>
            <p>分析情况，制定计划</p>
          </div>
          <div class="ability-card">
            <div class="ability-icon">🎯</div>
            <h5>规划 (Planning)</h5>
            <p>分解任务为步骤</p>
          </div>
          <div class="ability-card">
            <div class="ability-icon">🔧</div>
            <h5>工具使用 (Tool Use)</h5>
            <p>调用外部工具扩展能力</p>
          </div>
          <div class="ability-card">
            <div class="ability-icon">🔄</div>
            <h5>反思 (Reflection)</h5>
            <p>评估行动效果并调整</p>
          </div>
          <div class="ability-card">
            <div class="ability-icon">📚</div>
            <h5>学习 (Learning)</h5>
            <p>从经验中改进行为</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Part 3: 构建 Agent 的两种含义 -->
    <div class="section part-three">
      <div class="section-header">
        <span class="section-number">03</span>
        <h2 class="section-title">构建 Agent 的两种含义</h2>
      </div>
      <p class="section-intro">当人们说"构建 Agent"时，实际上指的是两件完全不同的事情：</p>

      <div class="two-approaches">
        <div class="approach-card training">
          <div class="approach-header">
            <span class="approach-icon">🧬</span>
            <h3>方式一：训练模型（Training）</h3>
          </div>
          <p class="approach-desc">通过强化学习、微调、RLHF 或其他基于梯度的方法调整模型权重</p>
          <div class="approach-steps">
            <div class="step">
              <span class="step-num">1</span>
              <span>收集任务过程数据 —— 真实领域中感知、推理、行动的实际序列</span>
            </div>
            <div class="step">
              <span class="step-num">2</span>
              <span>用这些数据来塑造模型的行为</span>
            </div>
            <div class="step">
              <span class="step-num">3</span>
              <span>模型获得"自主决策"能力</span>
            </div>
          </div>
          <div class="approach-companies">
            <span class="company-label">代表性机构：</span>
            <span class="company-tag">DeepMind</span>
            <span class="company-tag">OpenAI</span>
            <span class="company-tag">Anthropic</span>
            <span class="company-tag">腾讯 AI Lab</span>
          </div>
          <div class="approach-note">
            这是<strong>最本义的 Agent 开发</strong>——让模型本身具有 Agent 能力
          </div>
        </div>

        <div class="approach-card harness">
          <div class="approach-header">
            <span class="approach-icon">⚙️</span>
            <h3>方式二：构建 Harness（系统）</h3>
          </div>
          <p class="approach-desc">编写代码，为模型提供一个可操作的环境</p>
          <div class="approach-steps">
            <div class="step">
              <span class="step-num">1</span>
              <span>选择基础模型（API 或开源）</span>
            </div>
            <div class="step">
              <span class="step-num">2</span>
              <span>构建工具和环境（Tools + Context）</span>
            </div>
            <div class="step">
              <span class="step-num">3</span>
              <span>添加反馈循环和约束（Constraints）</span>
            </div>
            <div class="step">
              <span class="step-num">4</span>
              <span>实现自动化执行流程</span>
            </div>
          </div>
          <div class="approach-note highlight">
            这是<strong>Harness Engineering</strong>——让模型在受控环境中发挥作用
          </div>
        </div>
      </div>

      <div class="key-insight">
        <div class="insight-icon">💡</div>
        <div class="insight-content">
          <h4>关键认识</h4>
          <p>
            <strong>我们大多数人在做的事是 Harness Engineering，而非训练 Agent。</strong>
            这也是为什么本次分享的核心内容是"如何构建一个让 AI 自动开发的软件系统"，而不是"如何配置一个工作流"。
          </p>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="summary-section">
      <h3>总结</h3>
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-icon">🔧</span>
          <h4>Agent 框架</h4>
          <p>工作流编排工具，帮助调用模型</p>
        </div>
        <div class="summary-arrow">→</div>
        <div class="summary-item">
          <span class="summary-icon">🤖</span>
          <h4>真正的 Agent</h4>
          <p>具有自主推理能力的模型本身</p>
        </div>
        <div class="summary-arrow">→</div>
        <div class="summary-item">
          <span class="summary-icon">🛠️</span>
          <h4>Harness</h4>
          <p>为模型构建的运行环境系统</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const frameworks = [
  {
    name: 'Coze',
    icon: '/icons/coze.svg',
    color: '#FF6D00',
    desc: '字节跳动推出的 AI Agent 开发平台，支持工作流编排和插件扩展',
    tags: ['工作流', '插件', '多模型']
  },
  {
    name: 'Dify',
    icon: '/icons/dify.svg',
    color: '#22C55E',
    desc: '开源的大语言模型应用开发平台，支持 Prompt 编排和后端即服务',
    tags: ['开源', 'RAG', '工作流']
  },
  {
    name: 'LangGraph',
    icon: '/icons/langgraph.svg',
    color: '#3B82F6',
    desc: 'LangChain 的扩展，用于构建有状态的、多 Agent 协作的应用',
    tags: ['状态图', '多 Agent', '循环']
  },
  {
    name: 'AutoGen',
    icon: '/icons/autogen.svg',
    color: '#8B5CF6',
    desc: '微软推出的多 Agent 协作框架，支持自定义 Agent 和对话模式',
    tags: ['多 Agent', '对话', '微软']
  },
  {
    name: 'CrewAI',
    icon: '/icons/crewai.svg',
    color: '#EC4899',
    desc: '多 Agent 协作框架，强调角色扮演和任务分解',
    tags: ['角色扮演', '任务分解', '协作']
  }
]
</script>

<style scoped>
.agent-page {
  padding: 40px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 42px;
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

/* 核心观点 */
.core观点 {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 16px;
  margin-bottom: 48px;
  border: 2px solid #f59e0b;
}

.core-icon {
  font-size: 36px;
}

.core-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 12px;
}

.core-quote {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
  margin: 0 0 12px 0;
  font-style: italic;
}

.core-translation {
  font-size: 14px;
  color: #78350f;
  margin: 0;
}

/* Section 通用样式 */
.section {
  margin-bottom: 56px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.section-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.section-intro {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 32px;
}

/* Part 1: Agent 框架 */
.frameworks-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.framework-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.framework-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  border-color: #2563eb;
}

.framework-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
}

.framework-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.framework-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 12px;
}

.framework-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.framework-tag {
  font-size: 11px;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 12px;
  color: #4b5563;
}

.comparison-block {
  background: #fef2f2;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #fecaca;
}

.comparison-block h4 {
  font-size: 16px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 16px;
}

.comparison-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.comparison-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #4b5563;
}

.comparison-icon {
  font-size: 18px;
}

.comparison-warning {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 12px;
}

.warning-icon {
  font-size: 24px;
}

.comparison-warning span {
  font-size: 14px;
  color: #7f1d1d;
}

.workflow-visual {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}

.workflow-visual h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.workflow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.workflow-node {
  padding: 12px 20px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.workflow-node.start {
  background: #dbeafe;
  border-color: #2563eb;
  color: #1e40af;
}

.workflow-node.action {
  background: #dcfce7;
  border-color: #16a34a;
  color: #166534;
}

.workflow-node.check {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #92400e;
}

.workflow-arrow {
  color: #9ca3af;
  font-size: 20px;
  font-weight: bold;
}

.workflow-arrow.loop {
  color: #ef4444;
}

.workflow-note {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

/* Part 2: 真正的 Agent */
.part-two .section-number {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.definition-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-radius: 16px;
  margin-bottom: 32px;
  border: 2px solid #10b981;
}

.definition-icon {
  font-size: 48px;
}

.definition-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 12px;
}

.definition-content p {
  font-size: 15px;
  color: #047857;
  line-height: 1.7;
  margin: 0;
}

.concept-comparison {
  display: flex;
  align-items: stretch;
  gap: 24px;
  margin-bottom: 32px;
}

.concept-column {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.concept-column.highlight {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-color: #10b981;
}

.concept-column h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.concept-column:not(.highlight) h4 {
  color: #dc2626;
}

.concept-column.highlight h4 {
  color: #065f46;
}

.concept-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.concept-list li {
  padding: 10px 0;
  font-size: 14px;
  color: #4b5563;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 10px;
}

.concept-list li::before {
  content: "•";
  color: #9ca3af;
  font-weight: bold;
}

.concept-column.highlight .concept-list li::before {
  color: #10b981;
}

.concept-column:last-child {
  flex: 1;
}

.concept-arrow {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #9ca3af;
}

.abilities-section h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  text-align: center;
}

.abilities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.ability-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.ability-card:hover {
  transform: translateY(-2px);
  border-color: #10b981;
}

.ability-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.ability-card h5 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.ability-card p {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

/* Part 3: 两种构建方式 */
.part-three .section-number {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
}

.two-approaches {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.approach-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 2px solid #e5e7eb;
}

.approach-card.training {
  border-color: #3b82f6;
}

.approach-card.harness {
  border-color: #8b5cf6;
}

.approach-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.approach-icon {
  font-size: 28px;
}

.approach-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.approach-desc {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 20px;
}

.approach-steps {
  margin-bottom: 20px;
}

.approach-steps .step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
}

.approach-steps .step:last-child {
  border-bottom: none;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  flex-shrink: 0;
}

.approach-card.training .step-num {
  background: #dbeafe;
  color: #2563eb;
}

.approach-card.harness .step-num {
  background: #ede9fe;
  color: #7c3aed;
}

.approach-steps .step span:last-child {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.5;
}

.approach-companies {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.company-label {
  font-size: 12px;
  color: #6b7280;
}

.company-tag {
  font-size: 11px;
  padding: 4px 10px;
  background: #e5e7eb;
  border-radius: 12px;
  color: #4b5563;
}

.approach-note {
  font-size: 13px;
  padding: 12px;
  background: #f0f9ff;
  border-radius: 8px;
  color: #0369a1;
  text-align: center;
}

.approach-note.highlight {
  background: #f5f3ff;
  color: #7c3aed;
}

.approach-note strong {
  color: #1e40af;
}

.approach-card.harness .approach-note strong {
  color: #6d28d9;
}

.key-insight {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 16px;
  border: 2px solid #0ea5e9;
}

.insight-icon {
  font-size: 32px;
}

.insight-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 8px;
}

.insight-content p {
  font-size: 14px;
  color: #075985;
  line-height: 1.7;
  margin: 0;
}

/* 总结 */
.summary-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
}

.summary-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 24px;
}

.summary-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.summary-item {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
  flex: 1;
  max-width: 200px;
}

.summary-item .summary-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}

.summary-item h4 {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.summary-item p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.summary-arrow {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.5);
}

/* 响应式 */
@media (max-width: 1024px) {
  .frameworks-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .two-approaches {
    grid-template-columns: 1fr;
  }

  .concept-comparison {
    flex-direction: column;
  }

  .concept-arrow {
    justify-content: center;
    padding: 12px 0;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .frameworks-grid {
    grid-template-columns: 1fr;
  }

  .comparison-items {
    grid-template-columns: 1fr;
  }

  .abilities-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .summary-grid {
    flex-direction: column;
  }

  .summary-arrow {
    transform: rotate(90deg);
  }

  .summary-item {
    max-width: none;
  }
}
</style>
