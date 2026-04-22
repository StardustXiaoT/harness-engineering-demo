<template>
  <div class="harness-page">
    <div class="page-header">
      <h1 class="page-title">理解 Harness</h1>
      <p class="page-subtitle">构建让 AI Agent 可靠工作的系统</p>
    </div>

    <!-- 核心比喻 -->
    <div class="metaphor-section">
      <div class="metaphor-icon">🐴</div>
      <div class="metaphor-content">
        <h3>Harness 本身的含义是「马的挽具」</h3>
        <div class="metaphor-compare">
          <div class="metaphor-item">
            <span class="metaphor-icon-small">🐴</span>
            <span><strong>Model（模型）</strong> 是马</span>
          </div>
          <span class="metaphor-arrow">+</span>
          <div class="metaphor-item">
            <span class="metaphor-icon-small">🎀</span>
            <span><strong>Harness</strong> 是缰绳 + 马鞍 + 道路系统</span>
          </div>
        </div>
        <p class="metaphor-quote">
          "马再强壮，没有缰绳也跑不准方向；没有道路，再快也容易迷路。"
        </p>
      </div>
    </div>

    <!-- 核心问题 -->
    <div class="core-question">
      <div class="question-badge">核心问题</div>
      <h2>「如何构建一个系统，让 AI Agent 能可靠地完成复杂任务？」</h2>
    </div>

    <!-- Harness 组成 -->
    <div class="section">
      <div class="section-header">
        <span class="section-number">01</span>
        <h2 class="section-title">Harness 的组成</h2>
      </div>
      <p class="section-intro">
        Harness 是 Agent 在特定领域工作所需要的一切。Harness 的本质是为模型构建一个"可操作的环境"。
      </p>

      <div class="equation-box">
        <span class="equation-label">Harness =</span>
        <span class="equation">Tools + Knowledge + Observation + Action Interfaces + Permissions</span>
      </div>

      <div class="components-grid">
        <div class="component-card">
          <div class="component-icon">🔧</div>
          <div class="component-header">
            <h3>Tools</h3>
            <span class="component-en">工具</span>
          </div>
          <p class="component-desc">Agent 可以调用的能力扩展</p>
          <ul class="component-list">
            <li><strong>文件读写</strong> — 读取代码、配置文件、文档</li>
            <li><strong>Shell</strong> — 执行命令行操作</li>
            <li><strong>网络</strong> — HTTP 请求、API 调用</li>
            <li><strong>数据库</strong> — 查询、写入数据</li>
            <li><strong>浏览器</strong> — 自动化 Web 操作</li>
            <li><strong>代码执行</strong> — 沙箱中运行代码</li>
          </ul>
          <div class="component-note">
            💡 工具越丰富，Agent 的能力边界越宽
          </div>
        </div>

        <div class="component-card">
          <div class="component-icon">📚</div>
          <div class="component-header">
            <h3>Knowledge</h3>
            <span class="component-en">知识</span>
          </div>
          <p class="component-desc">Agent 完成任务所需的背景信息</p>
          <ul class="component-list">
            <li><strong>产品文档</strong> — 功能说明、使用指南</li>
            <li><strong>领域资料</strong> — 业务规则、专业知识</li>
            <li><strong>API 规范</strong> — 接口文档、参数说明</li>
            <li><strong>风格指南</strong> — 代码规范、命名约定</li>
            <li><strong>历史记录</strong> — 过往决策、经验总结</li>
          </ul>
          <div class="component-note">
            💡 知识越精准，Agent 的回答越可靠
          </div>
        </div>

        <div class="component-card">
          <div class="component-icon">👁️</div>
          <div class="component-header">
            <h3>Observation</h3>
            <span class="component-en">感知/观察</span>
          </div>
          <p class="component-desc">Agent 了解系统当前状态的能力</p>
          <ul class="component-list">
            <li><strong>Git Diff</strong> — 代码变更感知</li>
            <li><strong>错误日志</strong> — 运行状态监控</li>
            <li><strong>浏览器状态</strong> — 页面渲染结果</li>
            <li><strong>测试结果</strong> — 单元测试、集成测试</li>
            <li><strong>指标数据</strong> — 性能监控、错误率</li>
            <li><strong>文件变化</strong> — 目录监控、版本追踪</li>
          </ul>
          <div class="component-note">
            💡 没有观察就没有反馈，Agent 只能盲目执行
          </div>
        </div>

        <div class="component-card">
          <div class="component-icon">🎯</div>
          <div class="component-header">
            <h3>Action</h3>
            <span class="component-en">行动接口</span>
          </div>
          <p class="component-desc">Agent 影响和改变系统的方式</p>
          <ul class="component-list">
            <li><strong>CLI 命令</strong> — git、npm、docker 等</li>
            <li><strong>API 调用</strong> — 触发外部服务</li>
            <li><strong>UI 交互</strong> — 模拟用户操作</li>
            <li><strong>文件操作</strong> — 创建、修改、删除</li>
            <li><strong>流程控制</strong> — 循环、条件分支</li>
            <li><strong>消息推送</strong> — 通知、告警</li>
          </ul>
          <div class="component-note">
            💡 行动接口决定 Agent 能"做什么"
          </div>
        </div>

        <div class="component-card">
          <div class="component-icon">🔒</div>
          <div class="component-header">
            <h3>Permissions</h3>
            <span class="component-en">权限控制</span>
          </div>
          <p class="component-desc">Agent 行为的边界和安全防护</p>
          <ul class="component-list">
            <li><strong>沙箱隔离</strong> — 限制操作范围</li>
            <li><strong>审批流程</strong> — 敏感操作需确认</li>
            <li><strong>信任边界</strong> — 哪些能做，哪些不能</li>
            <li><strong>资源限制</strong> — CPU、内存、网络配额</li>
            <li><strong>访问控制</strong> — 细粒度的权限管理</li>
            <li><strong>审计日志</strong> — 记录所有操作</li>
          </ul>
          <div class="component-note">
            💡 权限决定 Agent 的"安全线"
          </div>
        </div>
      </div>
    </div>

    <!-- 核心观点 -->
    <div class="section part-two">
      <div class="section-header">
        <span class="section-number">02</span>
        <h2 class="section-title">Harness 的核心作用</h2>
      </div>

      <div class="key-point">
        <div class="point-icon">🎯</div>
        <div class="point-content">
          <h3>Harness 决定 Agent 的「能力边界」</h3>
          <p>
            Harness 就像为 Agent 修建的"高速公路系统"：</p>
          <ul class="point-list">
            <li>🚗 <strong>道路（Tools + Action）</strong> — 告诉 Agent 能走哪些路</li>
            <li>🗺️ <strong>地图（Knowledge）</strong> — 提供目的地的位置信息</li>
            <li>📡 <strong>传感器（Observation）</strong> — 让 Agent 知道自己在哪</li>
            <li>🚧 <strong>护栏（Permissions）</strong> — 防止 Agent 冲出道路</li>
          </ul>
          <p class="point-conclusion">
            造好 Harness，Agent 会完成剩下的。
          </p>
        </div>
      </div>

      <div class="analogy-section">
        <h4>类比：Harness 如同游戏的操作系统</h4>
        <div class="analogy-grid">
          <div class="analogy-item">
            <span class="analogy-icon">🎮</span>
            <div class="analogy-text">
              <strong>游戏角色</strong>
              <span>＝ Model（模型）</span>
            </div>
          </div>
          <div class="analogy-arrow">→</div>
          <div class="analogy-item">
            <span class="analogy-icon">🖥️</span>
            <div class="analogy-text">
              <strong>游戏操作系统</strong>
              <span>＝ Harness</span>
            </div>
          </div>
          <div class="analogy-arrow">→</div>
          <div class="analogy-item">
            <span class="analogy-icon">🎯</span>
            <div class="analogy-text">
              <strong>游戏表现</strong>
              <span>＝ Agent 能力</span>
            </div>
          </div>
        </div>
        <p class="analogy-note">
          同样的角色（Model），在 PC 上和手机上（不同的 Harness）表现完全不同
        </p>
      </div>
    </div>

    <!-- 与其他概念的关系 -->
    <div class="section part-three">
      <div class="section-header">
        <span class="section-number">03</span>
        <h2 class="section-title">Harness vs 其他概念</h2>
      </div>

      <div class="comparison-table">
        <div class="table-header">
          <span>概念</span>
          <span>作用对象</span>
          <span>解决的问题</span>
          <span>示例</span>
        </div>
        <div class="table-row">
          <span class="row-title">Prompt</span>
          <span>模型</span>
          <span>如何问问题</span>
          <span>"你是一个资深工程师..."</span>
        </div>
        <div class="table-row">
          <span class="row-title">Context</span>
          <span>模型</span>
          <span>给模型什么信息</span>
          <span>检索知识、对话历史</span>
        </div>
        <div class="table-row highlight">
          <span class="row-title">Harness</span>
          <span>系统</span>
          <span>让 Agent 能可靠工作</span>
          <span>工具链、权限、反馈</span>
        </div>
      </div>

      <div class="insight-box">
        <div class="insight-icon">💡</div>
        <div class="insight-content">
          <h4>关键认识</h4>
          <p>
            Prompt 解决的是"怎么说"，Context 解决的是"看什么"，Harness 解决的是"怎么让它可靠地做"。<br/>
            <strong>只有三者结合，才能构建真正可靠的 AI Agent 系统。</strong>
          </p>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="summary-section">
      <h3>总结</h3>
      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-icon">🐴→🎀</div>
          <h4>比喻</h4>
          <p>Model 是马，Harness 是缰绳 + 道路</p>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🔧</div>
          <h4>组成</h4>
          <p>Tools + Knowledge + Observation + Action + Permissions</p>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🎯</div>
          <h4>作用</h4>
          <p>决定 Agent 的能力边界和安全线</p>
        </div>
        <div class="summary-card">
          <div class="summary-icon">✅</div>
          <h4>目标</h4>
          <p>让 Agent 可靠地完成复杂任务</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.harness-page {
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

/* 核心比喻 */
.metaphor-section {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 20px;
  margin-bottom: 40px;
  border: 2px solid #f59e0b;
}

.metaphor-section > .metaphor-icon {
  font-size: 64px;
}

.metaphor-content h3 {
  font-size: 22px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 16px;
}

.metaphor-compare {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.metaphor-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: white;
  border-radius: 12px;
  font-size: 15px;
}

.metaphor-icon-small {
  font-size: 28px;
}

.metaphor-arrow {
  font-size: 24px;
  color: #92400e;
}

.metaphor-quote {
  font-size: 16px;
  color: #78350f;
  font-style: italic;
  text-align: center;
  margin: 0;
  padding: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
}

/* 核心问题 */
.core-question {
  text-align: center;
  padding: 32px;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: 20px;
  margin-bottom: 48px;
}

.question-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
}

.core-question h2 {
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin: 0;
  line-height: 1.5;
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

/* Equation */
.equation-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 16px;
  margin-bottom: 32px;
  border: 2px solid #e2e8f0;
}

.equation-label {
  font-size: 18px;
  font-weight: 600;
  color: #1e40af;
}

.equation {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  font-family: monospace;
}

/* Components Grid */
.components-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.component-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.component-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.component-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.component-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.component-en {
  font-size: 12px;
  color: #6b7280;
}

.component-desc {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 16px;
}

.component-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}

.component-list li {
  font-size: 12px;
  color: #4b5563;
  padding: 6px 0;
  border-bottom: 1px solid #f3f4f6;
  line-height: 1.4;
}

.component-list li:last-child {
  border-bottom: none;
}

.component-list strong {
  color: #1f2937;
}

.component-note {
  font-size: 12px;
  color: #0369a1;
  padding: 10px;
  background: #f0f9ff;
  border-radius: 8px;
}

/* Part 2 */
.part-two .section-number {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.key-point {
  display: flex;
  gap: 24px;
  padding: 28px;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-radius: 20px;
  margin-bottom: 32px;
  border: 2px solid #10b981;
}

.key-point .point-icon {
  font-size: 48px;
}

.key-point h3 {
  font-size: 20px;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 12px;
}

.key-point > .point-content > p {
  font-size: 14px;
  color: #047857;
  margin-bottom: 12px;
}

.point-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}

.point-list li {
  font-size: 14px;
  color: #065f46;
  padding: 8px 0;
}

.point-conclusion {
  font-size: 16px;
  font-weight: 600;
  color: #047857;
  margin: 0;
  padding: 12px;
  background: white;
  border-radius: 8px;
  text-align: center;
}

.analogy-section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}

.analogy-section h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.analogy-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.analogy-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.analogy-item .analogy-icon {
  font-size: 28px;
}

.analogy-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.analogy-text strong {
  font-size: 14px;
  color: #1f2937;
}

.analogy-text span {
  font-size: 12px;
  color: #6b7280;
}

.analogy-arrow {
  font-size: 24px;
  color: #9ca3af;
}

.analogy-note {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

/* Part 3 */
.part-three .section-number {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
}

.comparison-table {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr;
  gap: 16px;
  padding: 16px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr;
  gap: 16px;
  padding: 14px 24px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 13px;
  color: #4b5563;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.highlight {
  background: #f0f9ff;
}

.table-row .row-title {
  font-weight: 600;
  color: #1f2937;
}

.insight-box {
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

/* Summary */
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

.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.summary-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
}

.summary-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.summary-card h4 {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.summary-card p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* 响应式 */
@media (max-width: 1024px) {
  .components-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr;
  }

  .table-header span:nth-child(3),
  .table-header span:nth-child(4),
  .table-row span:nth-child(3),
  .table-row span:nth-child(4) {
    display: none;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .metaphor-section {
    flex-direction: column;
    text-align: center;
  }

  .metaphor-compare {
    flex-direction: column;
  }

  .metaphor-arrow {
    transform: rotate(90deg);
  }

  .components-grid {
    grid-template-columns: 1fr;
  }

  .summary-cards {
    grid-template-columns: 1fr;
  }

  .key-point {
    flex-direction: column;
    text-align: center;
  }

  .analogy-grid {
    flex-direction: column;
  }

  .analogy-arrow {
    transform: rotate(90deg);
  }
}
</style>
