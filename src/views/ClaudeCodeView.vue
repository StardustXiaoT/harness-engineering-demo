<template>
  <div class="claude-code-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">Claude Code Harness 架构</h1>
      <p class="page-subtitle">从单工具循环到多代理协作系统</p>
    </div>

    <!-- 为什么选择 Claude Code -->
    <div class="why-claude-code">
      <h2>为什么用 Claude Code 讲解 Harness Engineering？</h2>

      <div class="reasons-grid">
        <div class="reason-card">
          <div class="reason-icon">🎯</div>
          <h4>极简设计</h4>
          <p>从单个工具 (bash) 开始，逐步展示如何添加能力，完美诠释"Harness 是逐步构建的"</p>
        </div>
        <div class="reason-card">
          <div class="reason-icon">📦</div>
          <h4>清晰分层</h4>
          <p>5 个架构层次：Execution → Capability → Planning → Context → Multi-Agent</p>
        </div>
        <div class="reason-card">
          <div class="reason-icon">🔍</div>
          <h4>可观察性</h4>
          <p>每个设计决策都有明确的动机和权衡，便于理解 Harness 的演进逻辑</p>
        </div>
        <div class="reason-card">
          <div class="reason-icon">🛠️</div>
          <h4>实践导向</h4>
          <p>不是理论框架，而是真实可用的系统，每一层都解决实际问题</p>
        </div>
      </div>
    </div>

    <!-- 架构层次总览 -->
    <div class="architecture-overview">
      <h2>Harness 架构层次</h2>
      <div class="layer-tabs">
        <div
          v-for="layer in layers"
          :key="layer.id"
          class="layer-tab"
          :class="{ active: activeTab === layer.id }"
          :data-level="layer.level"
          @click="activeTab = layer.id"
        >
          <span class="layer-tab-icon">{{ layer.icon }}</span>
          <div class="layer-tab-content">
            <span class="layer-tab-level">{{ layer.level }}</span>
            <span class="layer-tab-name">{{ layer.name }}</span>
            <span class="layer-tab-desc">{{ layer.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 内容区域 -->
    <div class="tab-content-area">

      <!-- ==================== 1. EXECUTION 执行内核 ==================== -->
      <div v-show="activeTab === 'execution'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-1">Level 1</span>
          <h3>Execution 执行内核</h3>
        </div>
        <p class="section-intro">
          Agent 的最小形态：一个 while 循环 + 一个工具。模型可以推理代码，但无法"触碰"真实世界——直到你给它工具。
        </p>

        <div class="concept-card full-width">
          <div class="concept-header">
            <span class="concept-icon">🔄</span>
            <div>
              <h4>Agent Loop</h4>
              <span class="concept-subtitle">核心循环模式</span>
            </div>
          </div>
          <p class="concept-desc">
            所有 AI Agent 的核心模式：调用 LLM → 检查是否需要使用工具 → 执行工具 → 添加结果 → 继续循环。
          </p>

          <!-- 并排布局：流程图 + 代码 -->
          <div class="split-layout">
            <div class="split-panel">
              <h4 class="split-title">流程图</h4>
              <!-- Agent Loop Mermaid 流程图 -->
              <MermaidChart :diagram="agentLoopDiagram" />
            </div>
            <div class="split-panel">
              <h4 class="split-title">核心实现</h4>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">Agent Loop</span>
                  <span class="code-lang">Python</span>
                </div>
                <pre><code v-html="highlightedAgentLoop"></code></pre>
              </div>
            </div>
          </div>

          <!-- JSON 结构展示 -->
          <div class="json-section">
            <h4 class="json-section-title">💬 API 调用 JSON 结构</h4>
            <div class="json-tabs">
              <button
                class="json-tab"
                :class="{ active: activeJsonTab === 'multi' }"
                @click="activeJsonTab = 'multi'"
              >
                📚 多轮调用
              </button>
              <button
                class="json-tab"
                :class="{ active: activeJsonTab === 'request' }"
                @click="activeJsonTab = 'request'"
              >
                📤 Tool Request
              </button>
              <button
                class="json-tab"
                :class="{ active: activeJsonTab === 'result' }"
                @click="activeJsonTab = 'result'"
              >
                ✅ Tool Result
              </button>
            </div>

            <div v-show="activeJsonTab === 'multi'" class="json-content">
              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">多轮调用 - messages 数组</span>
                  <span class="code-lang">JSON</span>
                </div>
                <pre><code v-html="highlightedMultiTurnJson"></code></pre>
              </div>
            </div>

            <div v-show="activeJsonTab === 'request'" class="json-content">
              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">单次工具调用请求</span>
                  <span class="code-lang">JSON</span>
                </div>
                <pre><code v-html="highlightedToolRequestJson"></code></pre>
              </div>
            </div>

            <div v-show="activeJsonTab === 'result'" class="json-content">
              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">工具执行结果</span>
                  <span class="code-lang">JSON</span>
                </div>
                <pre><code v-html="highlightedToolResultJson"></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== 2. CAPABILITY 能力层 ==================== -->
      <div v-show="activeTab === 'capability'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-2">Level 2</span>
          <h3>Capability 能力层：Skills / Tools</h3>
        </div>
        <p class="section-intro">
          工具让模型能够行动，Skills 提供复合能力和领域知识。
        </p>

        <div class="concept-cards">
          <!-- Tool Use -->
          <div class="concept-card full-width">
            <div class="concept-header">
              <span class="concept-icon">🔧</span>
              <div>
                <h4>Tool Use</h4>
                <span class="concept-subtitle">工具调用机制</span>
              </div>
            </div>
            <p class="concept-desc">
              LLM 输出结构化的工具调用请求 → Harness 执行对应函数 → 返回结果给模型。
            </p>

            <!-- Tool Dispatch Mermaid 流程图 -->
            <MermaidChart :diagram="toolDispatchDiagram" />

            <div class="code-block">
              <div class="code-header">
                <span class="code-title">工具定义与分发</span>
                <span class="code-lang">Python</span>
              </div>
              <pre><code v-html="highlightedToolUse"></code></pre>
            </div>
          </div>

          <!-- Skills -->
          <div class="concept-card full-width">
            <div class="concept-header">
              <span class="concept-icon">📚</span>
              <div>
                <h4>Skills</h4>
                <span class="concept-subtitle">技能与渐进式知识披露</span>
              </div>
            </div>
            <p class="concept-desc">
              Skill 是预定义的任务流程，封装复杂操作为可复用的技能。通过渐进式披露优化上下文使用。
            </p>

            <!-- Skill 定义 -->
            <div class="skill-definition">
              <h4 class="subsection-title">💡 什么是 Skill？</h4>
              <div class="definition-box">
                <p>
                  <strong>Skill = Step-by-Step Orchestration（完整任务流程）</strong>
                </p>
                <p class="definition-desc">
                  Skill 不是单一指令，而是一系列有序步骤的组合。它将复杂任务分解为模型可以逐步执行的操作，
                  每个步骤包含明确的指令、期望输出和验证方式。
                </p>
              </div>
            </div>

            <!-- Skill 目录结构 -->
            <div class="code-block" style="margin-top: 20px;">
              <div class="code-header">
                <span class="code-title">Skill 目录结构</span>
                <span class="code-lang">Directory</span>
              </div>
              <pre><code v-html="highlightedSkillStructure"></code></pre>
            </div>

            <!-- Skill 设计原则 -->
            <div class="skill-design">
              <h4 class="subsection-title">📐 Skill 设计原则</h4>
              <div class="design-grid">
                <div class="design-item">
                  <span class="design-icon">🎯</span>
                  <strong>单一职责</strong>
                  <span>每个 Skill 只做一件事，边界清晰</span>
                </div>
                <div class="design-item">
                  <span class="design-icon">📦</span>
                  <strong>结构化</strong>
                  <span>Markdown 清单 + 步骤 + 示例</span>
                </div>
                <div class="design-item">
                  <span class="design-icon">🛠️</span>
                  <strong>可操作</strong>
                  <span>包含具体命令、参数和验证步骤</span>
                </div>
              </div>
            </div>

            <!-- 系统层优化策略 -->
            <div class="skill-optimization">
              <h4 class="subsection-title">⚙️ 系统层优化策略</h4>
              <div class="optimization-grid">
                <div class="optimization-item">
                  <div class="optimization-header">
                    <span class="optimization-icon">📥</span>
                    <strong>按需加载</strong>
                  </div>
                  <p>只在模型请求时加载 Skill 内容，避免预加载所有知识占用上下文。</p>
                </div>
                <div class="optimization-item">
                  <div class="optimization-header">
                    <span class="optimization-icon">📊</span>
                    <strong>渐进式披露</strong>
                  </div>
                  <p>Layer 1 显示技能名称，Layer 2 按需展示完整内容，最小化 token 消耗。</p>
                </div>
              </div>
            </div>

            <!-- 两层架构展示 -->
            <div class="skill-architecture">
              <div class="layer-box layer-1">
                <div class="layer-header">
                  <span class="layer-badge">Layer 1</span>
                  <span class="layer-cost">~50-100 token/技能</span>
                </div>
                <div class="layer-title">系统提示 · 始终存在</div>
                <pre class="layer-content">Skills available:
  - git: Git workflow and best practices
  - code-review: Security and quality checklist
  - mcp-builder: MCP server development guide
  - testing: Unit and integration testing patterns</pre>
              </div>

              <div class="layer-arrow">↓ 当模型调用 <code>load_skill("git")</code></div>

              <div class="layer-box layer-2">
                <div class="layer-header">
                  <span class="layer-badge">Layer 2</span>
                  <span class="layer-cost">~500-2000 token</span>
                </div>
                <div class="layer-title">tool_result · 按需加载</div>
                <pre class="layer-content">&lt;skill name="git"&gt;
## Git Workflow - Step by Step

### 1. Create Feature Branch
  git checkout -b feature/description

### 2. Make Changes
  - Edit files in small batches
  - Run tests after each change

### 3. Commit
  git add -A
  git commit -m "feat: description"

### 4. Sync with Main
  git fetch origin
  git rebase origin/main

### 5. Push and PR
  git push -u origin feature/description
  # Then create PR on GitHub
&lt;/skill&gt;</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== 3. PLANNING 规划层 ==================== -->
      <div v-show="activeTab === 'planning'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-3">Level 3</span>
          <h3>Planning 规划层</h3>
        </div>
        <p class="section-intro">
          多步骤任务需要明确的状态追踪和依赖管理。
        </p>

        <div class="concept-cards">
          <!-- Todo / Plan -->
          <div class="concept-card full-width">
            <div class="concept-header">
              <span class="concept-icon">✅</span>
              <h4>Todo / Plan</h4>
              <span class="concept-subtitle">任务清单与进度追踪</span>
            </div>
            <p class="concept-desc">
              显式的进度追踪：pending → in_progress → completed。强制单一焦点，避免模型迷失。
            </p>

            <!-- Todo Flow Diagram -->
            <MermaidChart :diagram="todoFlowDiagram" />
          </div>

          <!-- Task Graph -->
          <div class="concept-card full-width">
            <div class="concept-header">
              <span class="concept-icon">🕸️</span>
              <h4>Task Graph</h4>
              <span class="concept-subtitle">任务依赖图 (DAG)</span>
            </div>
            <p class="concept-desc">
              真实任务有结构：依赖关系决定执行顺序，支持并行执行。
            </p>

            <!-- Task Graph Mermaid 流程图 -->
            <MermaidChart :diagram="taskGraphDiagram" />

            <!-- Task JSON Files Grid -->
            <div class="task-json-section">
              <h4 class="task-json-section-title">📋 Task JSON 文件 (.tasks/task_N.json)</h4>
              <div class="task-json-grid">
                <div class="task-json-item">
                  <div class="task-json-header">
                    <span class="task-json-badge">task_1.json</span>
                    <span class="task-json-status completed">completed</span>
                  </div>
                  <div class="code-block">
                    <pre><code v-html="highlightedTask1"></code></pre>
                  </div>
                </div>

                <div class="task-json-item">
                  <div class="task-json-header">
                    <span class="task-json-badge">task_2.json</span>
                    <span class="task-json-status in_progress">in_progress</span>
                  </div>
                  <div class="code-block">
                    <pre><code v-html="highlightedTask2"></code></pre>
                  </div>
                </div>

                <div class="task-json-item">
                  <div class="task-json-header">
                    <span class="task-json-badge">task_3.json</span>
                    <span class="task-json-status pending">pending</span>
                  </div>
                  <div class="code-block">
                    <pre><code v-html="highlightedTask3"></code></pre>
                  </div>
                </div>

                <div class="task-json-item">
                  <div class="task-json-header">
                    <span class="task-json-badge">task_4.json</span>
                    <span class="task-json-status pending">blocked</span>
                  </div>
                  <div class="code-block">
                    <pre><code v-html="highlightedTask4"></code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== 4. CONTEXT 上下文层 ==================== -->
      <div v-show="activeTab === 'context'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-4">Level 4</span>
          <h3>Context 上下文层</h3>
        </div>
        <p class="section-intro">
          上下文窗口是有限的。压缩让 Agent 能在大型代码库上工作。
        </p>

          <div class="concept-card full-width">
            <div class="concept-header">
              <span class="concept-icon">🗜️</span>
              <div>
                <h4>Context Compression</h4>
                <span class="concept-subtitle">三层压缩策略</span>
              </div>
            </div>

            <!-- Context Compression Mermaid 流程图 -->
            <MermaidChart :diagram="contextCompressionDiagram" />

            <!-- 三层压缩说明 -->
            <div class="compression-layers">
              <div class="compression-layer-item">
                <div class="compression-layer-header">
                  <span class="compression-layer-badge layer-1">Layer 1</span>
                  <span class="compression-layer-title">micro_compact</span>
                  <span class="compression-layer-trigger">每轮自动触发</span>
                </div>
                <div class="compression-layer-content">
                  <p><strong>触发条件：</strong>每次工具调用结果返回后（静默执行）</p>
                  <p><strong>操作：</strong>检查是否有超过 3 轮历史的 tool_result，如果有则替换为简短占位符 <code>[Previous: used {tool_name}]</code></p>
                  <p><strong>目的：</strong>减少旧工具结果占用，保持上下文新鲜</p>
                </div>
              </div>

              <div class="compression-layer-item">
                <div class="compression-layer-header">
                  <span class="compression-layer-badge layer-2">Layer 2</span>
                  <span class="compression-layer-title">auto_compact</span>
                  <span class="compression-layer-trigger">tokens &gt; 50000</span>
                </div>
                <div class="compression-layer-content">
                  <p><strong>触发条件：</strong>上下文 token 数超过 50000</p>
                  <p><strong>操作：</strong>
                    <ul>
                      <li>保存完整对话记录到 <code>.transcripts/</code> 目录</li>
                      <li>LLM 生成对话摘要</li>
                      <li>用 <code>[summary]</code> 替换所有历史消息</li>
                    </ul>
                  </p>
                  <p><strong>目的：</strong>自动压缩长对话，避免超出上下文限制</p>
                </div>
              </div>

              <div class="compression-layer-item">
                <div class="compression-layer-header">
                  <span class="compression-layer-badge layer-3">Layer 3</span>
                  <span class="compression-layer-title">compact tool</span>
                  <span class="compression-layer-trigger">模型主动调用</span>
                </div>
                <div class="compression-layer-content">
                  <p><strong>触发条件：</strong>模型判断需要压缩时主动调用 compact 工具</p>
                  <p><strong>操作：</strong>与 auto_compact 相同（LLM 摘要 + 替换消息）</p>
                  <p><strong>目的：</strong>赋予模型自主控制上下文大小的能力</p>
                </div>
              </div>
            </div>
          </div>
      </div>

      <!-- ==================== 5. MULTI-AGENT 多代理与运行时 ==================== -->
      <div v-show="activeTab === 'multi-agent'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-5">Level 5</span>
          <h3>Multi-Agent & Runtime 多代理与运行时</h3>
        </div>
        <p class="section-intro">
          多代理协作需要清晰的通信协议和隔离机制。
        </p>

        <div class="concept-cards">
          <!-- Subagents -->
          <div class="concept-card full-width">
            <div class="concept-header">
              <span class="concept-icon">👥</span>
              <h4>Subagents</h4>
              <span class="concept-subtitle">为什么需要子代理？</span>
            </div>
            <p class="concept-desc">
              当你需要探索代码库、分析多个文件、或执行复杂任务时，子代理用独立的上下文换取清晰的摘要，保持主代理专注。
            </p>

            <!-- 核心概念对比 -->
            <div class="subagent-concept">
              <div class="concept-grid">
                <div class="concept-box without-subagent">
                  <div class="concept-box-header">❌ 没有 Subagent</div>
                  <div class="concept-box-content">
                    <pre>主代理 messages:
├─ 用户：分析项目结构
├─ 助手：read_file package.json
├─ 工具：{...500 行}
├─ 助手：read_file src/main.py
├─ 工具：{...800 行}
├─ 助手：read_file tests/test_*.py
├─ 工具：{...2000 行}
└─ ...上下文被细节淹没</pre>
                  </div>
                </div>
                <div class="concept-box with-subagent">
                  <div class="concept-box-header">✅ 使用 Subagent</div>
                  <div class="concept-box-content">
                    <pre>主代理 messages:
├─ 用户：分析项目结构
├─ 助手：task(分析项目)
├─ 工具：
  "这是 Python 项目，使用
   pytest 测试框架，包含
   3 个核心模块..."
└─ 主代理继续思考下一步

子代理 messages (已丢弃):
├─ 读取 15 个文件
├─ 执行 8 次工具调用
└─ 生成摘要</pre>
                  </div>
                </div>
              </div>
            </div>

            <!-- 架构图 -->
            <MermaidChart :diagram="subagentArchDiagram" />

            <!-- 关键点 -->
            <div class="subagent-key-points">
              <h4 class="subsection-title">🔑 关键点</h4>
              <div class="key-points-grid">
                <div class="key-point-item">
                  <span class="key-point-icon">🧠</span>
                  <div>
                    <strong>独立上下文</strong>
                    <p>子代理有完全独立的 <code>messages=[]</code>，与父代理的对话历史隔离。</p>
                  </div>
                </div>
                <div class="key-point-item">
                  <span class="key-point-icon">🔧</span>
                  <div>
                    <strong>工具隔离</strong>
                    <p>子代理不能调用 <code>task</code> 工具，防止无限递归创建子代理。</p>
                  </div>
                </div>
                <div class="key-point-item">
                  <span class="key-point-icon">📦</span>
                  <div>
                    <strong>摘要返回</strong>
                    <p>子代理的整个执行历史（可能 30+ 次工具调用）被丢弃，只返回最终摘要。</p>
                  </div>
                </div>
                <div class="key-point-item">
                  <span class="key-point-icon">🔄</span>
                  <div>
                    <strong>共享文件系统</strong>
                    <p>父子代理共享同一工作目录，子代理的修改对父代理可见。</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 代码示例 -->
            <div class="code-block">
              <div class="code-header">
                <span class="code-title">核心实现：父代理 + 子代理循环</span>
                <span class="code-lang">Python</span>
              </div>
              <pre><code v-html="highlightedSubagentCode"></code></pre>
            </div>

            <!-- 使用场景 -->
            <div class="subagent-use-cases">
              <h4 class="subsection-title">📌 什么时候使用 Subagent？</h4>
              <div class="use-cases-grid">
                <div class="use-case-item">
                  <span class="use-case-icon">✅</span>
                  <div>
                    <strong>适合使用</strong>
                    <ul>
                      <li>探索未知代码库</li>
                      <li>分析多个相关文件</li>
                      <li>执行独立子任务</li>
                      <li>需要清晰摘要的场景</li>
                    </ul>
                  </div>
                </div>
                <div class="use-case-item">
                  <span class="use-case-icon">❌</span>
                  <div>
                    <strong>不适合使用</strong>
                    <ul>
                      <li>简单单步操作</li>
                      <li>需要保留详细历史</li>
                      <li>任务之间有强依赖</li>
                      <li>需要人类介入的决策</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Background Tasks -->
          <div class="concept-card full-width">
            <div class="concept-header">
              <span class="concept-icon">⏳</span>
              <h4>Background Tasks</h4>
              <span class="concept-subtitle">后台执行</span>
            </div>
            <p class="concept-desc">
              慢操作丢后台，agent 继续想下一步。后台线程跑命令，完成后注入通知。
            </p>

            <!-- 工作原理 -->
            <div class="bg-how-it-works">
              <h4 class="subsection-title">📖 工作原理</h4>

              <div class="bg-step">
                <div class="bg-step-number">1</div>
                <div class="bg-step-content">
                  <p><strong>BackgroundManager 用线程安全的通知队列追踪任务</strong></p>
                  <div class="code-block">
                    <pre><code v-html="highlightedBgStep1"></code></pre>
                  </div>
                </div>
              </div>

              <div class="bg-step">
                <div class="bg-step-number">2</div>
                <div class="bg-step-content">
                  <p><strong>`run()` 启动守护线程，立即返回</strong></p>
                  <div class="code-block">
                    <pre><code v-html="highlightedBgStep2"></code></pre>
                  </div>
                </div>
              </div>

              <div class="bg-step">
                <div class="bg-step-number">3</div>
                <div class="bg-step-content">
                  <p><strong>子进程完成后，结果进入通知队列</strong></p>
                  <div class="code-block">
                    <pre><code v-html="highlightedBgStep3"></code></pre>
                  </div>
                </div>
              </div>

              <div class="bg-step">
                <div class="bg-step-number">4</div>
                <div class="bg-step-content">
                  <p><strong>每次 LLM 调用前排空通知队列</strong></p>
                  <div class="code-block">
                    <pre><code v-html="highlightedBgStep4"></code></pre>
                  </div>
                </div>
              </div>

              <p class="bg-summary">循环保持单线程。只有子进程 I/O 被并行化。</p>
            </div>

            <!-- Key Insight -->
            <div class="key-insight-box">
              <span class="insight-icon">💡</span>
              <div>
                <strong>核心洞察：</strong>
                <code>"Fire and forget -- the agent doesn't block while the command runs."</code>
              </div>
            </div>
          </div>

          <!-- Agent Teams -->
          <div class="concept-card">
            <div class="concept-header">
              <span class="concept-icon">🤝</span>
              <h4>Agent Teams</h4>
              <span class="concept-subtitle">JSONL 邮箱</span>
            </div>
            <p class="concept-desc">
              团队成员通过 JSONL 文件通信：发送消息 → 写入对方 inbox → 对方轮询读取。
            </p>
          </div>

          <!-- Worktree Isolation -->
          <div class="concept-card full-width">
            <div class="concept-header">
              <span class="concept-icon">🌳</span>
              <h4>Worktree Isolation</h4>
              <span class="concept-subtitle">并行执行环境</span>
            </div>
            <p class="concept-desc">
              为并行任务创建独立的 git worktree，避免文件系统冲突。
            </p>

            <!-- Worktree Isolation Mermaid 流程图 -->
            <MermaidChart :diagram="worktreeIsolationDiagram" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import json from 'highlight.js/lib/languages/json'
import plaintext from 'highlight.js/lib/languages/plaintext'
import 'highlight.js/styles/atom-one-dark.css'
import MermaidChart from '../components/MermaidChart.vue'

hljs.registerLanguage('python', python)
hljs.registerLanguage('json', json)
hljs.registerLanguage('plaintext', plaintext)

const activeTab = ref('execution')

// JSON Tab 状态
const activeJsonTab = ref('multi')

// Todo JSON 高亮
const highlightedTodoPending = computed(() => {
  return hljs.highlight(todoPendingJson, { language: 'json' }).value
})

const highlightedTodoInProgress = computed(() => {
  return hljs.highlight(todoInProgressJson, { language: 'json' }).value
})

const highlightedTodoCompleted = computed(() => {
  return hljs.highlight(todoCompletedJson, { language: 'json' }).value
})

// Task JSON 高亮
const highlightedTask1 = computed(() => {
  return hljs.highlight(task1Json, { language: 'json' }).value
})

const highlightedTask2 = computed(() => {
  return hljs.highlight(task2Json, { language: 'json' }).value
})

const highlightedTask3 = computed(() => {
  return hljs.highlight(task3Json, { language: 'json' }).value
})

const highlightedTask4 = computed(() => {
  return hljs.highlight(task4Json, { language: 'json' }).value
})

// Subagent 流程图
const subagentArchDiagram = `
flowchart TB
    subgraph Parent["🧞 Parent Agent"]
        P1["messages: [...]"]
        P2["tools: bash, read, write, edit, + task"]
    end

    subgraph Child["👶 Subagent (Fresh Context)"]
        C1["messages: []"]
        C2["tools: bash, read, write, edit"]
        C3["while loop: max 30 turns"]
    end

    User["👤 User:<br/>'分析项目结构'"] --> P1
    P1 --> |"调用 task 工具"| C1
    C1 --> C2 --> C3
    C3 --> |"📦 返回摘要"| P1
    C3 -.->|"❌ 丢弃全部历史"| Discard[("🗑️")]

    style Parent fill:#dbeafe,stroke:#3b82f6
    style Child fill:#f0fdf4,stroke:#10b981
    style User fill:#f3e8ff,stroke:#8b5cf6
    style Discard fill:#fee2e2,stroke:#ef4444
`

const subagentCode = `# Parent: 主代理循环
def agent_loop(messages: list):
    while True:
        response = client.messages.create(
            model=MODEL, system=SYSTEM, messages=messages,
            tools=PARENT_TOOLS, max_tokens=8000,
        )
        messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "tool_use":
            return  # 完成

        results = []
        for block in response.content:
            if block.type == "tool_use":
                if block.name == "task":
                    # 创建子代理，传入独立 prompt
                    output = run_subagent(block.input["prompt"])
                else:
                    handler = TOOL_HANDLERS[block.name]
                    output = handler(**block.input)
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(output)
                })
        messages.append({"role": "user", "content": results})


# Child: 子代理 - 独立上下文
def run_subagent(prompt: str) -> str:
    sub_messages = [{"role": "user", "content": prompt}]  # 全新开始
    for _ in range(30):  # 安全限制
        response = client.messages.create(
            model=MODEL, system=SUBAGENT_SYSTEM,
            messages=sub_messages,
            tools=CHILD_TOOLS, max_tokens=8000,
        )
        sub_messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "tool_use":
            break
        results = []
        for block in response.content:
            if block.type == "tool_use":
                handler = TOOL_HANDLERS.get(block.name)
                output = handler(**block.input)
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(output)[:50000]
                })
        sub_messages.append({"role": "user", "content": results})
    # 子代理历史被丢弃，只返回最终文本
    return "".join(b.text for b in response.content if hasattr(b, "text")) or "(no summary)"
`

const highlightedSubagentCode = computed(() => {
  return hljs.highlight(subagentCode, { language: 'python' }).value
})

// Background Tasks 代码 - 来自中文文档
const bgStep1Code = `class BackgroundManager:
    def __init__(self):
        self.tasks = {}
        self._notification_queue = []
        self._lock = threading.Lock()`

const bgStep2Code = `def run(self, command: str) -> str:
    task_id = str(uuid.uuid4())[:8]
    self.tasks[task_id] = {"status": "running", "command": command}
    thread = threading.Thread(
        target=self._execute, args=(task_id, command), daemon=True)
    thread.start()
    return f"Background task {task_id} started"`

const bgStep3Code = `def _execute(self, task_id, command):
    try:
        r = subprocess.run(command, shell=True, cwd=WORKDIR,
            capture_output=True, text=True, timeout=300)
        output = (r.stdout + r.stderr).strip()[:50000]
    except subprocess.TimeoutExpired:
        output = "Error: Timeout (300s)"
    with self._lock:
        self._notification_queue.append({
            "task_id": task_id, "result": output[:500]})`

const bgStep4Code = `def agent_loop(messages: list):
    while True:
        notifs = BG.drain_notifications()
        if notifs:
            notif_text = "\\n".join(
                f"[bg:{n['task_id']}] {n['result']}" for n in notifs)
            messages.append({"role": "user",
                "content": f"<background-results>\\n{notif_text}\\n</background-results>"})
            messages.append({"role": "assistant",
                "content": "Noted background results."})
        response = client.messages.create(...)`

const highlightedBgStep1 = computed(() => {
  return hljs.highlight(bgStep1Code, { language: 'python' }).value
})

const highlightedBgStep2 = computed(() => {
  return hljs.highlight(bgStep2Code, { language: 'python' }).value
})

const highlightedBgStep3 = computed(() => {
  return hljs.highlight(bgStep3Code, { language: 'python' }).value
})

const highlightedBgStep4 = computed(() => {
  return hljs.highlight(bgStep4Code, { language: 'python' }).value
})

const layers = [
  { id: 'execution', level: 'Level 1', name: 'Execution', desc: '执行内核', icon: '⚙️' },
  { id: 'capability', level: 'Level 2', name: 'Capability', desc: '能力层', icon: '🔧' },
  { id: 'planning', level: 'Level 3', name: 'Planning', desc: '规划层', icon: '📋' },
  { id: 'context', level: 'Level 4', name: 'Context', desc: '上下文层', icon: '🧠' },
  { id: 'multi-agent', level: 'Level 5', name: 'Multi-Agent', desc: '多代理与运行时', icon: '🤝' }
]

// 代码示例高亮
const highlightedAgentLoop = computed(() => {
  return hljs.highlight(agentLoopCode, { language: 'python' }).value
})

const highlightedToolUse = computed(() => {
  return hljs.highlight(toolUseCode, { language: 'python' }).value
})

const highlightedSkillStructure = computed(() => {
  return hljs.highlight(skillStructureCode, { language: 'plaintext' }).value
})

// JSON 高亮
const highlightedMultiTurnJson = computed(() => {
  return hljs.highlight(multiTurnJson, { language: 'json' }).value
})

const highlightedToolRequestJson = computed(() => {
  return hljs.highlight(toolRequestJson, { language: 'json' }).value
})

const highlightedToolResultJson = computed(() => {
  return hljs.highlight(toolResultJson, { language: 'json' }).value
})

// Mermaid 流程图定义
const agentLoopDiagram = `
flowchart TD
    A[("👤 用户输入")] --> B["🧠 LLM Call"]
    B --> C{"stop_reason?"}
    C -->|tool_use| D["💻 执行工具<br/>bash / read / write / edit"]
    C -->|text_only| E["📤 返回结果"]
    D --> B
`

const toolDispatchDiagram = `
flowchart LR
    A["🧠 LLM"] --> B["⚙️ Dispatch"]
    B --> C["💻 bash"]
    B --> D["📄 read_file"]
    B --> E["✏️ write_file"]
    B --> F["🔧 edit_file"]
    C --> G["✅ result"]
    D --> G
    E --> G
    F --> G
`

const taskGraphDiagram = `
flowchart LR
    A["✅ #1<br/>Setup Project"] --> B["[>] #2<br/>Backend API"]
    A --> C["[ ] #3<br/>Frontend UI"]
    B --> D["[ ] #4<br/>Integration Tests"]
    C --> D

    style A fill:#d1fae5,stroke:#10b981
    style B fill:#dbeafe,stroke:#3b82f6
    style C fill:#fef3c7,stroke:#f59e0b
    style D fill:#fee2e2,stroke:#ef4444
`

const todoFlowDiagram = `
flowchart TD
    User["👤 User<br/>prompt"] --> LLM["🧠 LLM"]
    LLM --> Tools["🔧 Tools<br/>+ todo"]
    Tools --> ToolResult["📤 tool_result"]
    ToolResult --> Reminder{"rounds_since_todo<br/>≥ 3?"}
    Reminder -->|Yes| Inject["⚠️ Inject<br/>&lt;reminder&gt;"]
    Reminder -->|No| Manager["📋 TodoManager<br/>[ ] task A<br/>[>] task B ← doing<br/>[x] task C"]
    Inject --> Manager
    Manager --> LLM
`

const contextCompressionDiagram = `
flowchart TD
    A["📤 Tool Call Result"] --> B["L1: micro_compact<br/>silent, every turn"]
    B --> C{"tool_result<br/>&gt; 3 turns old?"}
    C -->|No| D["▶️ Continue"]
    C -->|Yes| E["🗜️ Replace with<br/>'[Previous: used {tool_name}]'"]
    E --> F{"tokens &gt; 50000?"}
    F -->|No| D
    F -->|Yes| G["L2: auto_compact<br/>Save to .transcripts/"]
    G --> H["🧠 LLM summarizes<br/>conversation"]
    H --> I["📦 Replace all messages<br/>with [summary]"]
    I --> D
    J["L3: compact tool"] -.->|"Model calls<br/>explicitly"| H
`

const worktreeIsolationDiagram = `
flowchart LR
    A["👤 User"] --> B["📁 main<br/>worktree"]
    B --> C["💜 task_1<br/>feature/login"]
    B --> D["💜 task_2<br/>feature/api"]
    B --> E["💜 task_3<br/>fix/bug"]

    subgraph Isolated["🔒 隔离"]
        C
        D
        E
    end

    style Isolated fill:#f3e8ff,stroke:#8b5cf6,stroke-dasharray: 5 5
`

// 代码示例 - 带注释的核心模块
const agentLoopCode = `# Agent Loop: 最小可运行 Agent
def agent_loop(user_input: str) -> str:
    messages = [{"role": "user", "content": user_input}]

    while True:  # ① 持续循环直到模型返回文本
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            messages=messages,
            tools=[{  # ② 定义可用工具
                "name": "bash",
                "description": "Run shell commands",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "command": {"type": "string"}
                    },
                    "required": ["command"]
                }
            }],
            max_tokens=8000
        )

        # ③ 检查停止原因
        if response.stop_reason != "tool_use":
            return response.content[0].text  # 返回最终结果

        # ④ 执行工具调用
        for block in response.content:
            if block.type == "tool_use":
                result = run_bash(block.input["command"])
                messages.append({
                    "role": "user",
                    "content": [{
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    }]
                })  # ⑤ 添加结果，继续循环`

const toolUseCode = `# s02: Tool Use - 工具定义与分发
# 核心洞察："循环没有改变，我只是添加了工具"

# 1. 工具定义：声明模型可以调用的能力
TOOLS = [
    {
        "name": "bash",
        "description": "Run a shell command.",
        "input_schema": {
            "type": "object",
            "properties": {"command": {"type": "string"}},
            "required": ["command"]
        }
    },
    {
        "name": "read_file",
        "description": "Read file contents.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "limit": {"type": "integer"}
            },
            "required": ["path"]
        }
    },
    {
        "name": "write_file",
        "description": "Write content to file.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "content": {"type": "string"}
            },
            "required": ["path", "content"]
        }
    },
    {
        "name": "edit_file",
        "description": "Replace exact text in file.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "old_text": {"type": "string"},
                "new_text": {"type": "string"}
            },
            "required": ["path", "old_text", "new_text"]
        }
    }
]

# 2. 工具实现函数
def run_bash(command: str) -> str:
    """执行 bash 命令"""
    r = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=120)
    out = (r.stdout + r.stderr).strip()
    return out[:50000] if out else "(no output)"

def run_read(path: str, limit: int = None) -> str:
    """读取文件内容"""
    text = safe_path(path).read_text()
    lines = text.splitlines()
    if limit and limit < len(lines):
        lines = lines[:limit] + [f"... ({len(lines) - limit} more lines)"]
    return "\\n".join(lines)[:50000]

def run_write(path: str, content: str) -> str:
    """写入文件"""
    fp = safe_path(path)
    fp.parent.mkdir(parents=True, exist_ok=True)
    fp.write_text(content)
    return f"Wrote {len(content)} bytes to {path}"

def run_edit(path: str, old_text: str, new_text: str) -> str:
    """编辑文件：替换文本"""
    fp = safe_path(path)
    content = fp.read_text()
    if old_text not in content:
        return f"Error: Text not found in {path}"
    fp.write_text(content.replace(old_text, new_text, 1))
    return f"Edited {path}"

# 3. 工具分发映射：{tool_name: handler}
TOOL_HANDLERS = {
    "bash":       lambda **kw: run_bash(kw["command"]),
    "read_file":  lambda **kw: run_read(kw["path"], kw.get("limit")),
    "write_file": lambda **kw: run_write(kw["path"], kw["content"]),
    "edit_file":  lambda **kw: run_edit(kw["path"], kw["old_text"], kw["new_text"]),
}

# 4. Agent Loop - 与 s01 完全相同
def agent_loop(messages: list):
    while True:
        response = client.messages.create(
            model=MODEL, system=SYSTEM, messages=messages,
            tools=TOOLS, max_tokens=8000,
        )
        messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "tool_use":
            return  # 模型完成，返回结果
        results = []
        for block in response.content:
            if block.type == "tool_use":
                handler = TOOL_HANDLERS.get(block.name)
                output = handler(**block.input) if handler else f"Unknown tool: {block.name}"
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": output
                })
        messages.append({"role": "user", "content": results})`

const skillStructureCode = `skills/
├── README.md               # Skills 使用说明
│
├── git/
│   └── SKILL.md            # Git 工作流技能
│       ---
│       name: git
│       description: Git workflow and best practices
│       ---
│       ## Step 1: Create Feature Branch
│       git checkout -b feature/description
│       ...
│
├── code-review/
│   └── SKILL.md            # 代码审查技能
│       ---
│       name: code-review
│       description: Security and quality checklist
│       ---
│       ## Security Review
│       - [ ] SQL injection
│       - [ ] XSS vulnerabilities
│       ...
│
├── mcp-builder/
│   └── SKILL.md            # MCP 构建技能
│       ---
│       name: mcp-builder
│       description: MCP server development guide
│       ---
│       ## Create MCP Server
│       1. Initialize project structure
│       2. Define tools and resources
│       ...
│
└── testing/
    └── SKILL.md            # 测试技能
        ---
        name: testing
        description: Unit and integration testing patterns
        ---
        ## Write Unit Tests
        1. Setup test fixtures
        2. Write test cases
        ...`

// Todo JSON 数据结构 - 参考 learn-claude-code/.tasks/task_N.json
const todoCompletedJson = `{
  "id": 1,
  "subject": "Setup project",
  "description": "Initialize the project with necessary configuration",
  "status": "completed",
  "blockedBy": [],
  "blocks": [],
  "owner": ""
}`

const todoInProgressJson = `{
  "id": 2,
  "subject": "Write code",
  "description": "Implement the core functionality of the project",
  "status": "in_progress",
  "blockedBy": [],
  "blocks": [],
  "owner": "alice"
}`

const todoPendingJson = `{
  "id": 3,
  "subject": "Write tests",
  "description": "Create and run tests to verify the implementation",
  "status": "pending",
  "blockedBy": [2],
  "blocks": [],
  "owner": ""
}`

// Task JSON 数据结构 - 真实场景示例：Web 应用开发任务
const task1Json = `{
  "id": 1,
  "subject": "Setup Project",
  "description": "Initialize project structure, install dependencies, configure build tools",
  "status": "completed",
  "blockedBy": [],
  "blocks": [2, 3],
  "owner": ""
}`

const task2Json = `{
  "id": 2,
  "subject": "Backend API",
  "description": "Implement REST API endpoints for user management and data operations",
  "status": "in_progress",
  "blockedBy": [1],
  "blocks": [4],
  "owner": "alice"
}`

const task3Json = `{
  "id": 3,
  "subject": "Frontend UI",
  "description": "Build user interface components and integrate with backend API",
  "status": "pending",
  "blockedBy": [1],
  "blocks": [4],
  "owner": "bob"
}`

const task4Json = `{
  "id": 4,
  "subject": "Integration Tests",
  "description": "Write and run integration tests to verify frontend-backend communication",
  "status": "pending",
  "blockedBy": [2, 3],
  "blocks": [],
  "owner": ""
}`

const multiTurnJson = `{
  "messages": [
    {
      "role": "user",
      "content": "Create a file called hello.py that prints 'Hello, World!'"
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "I'll create that file for you using bash."
        },
        {
          "type": "tool_use",
          "id": "toolu_01ABC123",
          "name": "bash",
          "input": {
            "command": "echo 'print(\\"Hello, World!\\")' > hello.py"
          }
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "tool_result",
          "tool_use_id": "toolu_01ABC123",
          "content": ""
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "Let me verify the file was created correctly."
        },
        {
          "type": "tool_use",
          "id": "toolu_01DEF456",
          "name": "bash",
          "input": { "command": "cat hello.py" }
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "tool_result",
          "tool_use_id": "toolu_01DEF456",
          "content": "print(\\"Hello, World!\\")"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "Done! I've created hello.py with the print statement. You can run it with python hello.py."
        }
      ]
    }
  ]
}`

const toolRequestJson = `{
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'll create that file for you using bash."
    },
    {
      "type": "tool_use",
      "id": "toolu_01ABC123DEF456",
      "name": "bash",
      "input": {
        "command": "echo 'print(\\"Hello, World!\\")' > hello.py"
      }
    }
  ]
}`

const toolResultJson = `{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01ABC123DEF456",
      "content": "",
      "is_error": false
    }
  ]
}`
</script>

<style scoped>
.claude-code-page {
  padding: 40px 24px 80px;
  max-width: 1400px;
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
  font-size: 18px;
  color: #6b7280;
}

/* 为什么选择 */
.why-claude-code {
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.why-claude-code h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
  text-align: center;
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.reason-card {
  text-align: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
}

.reason-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.reason-card h4 {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.reason-card p {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Architecture Overview */
.architecture-overview {
  margin-bottom: 40px;
}

.architecture-overview h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
  text-align: center;
}

/* Tab Content Area */
.tab-content-area {
  margin-top: 40px;
}

.tab-panel {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

/* Layer Tabs - 新的水平标签样式 */
.layer-tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.layer-tab {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
}

.layer-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: #d1d5db;
}

.layer-tab.active {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-color: #3b82f6;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}

.layer-tab.active .layer-tab-level {
  color: #3b82f6;
}

.layer-tab.active .layer-tab-name {
  color: #1e40af;
}

/* 不同层级的主题色 */
.layer-tab[data-level="Level 1"].active {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-color: #3b82f6;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}
.layer-tab[data-level="Level 1"].active .layer-tab-level,
.layer-tab[data-level="Level 1"].active .layer-tab-name {
  color: #3b82f6;
}

.layer-tab[data-level="Level 2"].active {
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border-color: #8b5cf6;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
}
.layer-tab[data-level="Level 2"].active .layer-tab-level,
.layer-tab[data-level="Level 2"].active .layer-tab-name {
  color: #8b5cf6;
}

.layer-tab[data-level="Level 3"].active {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border-color: #f59e0b;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.2);
}
.layer-tab[data-level="Level 3"].active .layer-tab-level,
.layer-tab[data-level="Level 3"].active .layer-tab-name {
  color: #f59e0b;
}

.layer-tab[data-level="Level 4"].active {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-color: #10b981;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
}
.layer-tab[data-level="Level 4"].active .layer-tab-level,
.layer-tab[data-level="Level 4"].active .layer-tab-name {
  color: #10b981;
}

.layer-tab[data-level="Level 5"].active {
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  border-color: #ec4899;
  box-shadow: 0 4px 16px rgba(236, 72, 153, 0.2);
}
.layer-tab[data-level="Level 5"].active .layer-tab-level,
.layer-tab[data-level="Level 5"].active .layer-tab-name {
  color: #ec4899;
}

.layer-tab-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.layer-tab-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.layer-tab-level {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layer-tab-name {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
}

.layer-tab-desc {
  font-size: 12px;
  color: #6b7280;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.section-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: white;
}

.section-badge.level-1 { background: #3b82f6; }
.section-badge.level-2 { background: #8b5cf6; }
.section-badge.level-3 { background: #f59e0b; }
.section-badge.level-4 { background: #10b981; }
.section-badge.level-5 { background: #ec4899; }

.section-header h3 {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.section-intro {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 800px;
}

/* Concept Cards */
.concept-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.concept-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.concept-card.full-width {
  grid-column: 1 / -1;
}

.concept-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.concept-icon {
  font-size: 32px;
}

.concept-header h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.concept-subtitle {
  font-size: 13px;
  color: #6b7280;
}

.concept-desc {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 20px;
}

/* Mermaid Diagrams */
:deep(.mermaid-chart) {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 24px auto;
  max-width: 800px;
}

:deep(.mermaid) {
  width: 100%;
  text-align: center;
}

:deep(.mermaid svg) {
  max-width: 100%;
  height: auto;
}

/* Todo States - 原来的状态展示样式 */
.todo-states {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  margin-top: 16px;
}

/* Todo Tool Definition */
.todo-tool-definition {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 12px;
  border: 2px solid #3b82f6;
}

.todo-tool-definition .subsection-title {
  margin-top: 0;
  margin-bottom: 12px;
  color: #1e40af;
}

.tool-info-box {
  background: white;
  padding: 16px;
  border-radius: 8px;
}

.tool-info-box p {
  font-size: 14px;
  color: #1e3a8a;
  line-height: 1.7;
  margin-bottom: 8px;
}

.tool-info-box p:last-child {
  margin-bottom: 0;
}

.tool-info-box strong {
  color: #1e40af;
}

.tool-info-box ul {
  margin: 8px 0 0 20px;
  padding: 0;
}

.tool-info-box li {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 4px;
}

/* Todo Reminder Section */
.todo-reminder-section {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  border: 2px solid #f59e0b;
}

.todo-reminder-section .subsection-title {
  margin-top: 0;
  margin-bottom: 12px;
  color: #92400e;
}

.reminder-box {
  background: white;
  padding: 16px;
  border-radius: 8px;
}

.reminder-desc {
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 12px;
}

.reminder-code {
  background: #0f172a;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.reminder-code code {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  color: #e2e8f0;
}

.reminder-note {
  font-size: 13px;
  color: #4b5563;
  margin: 0;
}

.reminder-note strong {
  color: #1f2937;
}

/* Todo Rendered Example */
.todo-rendered-example {
  margin-top: 24px;
}

.todo-rendered-example .subsection-title {
  margin-bottom: 12px;
  color: #1f2937;
}

.rendered-box {
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.rendered-content {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  line-height: 2;
  color: #1f2937;
  padding: 16px;
  margin: 0;
  white-space: pre-wrap;
}

.rendered-note {
  font-size: 13px;
  color: #6b7280;
  padding: 12px 16px;
  margin: 0;
  border-top: 1px solid #e5e7eb;
}

.rendered-note code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 12px;
  color: #1f2937;
}

/* Background Tasks Section */
.bg-how-it-works {
  margin-top: 24px;
}

.bg-how-it-works .subsection-title {
  margin-bottom: 24px;
  color: #1f2937;
}

.bg-step {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.bg-step:last-of-type {
  border-bottom: none;
}

.bg-step-number {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.bg-step-content {
  flex: 1;
  min-width: 0;
}

.bg-step-content p {
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 12px;
}

.bg-step-content strong {
  color: #1f2937;
}

.bg-step-content .code-block {
  margin-top: 0;
}

.bg-summary {
  margin-top: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  color: #4b5563;
}

/* Todo JSON Grid - 并排展示三个 task 文件 */
.todo-json-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.todo-json-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  min-width: 0;
}

.todo-json-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.todo-json-badge {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  font-family: monospace;
}

.todo-json-status {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.todo-json-status.completed {
  background: #d1fae5;
  color: #065f46;
}

.todo-json-status.in_progress {
  background: #dbeafe;
  color: #1e40af;
}

.todo-json-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.todo-json-item .code-block {
  margin: 0;
}

.todo-json-item .code-block pre {
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
}

.todo-json-item .code-block pre code {
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
}

/* Subagent Concept */
.subagent-concept {
  margin-top: 24px;
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.concept-box {
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
}

.concept-box.without-subagent {
  border-color: #fca5a5;
}

.concept-box.with-subagent {
  border-color: #86efac;
}

.concept-box-header {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.without-subagent .concept-box-header {
  background: #ef4444;
}

.with-subagent .concept-box-header {
  background: #22c55e;
}

.concept-box-content {
  background: white;
}

.concept-box-content pre {
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #1f2937;
  overflow-x: auto;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Subagent Key Points */
.subagent-key-points {
  margin-top: 32px;
}

.subagent-key-points .subsection-title {
  margin-bottom: 20px;
  color: #1f2937;
}

.key-points-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.key-point-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.key-point-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 12px;
}

.key-point-item strong {
  display: block;
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 8px;
}

.key-point-item p {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.key-point-item code {
  background: #e5e7eb;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: #1f2937;
}

/* Subagent Use Cases */
.subagent-use-cases {
  margin-top: 32px;
}

.subagent-use-cases .subsection-title {
  margin-bottom: 20px;
  color: #1f2937;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.use-case-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e5e7eb;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.use-case-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.use-case-item strong {
  display: block;
  font-size: 15px;
  color: #1f2937;
  margin-bottom: 12px;
}

.use-case-item ul {
  margin: 0;
  padding-left: 20px;
}

.use-case-item li {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 4px;
}

.use-case-item:first-child {
  border-color: #86efac;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.use-case-item:last-child {
  border-color: #fca5a5;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
}

/* Task JSON Grid - Task Graph 下方展示四个 task 文件 */
.task-json-section {
  margin-top: 32px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
}

.task-json-section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.task-json-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.task-json-item {
  background: white;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  min-width: 0;
}

.task-json-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.task-json-badge {
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  font-family: monospace;
}

.task-json-status {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
}

.task-json-status.completed {
  background: #d1fae5;
  color: #065f46;
}

.task-json-status.in_progress {
  background: #dbeafe;
  color: #1e40af;
}

.task-json-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.task-json-status.blocked {
  background: #fee2e2;
  color: #991b1b;
}

.task-json-item .code-block {
  margin: 0;
}

.task-json-item .code-block pre {
  max-height: 250px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 11px;
  padding: 8px;
}

.task-json-item .code-block pre code {
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 11px;
}

/* Context Compression Layers */
.compression-layers {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.compression-layer-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.compression-layer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.compression-layer-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: white;
}

.compression-layer-badge.layer-1 { background: #3b82f6; }
.compression-layer-badge.layer-2 { background: #10b981; }
.compression-layer-badge.layer-3 { background: #f59e0b; }

.compression-layer-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  font-family: monospace;
}

.compression-layer-trigger {
  font-size: 12px;
  color: #6b7280;
  background: white;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.compression-layer-content {
  padding-left: 4px;
}

.compression-layer-content p {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 8px;
}

.compression-layer-content p:last-child {
  margin-bottom: 0;
}

.compression-layer-content strong {
  color: #1f2937;
}

.compression-layer-content code {
  background: #e5e7eb;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  color: #1f2937;
}

.compression-layer-content ul {
  margin: 8px 0 0 20px;
  padding: 0;
}

.compression-layer-content li {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 4px;
}

/* Split Layout */
.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

.split-panel {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
}

.split-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.split-panel .code-block {
  margin-top: 0;
}

/* JSON Section */
.json-section {
  margin-top: 32px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
}

.json-section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.json-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.json-tab {
  padding: 8px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

.json-tab:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.json-tab.active {
  background: #1e293b;
  border-color: #1e293b;
  color: white;
}

.json-content .code-block {
  margin-top: 0;
}

/* Skill Definition */
.skill-definition {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 2px solid #0ea5e9;
}

.skill-definition .subsection-title {
  margin-top: 0;
  margin-bottom: 12px;
  color: #0369a1;
}

.definition-box p {
  font-size: 14px;
  color: #0c4a6e;
  line-height: 1.7;
  margin-bottom: 12px;
}

.definition-box p:last-child {
  margin-bottom: 0;
}

.definition-box strong {
  font-size: 15px;
  color: #075985;
}

.definition-desc {
  font-size: 14px !important;
  color: #0c4a6e !important;
}

/* Skill Optimization */
.skill-optimization {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  border: 2px solid #f59e0b;
}

.skill-optimization .subsection-title {
  margin-top: 0;
  margin-bottom: 16px;
  color: #92400e;
}

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.optimization-item {
  background: white;
  padding: 16px;
  border-radius: 8px;
}

.optimization-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.optimization-icon {
  font-size: 20px;
}

.optimization-header strong {
  font-size: 14px;
  color: #1f2937;
}

.optimization-item p {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

/* Code Block */
.code-block {
  margin-top: 20px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #1e293b;
  border-radius: 8px 8px 0 0;
}

.code-title {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.code-lang {
  font-size: 11px;
  color: #94a3b8;
  font-family: monospace;
}

.code-block pre {
  padding: 16px;
  border-radius: 0 0 8px 8px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
  background: #0f172a;
  color: #e2e8f0;
}

.code-block pre code {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  display: block;
  color: inherit;
}

/* highlight.js overrides */
.code-block :deep(.hljs) {
  background: transparent !important;
  padding: 0;
}

/* Skill Architecture */
.skill-architecture {
  margin: 20px 0;
}

.layer-box {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e2e8f0;
}

.layer-box.layer-1 {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-color: #3b82f6;
}

.layer-box.layer-2 {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-color: #22c55e;
}

.layer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.layer-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #1f2937;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.layer-cost {
  font-size: 12px;
  color: #6b7280;
}

.layer-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.layer-content {
  background: white;
  border-radius: 8px;
  padding: 12px;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #4b5563;
  white-space: pre-wrap;
  border: 1px solid #e5e7eb;
  margin: 0;
}

.layer-arrow {
  text-align: center;
  padding: 8px;
  font-size: 13px;
  color: #6b7280;
}

.layer-arrow code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

/* Skill Design Grid */
.skill-design {
  margin-top: 24px;
}

.subsection-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.design-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.design-item {
  text-align: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
}

.design-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.design-item strong {
  display: block;
  font-size: 13px;
  color: #1f2937;
  margin-bottom: 4px;
}

.design-item span {
  font-size: 12px;
  color: #6b7280;
}

/* Todo States */
.todo-states {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  margin-top: 16px;
}

.state-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  border-radius: 8px;
  min-width: 100px;
}

.state-item.pending { background: #fef3c7; }
.state-item.in_progress { background: #dbeafe; }
.state-item.completed { background: #d1fae5; }

.state-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.state-name {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
}

.state-arrow {
  font-size: 20px;
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 1200px) {
  .layer-tabs {
    gap: 8px;
  }

  .layer-tab {
    min-width: 180px;
    padding: 14px 16px;
  }

  .task-json-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .layer-tabs {
    flex-direction: column;
    align-items: stretch;
  }

  .layer-tab {
    min-width: auto;
  }
}

@media (max-width: 900px) {
  .split-layout {
    grid-template-columns: 1fr;
  }

  .reasons-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .concept-cards {
    grid-template-columns: 1fr;
  }

  .design-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .optimization-grid {
    grid-template-columns: 1fr;
  }

  .todo-json-grid {
    grid-template-columns: 1fr;
  }

  .task-json-grid {
    grid-template-columns: 1fr;
  }

  .tool-comparison {
    grid-template-columns: 1fr;
  }

  .concept-grid {
    grid-template-columns: 1fr;
  }

  .key-points-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .use-cases-grid {
    grid-template-columns: 1fr;
  }

  .bg-step {
    flex-direction: column;
    gap: 8px;
  }

  .bg-step-number {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
}

@media (max-width: 600px) {
  .page-title {
    font-size: 28px;
  }

  .reasons-grid,
  .layer-cards {
    grid-template-columns: 1fr;
  }

  .todo-states {
    flex-direction: column;
  }

  .state-arrow {
    transform: rotate(90deg);
  }

  .json-tabs {
    flex-direction: column;
  }

  .json-tab {
    text-align: center;
  }
}
</style>
