<template>
  <div class="evolution-page">
    <!-- 标题 -->
    <div class="page-header">
      <h1 class="page-title">LLM 发展之路</h1>
      <p class="page-subtitle">从 Prompt Engineering → Context Engineering → Harness Engineering</p>
    </div>

    <!-- 模型硬伤背景提示 -->
    <div class="background-note">
      <span class="note-icon">💡</span>
      <span class="note-text">背景：理解 LLM 的局限性（幻觉、上下文限制、缺乏真实世界感知、无自我纠错）是构建可靠 AI 系统的前提</span>
    </div>

    <!-- Tab 导航 -->
    <div class="tab-navigation">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        class="tab-button"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        <span class="tab-number">0{{ index + 1 }}</span>
        <span class="tab-name">{{ tab.name }}</span>
        <span class="tab-question">{{ tab.question }}</span>
      </button>
    </div>

    <!-- Tab 内容区域 -->
    <div class="tab-content">
      <!-- Prompt Engineering 内容 -->
      <div v-show="activeTab === 0" class="content-card prompt-content">
        <div class="card-header">
          <span class="phase-tag">Phase 1</span>
          <h3>Prompt Engineering</h3>
        </div>
        <p class="card-intro">核心问题：「我该怎么问，模型才能给出好答案？」</p>

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

        <div class="prompt-flow">
          <h4>Prompt 构建流程</h4>
          <div class="flow-diagram">
            <span class="flow-step">输入</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">角色</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">任务</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">约束</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">输出格式</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">LLM</span>
          </div>
        </div>

        <div class="examples-section">
          <h4>场景案例</h4>
          <div class="example-card">
            <div class="example-header">
              <span class="example-icon">🔍</span>
              <h5>案例一：代码审查</h5>
            </div>
            <div class="example-content">
              <div class="example-bad">
                <span class="example-label bad">❌ 模糊Prompt</span>
                <pre>审查这段代码</pre>
              </div>
              <div class="example-good">
                <span class="example-label good">✓ 优化后</span>
                <pre>你是一名资深Go工程师。请审查以下代码的：
1. 潜在Bug和安全风险
2. 性能问题
3. 代码规范违反
4. 单元测试覆盖率

输出格式：
- 问题列表（严重/警告/建议）
- 具体行号和修复建议</pre>
              </div>
            </div>
          </div>
          <div class="example-card">
            <div class="example-header">
              <span class="example-icon">📊</span>
              <h5>案例二：数据分析</h5>
            </div>
            <div class="example-content">
              <div class="example-bad">
                <span class="example-label bad">❌ 模糊Prompt</span>
                <pre>分析这些销售数据</pre>
              </div>
              <div class="example-good">
                <span class="example-label good">✓ 优化后</span>
                <pre>分析附件销售数据，计算：
1. 月度销售额趋势（折线图数据）
2. Top 5 产品类别占比
3. 同比/环比增长率

输出：JSON格式，包含chartData和insights数组</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="conclusion">
          <span class="conclusion-icon">💡</span>
          <p><strong>Prompt Engineering 解决的是表达层问题</strong>：如何把人类意图准确翻译成模型能理解的指令。</p>
        </div>
      </div>

      <!-- Context Engineering 内容 -->
      <div v-show="activeTab === 1" class="content-card context-content">
        <div class="card-header">
          <span class="phase-tag">Phase 2</span>
          <h3>Context Engineering</h3>
        </div>
        <p class="card-intro">核心问题：「模型在做决策时，应该看到哪些信息？」</p>

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

        <div class="context-flow">
          <h4>上下文构建流程</h4>
          <div class="flow-diagram context-flow-diagram">
            <span class="flow-step">用户输入</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">检索知识库</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">工具描述</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">历史对话</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">组合上下文</span>
            <span class="flow-arrow">→</span>
            <span class="flow-step">LLM</span>
          </div>
        </div>

        <div class="scenarios-section">
          <h4>场景案例</h4>
          <div class="scenario-card">
            <div class="scenario-header">
              <span class="scenario-icon">💬</span>
              <h5>场景一：长对话管理</h5>
            </div>
            <div class="scenario-content">
              <p class="scenario-problem">问题：50轮对话后模型开始遗忘早期需求</p>
              <div class="scenario-solution">
                <span class="solution-label">✓ 解决方案</span>
                <pre>策略1: 滑动窗口 - 保留最近N轮对话
策略2: 摘要压缩 - 每10轮生成会话摘要
策略3: 关键信息提取 - 提取需求、约束、决策点
策略4: 外部存储 - 持久化到数据库</pre>
              </div>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-header">
              <span class="scenario-icon">🔌</span>
              <h5>场景二：Tool Calling 调用外部 API</h5>
            </div>
            <div class="scenario-content">
              <p class="scenario-problem">问题：模型无法获取实时或不在训练数据中的信息</p>
              <div class="scenario-solution">
                <span class="solution-label">✓ 解决方案</span>
                <pre>1. 用户问"今天北京天气怎么样？"
2. 模型识别需要调用天气API
3. 通过 tool_use 调用 weather API
4. 获取实时天气数据
5. 返回结构化结果给模型
6. 模型生成自然语言回答</pre>
              </div>
              <p class="scenario-example"><strong>典型场景：</strong>天气查询、股票行情、数据库查询、CRM 数据获取</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-header">
              <span class="scenario-icon">📚</span>
              <h5>场景三：RAG 知识问答</h5>
            </div>
            <div class="scenario-content">
              <p class="scenario-problem">问题：模型不知道企业内部规章制度</p>
              <div class="scenario-solution">
                <span class="solution-label">✓ 解决方案</span>
                <pre>1. 用户问"年假怎么计算？"
2. 检索知识库 → 找到《员工手册》相关段落
3. 组合上下文：
   - 系统指令：基于检索内容回答
   - 检索结果：年假计算规则
   - 用户问题
4. LLM 生成答案</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="conclusion">
          <span class="conclusion-icon">💡</span>
          <p><strong>Context Engineering 解决的是信息层问题</strong>：确保模型在关键时刻拥有正确的知识，而不是靠猜。</p>
        </div>
      </div>

      <!-- Harness Engineering 内容 -->
      <div v-show="activeTab === 2" class="content-card harness-content">
        <div class="card-header">
          <span class="phase-tag phase-3">Phase 3</span>
          <h3>Harness Engineering</h3>
        </div>
        <p class="card-intro">由 OpenAI 首次概念提出 · <a href="https://openai.com/index/harness-engineering/" target="_blank" class="link">查看原文 →</a></p>

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
          <div class="practice-card">
            <div class="practice-header">
              <span class="practice-num">1</span>
              <h5>不要把知识塞进去，而是给模型"查找路径"</h5>
            </div>
            <div class="practice-content">
              <div class="code-example">
<pre>AGENTS.md
- Coding rules → /docs/coding.md
- Test strategy → /tests/README.md
- API spec → /docs/api.md</pre>
              </div>
              <p class="practice-desc">模型在需要时 <strong>👉 决定去读哪个文件</strong>，而不是把所有知识都塞进上下文</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-header">
              <span class="practice-num">2</span>
              <h5>把"判断对不对"这件事，从模型手里拿走</h5>
            </div>
            <div class="practice-content">
              <div class="flow-example">
                <span class="flow-step">AI 写代码</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step">系统跑 test/lint</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step">失败则反馈</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step">AI 再改</span>
              </div>
              <p class="practice-desc"><strong>👉 用真实环境做反馈闭环</strong></p>
              <p class="practice-change"><strong>本质变化：</strong>从"让模型自我评估" 👉 变成"用真实环境做反馈闭环"</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-header">
              <span class="practice-num">3</span>
              <h5>不让模型"记"，而是让系统"存"</h5>
            </div>
            <div class="practice-content">
              <div class="git-example">
                <p>用 Git 作为 Agent 的「原生记忆」：</p>
                <ul>
                  <li>每次修改 = <strong>commit</strong></li>
                  <li>每个决策 = <strong>diff</strong></li>
                  <li>所有历史 = <strong>可回溯</strong></li>
                </ul>
              </div>
              <p class="practice-change"><strong>本质变化：</strong>从"让模型记住发生了什么" 👉 变成"让系统记录发生了什么"</p>
            </div>
          </div>
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

    <!-- 三层包含关系可视化 -->
    <div class="layer-visualization">
      <h2 class="viz-title">三层包含关系</h2>
      <p class="viz-subtitle">从内到外：表达层 → 信息层 → 系统层</p>

      <div class="nested-container">
        <!-- 最外层：Harness Engineering -->
        <div class="outer-layer harness-layer">
          <div class="layer-badge">
            <span class="badge-icon">🛠️</span>
            <span class="badge-name">Harness Engineering</span>
            <span class="badge-question">怎么可靠运行？</span>
          </div>
          <div class="layer-tags">
            <span class="tag">工具编排</span>
            <span class="tag">安全护栏</span>
            <span class="tag">反馈循环</span>
            <span class="tag">可观测性</span>
            <span class="tag">人机协作</span>
          </div>

          <!-- 中间层：Context Engineering -->
          <div class="middle-layer context-layer">
            <div class="layer-badge">
              <span class="badge-icon">📦</span>
              <span class="badge-name">Context Engineering</span>
              <span class="badge-question">模型该看什么？</span>
            </div>
            <div class="layer-tags">
              <span class="tag">系统指令</span>
              <span class="tag">对话历史</span>
              <span class="tag">检索知识/RAG</span>
              <span class="tag">工具描述</span>
              <span class="tag">上下文管理</span>
            </div>

            <!-- 最内层：Prompt Engineering -->
            <div class="inner-layer prompt-layer">
              <div class="layer-badge">
                <span class="badge-icon">✍️</span>
                <span class="badge-name">Prompt Engineering</span>
                <span class="badge-question">该怎么问？</span>
              </div>
              <div class="layer-tags">
                <span class="tag">角色设定</span>
                <span class="tag">思维链/CoT</span>
                <span class="tag">少样本示例</span>
                <span class="tag">输出格式</span>
                <span class="tag">指令措辞</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relationship-note">
        <div class="note-item">
          <span class="note-arrow">→</span>
          <span class="note-text">Harness 包含 Context（系统层管理信息流）</span>
        </div>
        <div class="note-item">
          <span class="note-arrow">→</span>
          <span class="note-text">Context 包含 Prompt（信息层是表达层的载体）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const tabs = [
  { id: 'prompt', name: 'Prompt Engineering', question: '该怎么问？' },
  { id: 'context', name: 'Context Engineering', question: '模型该看什么？' },
  { id: 'harness', name: 'Harness Engineering', question: '怎么可靠运行？' }
]
</script>

<style scoped>
.evolution-page {
  padding: 40px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
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

/* 背景提示 */
.background-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  margin-bottom: 32px;
  border: 1px solid #f59e0b;
}

.note-icon {
  font-size: 20px;
}

.note-text {
  font-size: 14px;
  color: #92400e;
  line-height: 1.5;
}

/* Tab 导航 */
.tab-navigation {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 220px;
}

.tab-button:hover {
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
}

.tab-button.active {
  border-color: #2563eb;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
}

.tab-button.active .tab-number {
  background: #2563eb;
  color: white;
}

.tab-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  color: #6b7280;
  transition: all 0.3s ease;
}

.tab-name {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.tab-question {
  font-size: 12px;
  color: #6b7280;
  margin-left: auto;
}

.tab-button.active .tab-question {
  color: #2563eb;
}

/* Tab 内容 */
.tab-content {
  margin-bottom: 48px;
}

.content-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.phase-tag {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9999px;
  background: #dbeafe;
  color: #1e40af;
}

.phase-tag.phase-3 {
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

/* 通用样式 - 复用原有代码的样式 */
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

.prompt-flow,
.context-flow {
  margin-bottom: 24px;
}

.prompt-flow h4,
.context-flow h4 {
  font-size: 14px;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 12px;
}

.context-flow h4 {
  color: #7c3aed;
}

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 4px;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 12px;
  border: 1px solid #bae6fd;
}

.context-flow-diagram {
  background: #f5f3ff;
  border-color: #ddd6fe;
}

.flow-step {
  padding: 6px 12px;
  background: white;
  border: 1px solid #0284c7;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #0369a1;
  white-space: nowrap;
}

.context-flow-diagram .flow-step {
  border-color: #7c3aed;
  color: #5b21b6;
}

.flow-arrow {
  color: #0284c7;
  font-size: 14px;
  font-weight: 600;
}

.context-flow-diagram .flow-arrow {
  color: #7c3aed;
}

/* 案例卡片样式 */
.examples-section h4,
.scenarios-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 12px;
}

.scenarios-section h4 {
  color: #7c3aed;
}

.example-card,
.scenario-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #e5e7eb;
}

.example-header,
.scenario-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.example-icon,
.scenario-icon {
  font-size: 18px;
}

.example-header h5,
.scenario-header h5 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.example-content,
.scenario-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-bad,
.example-good,
.scenario-solution {
  padding: 12px;
  border-radius: 8px;
}

.example-bad {
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.example-good,
.scenario-solution {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.example-label,
.solution-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 6px;
}

.example-label.bad {
  color: #dc2626;
}

.example-label.good,
.solution-label {
  color: #16a34a;
}

.example-bad pre,
.example-good pre,
.scenario-solution pre {
  font-size: 11px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Monaco', 'Menlo', monospace;
}

.example-bad pre {
  color: #7f1d1d;
}

.example-good pre,
.scenario-solution pre {
  color: #14532d;
}

.scenario-problem {
  font-size: 12px;
  color: #dc2626;
  font-weight: 500;
  margin: 0;
}

.scenario-example {
  font-size: 12px;
  color: #6b7280;
  margin-top: 8px;
}

.scenario-example strong {
  color: #1f2937;
}

/* Context Engineering 样式 */
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

/* Harness Engineering 样式 */
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

.practice-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
}

.practice-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.practice-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.practice-header h5 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.practice-content {
  padding-left: 40px;
}

.code-example {
  background: #1e293b;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
}

.code-example pre {
  margin: 0;
  font-family: monospace;
  font-size: 12px;
  color: #e2e8f0;
  line-height: 1.6;
}

.flow-example {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.flow-example .flow-step {
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 12px;
  color: #4b5563;
}

.flow-example .flow-arrow {
  color: #9ca3af;
  font-size: 12px;
}

.practice-desc {
  font-size: 13px;
  color: #4b5563;
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.practice-change {
  font-size: 12px;
  color: #7c3aed;
  margin: 0;
  padding: 8px;
  background: #f5f3ff;
  border-radius: 6px;
}

.git-example {
  background: #f8fafc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
}

.git-example p {
  font-size: 13px;
  color: #4b5563;
  margin: 0 0 8px 0;
}

.git-example ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.git-example li {
  font-size: 12px;
  color: #4b5563;
  padding: 4px 0;
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

/* 三层包含关系可视化 */
.layer-visualization {
  padding: 48px 32px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 24px;
  text-align: center;
}

.viz-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.viz-subtitle {
  font-size: 16px;
  color: #64748b;
  margin-bottom: 40px;
}

.nested-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.outer-layer {
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 700px;
}

.harness-layer {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 3px solid #1976d2;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.2);
}

.harness-layer .layer-badge {
  background: #1976d2;
  color: white;
}

.harness-layer .badge-question {
  background: rgba(255, 255, 255, 0.25);
  color: #e3f2fd;
}

.harness-layer .layer-tags {
  background: rgba(255, 255, 255, 0.5);
}

.harness-layer .tag {
  background: #bbdefb;
  color: #0d47a1;
}

.middle-layer {
  border-radius: 16px;
  padding: 20px;
  margin: 20px 0;
}

.context-layer {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border: 3px solid #ef6c00;
  box-shadow: 0 4px 24px rgba(239, 108, 0, 0.15);
}

.context-layer .layer-badge {
  background: #ef6c00;
  color: white;
}

.context-layer .badge-question {
  background: rgba(255, 255, 255, 0.25);
  color: #fff3e0;
}

.context-layer .layer-tags {
  background: rgba(255, 255, 255, 0.5);
}

.context-layer .tag {
  background: #ffe0b2;
  color: #e65100;
}

.inner-layer {
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
}

.prompt-layer {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border: 3px solid #388e3c;
  box-shadow: 0 4px 16px rgba(56, 142, 60, 0.15);
}

.prompt-layer .layer-badge {
  background: #388e3c;
  color: white;
}

.prompt-layer .badge-question {
  background: rgba(255, 255, 255, 0.25);
  color: #e8f5e9;
}

.prompt-layer .layer-tags {
  background: rgba(255, 255, 255, 0.6);
}

.prompt-layer .tag {
  background: #c8e6c9;
  color: #1b5e20;
}

.layer-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

.badge-icon {
  font-size: 18px;
}

.badge-name {
  font-size: 14px;
  font-weight: 700;
}

.badge-question {
  margin-left: auto;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.layer-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border-radius: 10px;
}

.tag {
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 14px;
  white-space: nowrap;
}

.relationship-note {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.note-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.note-arrow {
  color: #64748b;
  font-size: 18px;
}

.note-text {
  font-size: 14px;
  color: #475569;
}

/* 响应式 */
@media (max-width: 1024px) {
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

  .tab-navigation {
    flex-direction: column;
    align-items: stretch;
  }

  .tab-button {
    min-width: auto;
    justify-content: flex-start;
  }

  .content-card {
    padding: 24px;
  }

  .layer-visualization {
    padding: 32px 16px;
  }

  .viz-title {
    font-size: 24px;
  }

  .outer-layer,
  .middle-layer,
  .inner-layer {
    width: 100% !important;
    max-width: none !important;
    margin-left: 0 !important;
  }

  .layer-badge {
    flex-direction: column;
    gap: 8px;
  }

  .badge-question {
    margin-left: 0;
  }
}
</style>
