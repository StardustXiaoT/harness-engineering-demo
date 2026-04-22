<template>
  <div class="evolution-page">
    <div class="page-header">
      <h1 class="page-title">LLM 发展之路</h1>
      <p class="page-subtitle">从 Prompt Engineering → Context Engineering → Harness Engineering</p>
    </div>

    <div class="timeline-progress">
      <div class="progress-line">
        <div class="progress-fill"></div>
      </div>
      <div class="progress-steps">
        <div class="step active">
          <span class="step-number">01</span>
          <span class="step-label">Prompt Engineering</span>
        </div>
        <div class="step">
          <span class="step-number">02</span>
          <span class="step-label">Context Engineering</span>
        </div>
        <div class="step">
          <span class="step-number">03</span>
          <span class="step-label">Harness Engineering</span>
        </div>
      </div>
    </div>

    <div class="modules-grid">
      <!-- 模块一：模型硬伤 -->
      <div class="module-card model-issues">
        <div class="card-header">
          <span class="module-tag">背景</span>
          <h3>模型硬伤</h3>
        </div>
        <p class="card-intro">理解 LLM 的局限性，是构建可靠 AI 系统的前提</p>
        <div class="issue-list">
          <div class="issue-item">
            <div class="issue-icon">🎭</div>
            <div class="issue-content">
              <h4>硬伤一：幻觉与事实不可靠</h4>
              <p>模型会自信地编造不存在的事实/代码/API/文档引用</p>
            </div>
          </div>
          <div class="issue-item">
            <div class="issue-icon">📏</div>
            <div class="issue-content">
              <h4>硬伤二：上下文窗口与记忆限制</h4>
              <p>上下文窗口有限，长任务中会遗忘早期信息；接近上限时提前收尾</p>
            </div>
          </div>
          <div class="issue-item">
            <div class="issue-icon">🌍</div>
            <div class="issue-content">
              <h4>硬伤三：缺乏真实世界感知</h4>
              <p>模型只能读文本，无法直接操作/观察真实系统；对业务规则无感</p>
            </div>
          </div>
          <div class="issue-item">
            <div class="issue-icon">🔄</div>
            <div class="issue-content">
              <h4>硬伤四：无自我纠错与目标漂移</h4>
              <p>模型倾向于合理化自己的错误；长任务中逐渐偏离原始目标</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 模块二：Prompt Engineering -->
      <div class="module-card prompt-engineering">
        <div class="card-header">
          <span class="module-tag">Phase 1</span>
          <h3>Prompt Engineering</h3>
        </div>
        <p class="card-intro">核心问题：「我该怎么问，模型才能给出好答案？」</p>
        <div class="card-content">
          <div class="concept-block">
            <h4>优化目标</h4>
            <p>优化单次输入 → 输出的质量</p>
          </div>
          <div class="technique-list">
            <span class="technique-tag">角色设定</span>
            <span class="technique-tag">思维链 (CoT)</span>
            <span class="technique-tag">少样本示例</span>
            <span class="technique-tag">结构化输出</span>
          </div>
          <div class="conclusion">
            <span class="conclusion-icon">💡</span>
            <p><strong>Prompt Engineering 解决的是表达层问题</strong>：如何把人类意图准确翻译成模型能理解的指令。</p>
          </div>
        </div>
      </div>

      <!-- 模块三：Context Engineering -->
      <div class="module-card context-engineering">
        <div class="card-header">
          <span class="module-tag">Phase 2</span>
          <h3>Context Engineering</h3>
        </div>
        <p class="card-intro">核心问题：「模型在做决策时，应该看到哪些信息？」</p>
        <div class="card-content">
          <div class="context-composition">
            <h4>上下文组成</h4>
            <div class="context-items">
              <span class="context-item">系统指令</span>
              <span class="context-item">用户输入</span>
              <span class="context-item">对话历史</span>
              <span class="context-item">检索知识</span>
              <span class="context-item">工具描述</span>
              <span class="context-item">工具输出</span>
            </div>
          </div>
          <div class="challenge-block">
            <h4>关键挑战</h4>
            <div class="challenge-items">
              <div class="challenge-item">
                <span class="challenge-label">信息太少</span>
                <span class="arrow">→</span>
                <span class="result">幻觉</span>
              </div>
              <div class="challenge-item">
                <span class="challenge-label">信息太多</span>
                <span class="arrow">→</span>
                <span class="result">注意力稀释</span>
              </div>
              <div class="challenge-item">
                <span class="challenge-label">信息冲突</span>
                <span class="arrow">→</span>
                <span class="result">决策混乱</span>
              </div>
            </div>
          </div>
          <div class="conclusion">
            <span class="conclusion-icon">💡</span>
            <p><strong>Context Engineering 解决的是信息层问题</strong>：确保模型在关键时刻拥有正确的知识，而不是靠猜。</p>
          </div>
        </div>
      </div>

      <!-- 模块四：Harness Engineering -->
      <div class="module-card harness-engineering">
        <div class="card-header">
          <span class="module-tag phase-3">Phase 3</span>
          <h3>Harness Engineering</h3>
        </div>
        <p class="card-intro">由 OpenAI 首次概念提出 · <a href="https://openai.com/index/harness-engineering/" target="_blank" class="link">查看原文 →</a></p>
        <div class="card-content">
          <div class="highlight-box">
            <p><strong>不是用 AI 写代码，而是构建一个让 AI 自动开发的软件系统</strong></p>
          </div>
          <div class="stats">
            <div class="stat">
              <span class="stat-value">5个月</span>
              <span class="stat-label">开发周期</span>
            </div>
            <div class="stat">
              <span class="stat-value">3名工程师</span>
              <span class="stat-label">人力投入</span>
            </div>
            <div class="stat">
              <span class="stat-value">100万行代码</span>
              <span class="stat-label">产出代码</span>
            </div>
            <div class="stat highlight">
              <span class="stat-value">0行</span>
              <span class="stat-label">人工编写</span>
            </div>
          </div>
          <div class="practices">
            <h4>关键实践</h4>
            <ul>
              <li><code>AGENTS.md</code> 作为「目录」而非「百科全书」，避免上下文污染</li>
              <li>每步操作自动运行测试+lint，失败则反馈给 Agent 重试</li>
              <li>用 Git 作为 Agent 的「原生记忆」，小粒度提交便于追溯</li>
            </ul>
          </div>
          <div class="three-elements">
            <h4>3 个关键要素</h4>
            <div class="elements-grid">
              <div class="element">
                <div class="element-icon">🛠️</div>
                <h5>环境（Environment）</h5>
                <p>工具、代码结构、文档</p>
                <span class="element-note">→ 决定 AI 能力上限</span>
              </div>
              <div class="element">
                <div class="element-icon">⛓️</div>
                <h5>约束（Constraints）</h5>
                <p>架构规则、lint、依赖限制</p>
                <span class="element-note">→ 防止 AI 失控</span>
              </div>
              <div class="element">
                <div class="element-icon">🔄</div>
                <h5>反馈（Feedback）</h5>
                <p>测试、日志、指标</p>
                <span class="element-note">→ 形成自动修复闭环</span>
              </div>
            </div>
          </div>
          <div class="workflow">
            <h4>工作方式</h4>
            <div class="workflow-steps">
              <span class="workflow-step">任务</span>
              <span class="workflow-arrow">→</span>
              <span class="workflow-step">AI执行</span>
              <span class="workflow-arrow">→</span>
              <span class="workflow-step">测试</span>
              <span class="workflow-arrow">→</span>
              <span class="workflow-step">反馈</span>
              <span class="workflow-arrow">→</span>
              <span class="workflow-step">修复</span>
              <span class="workflow-arrow">→</span>
              <span class="workflow-step">循环</span>
            </div>
          </div>
          <div class="final-conclusion">
            <span class="conclusion-icon">🎯</span>
            <div class="conclusion-text">
              <h4>核心结论</h4>
              <ul>
                <li>代码不再是核心资产，<strong>系统</strong>才是</li>
                <li>AI 需要「约束 + 反馈」，而不是更强模型</li>
                <li>软件工程正在变成「系统设计问题」</li>
              </ul>
            </div>
          </div>
          <div class="definition-box">
            <p><strong>最终理解：</strong></p>
            <blockquote>Harness Engineering = <strong>用工程系统管理 AI，而不是让 AI 辅助工程</strong></blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.evolution-page {
  padding: 40px 24px 80px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
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
  font-size: 22px;
  color: var(--text-secondary);
}

.timeline-progress {
  margin-bottom: 48px;
  position: relative;
}

.progress-line {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  position: relative;
  margin-bottom: 24px;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 33%;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  border-radius: 2px;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step.active .step-number {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: white;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: #9ca3af;
}

.step-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.step.active .step-label {
  color: #2563eb;
  font-weight: 600;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.module-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.card-header {
  margin-bottom: 20px;
}

.module-tag {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9999px;
  background: #dbeafe;
  color: #1e40af;
  margin-bottom: 12px;
}

.module-tag.phase-3 {
  background: linear-gradient(135deg, #eff6ff 0%, #ede9fe 100%);
  color: #7c3aed;
}

.card-header h3 {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.card-intro {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 24px;
  line-height: 1.6;
}

.link {
  color: #2563eb;
  text-decoration: underline;
}

.issue-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.issue-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border-left: 4px solid #ef4444;
}

.issue-icon {
  font-size: 24px;
}

.issue-content h4 {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.issue-content p {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

.concept-block {
  background: #f0f9ff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.concept-block h4 {
  font-size: 14px;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 8px;
}

.concept-block p {
  font-size: 15px;
  color: #0c4a6e;
}

.technique-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.technique-tag {
  padding: 6px 14px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.context-composition {
  margin-bottom: 24px;
}

.context-composition h4 {
  font-size: 14px;
  font-weight: 600;
  color: #7c3aed;
  margin-bottom: 12px;
}

.context-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.context-item {
  padding: 8px 16px;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #5b21b6;
}

.challenge-block h4 {
  font-size: 14px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 12px;
}

.challenge-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.challenge-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.challenge-label {
  color: #6b7280;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 6px;
}

.arrow {
  color: #9ca3af;
}

.result {
  color: #dc2626;
  font-weight: 600;
  padding: 4px 10px;
  background: #fef2f2;
  border-radius: 6px;
}

.highlight-box {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 16px;
  border: 1px solid #c7d2fe;
}

.highlight-box p {
  font-size: 16px;
  color: #1e3a8a;
}

.stats {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 12px;
  flex: 1;
}

.stat.highlight {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.stat.highlight .stat-value {
  color: #b45309;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

.practices {
  margin-bottom: 24px;
}

.practices h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.practices ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.practices li {
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
}

.practices li:last-child {
  border-bottom: none;
}

.practices code {
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 13px;
  color: #7c3aed;
  font-weight: 500;
}

.three-elements {
  margin-bottom: 24px;
}

.three-elements h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.elements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.element {
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  text-align: center;
}

.element-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.element h5 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.element p {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.element-note {
  font-size: 11px;
  color: #2563eb;
  font-weight: 500;
}

.workflow {
  margin-bottom: 24px;
}

.workflow h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.workflow-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.workflow-step {
  padding: 8px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.workflow-arrow {
  color: #9ca3af;
  font-size: 14px;
}

.final-conclusion {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #f0fdf4;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #bbf7d0;
}

.conclusion-icon {
  font-size: 24px;
}

.conclusion-text h4 {
  font-size: 16px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 12px;
}

.conclusion-text ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.conclusion-text li {
  padding: 6px 0;
  font-size: 14px;
  color: #15803d;
  line-height: 1.5;
}

.conclusion-text li strong {
  color: #14532d;
}

.conclusion {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f0fdf4;
  border-radius: 12px;
  border: 1px solid #bbf7d0;
  align-items: flex-start;
}

.conclusion p {
  font-size: 14px;
  color: #166534;
  line-height: 1.6;
}

.conclusion strong {
  color: #14532d;
}

.definition-box {
  padding: 24px;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: 16px;
  text-align: center;
}

.definition-box p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12px;
}

.definition-box blockquote {
  font-size: 20px;
  font-weight: 600;
  color: white;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 1024px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }

  .elements-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .module-card {
    padding: 24px;
  }
}
</style>
