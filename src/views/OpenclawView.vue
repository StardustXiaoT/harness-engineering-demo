<template>
  <div class="openclaw-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">OpenClaw</h1>
      <p class="page-subtitle">AI Agent 网关 - 架构与场景实战</p>
    </div>

    <!-- 一级分类切换 -->
    <div class="category-tabs">
      <div
        class="category-tab"
        :class="{ active: activeCategory === 'architecture' }"
        @click="activeCategory = 'architecture'"
      >
        <span class="category-icon">🏗️</span>
        <span class="category-name">OpenClaw 架构</span>
      </div>
      <div
        class="category-tab"
        :class="{ active: activeCategory === 'scenarios' }"
        @click="activeCategory = 'scenarios'"
      >
        <span class="category-icon">🎯</span>
        <span class="category-name">场景实战</span>
      </div>
    </div>

    <!-- 架构层次 -->
    <div v-show="activeCategory === 'architecture'" class="architecture-overview">
      <div class="layer-tabs">
        <div
          v-for="layer in layers"
          :key="layer.id"
          class="layer-tab"
          :class="{ active: activeTab === layer.id }"
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

    <!-- 场景实战 -->
    <div v-show="activeCategory === 'scenarios'" class="scenarios-overview">
      <div class="scenario-tabs">
        <div
          v-for="(scenario, index) in scenarios"
          :key="scenario.id"
          class="scenario-tab"
          :class="{ active: activeScenario === scenario.id }"
          @click="activeScenario = scenario.id"
        >
          <span class="scenario-num">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="scenario-name">{{ scenario.name }}</span>
        </div>
      </div>
    </div>

    <!-- Tab 内容区域 -->
    <div class="tab-content-area">

      <!-- 架构内容（6层）-->
      <template v-if="activeCategory === 'architecture'">

      <!-- 1. Execution 执行层 -->
      <div v-show="activeTab === 'execution'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-1">Level 1</span>
          <h3>Execution 执行内核</h3>
        </div>
        <p class="section-intro">
          Agent 的最小形态：一个 while 循环 + stop_reason。messages[] 是唯一的状态，每次 API 调用时 LLM 都会看到完整数组。
        </p>

        <!-- 架构图 -->
        <div class="flow-diagram">
          <h4>架构流程</h4>
          <MermaidChart :diagram="agentLoopDiagram" />
        </div>

        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🔄</span>
            <div>
              <h4>Agent Loop</h4>
              <span class="concept-subtitle">核心循环模式</span>
            </div>
          </div>
          <p class="concept-desc">
            <code>while True</code> + <code>stop_reason</code> -- 这就是一个 Agent。所有 AI Agent 的核心模式。后续所有功能 -- 工具、会话、路由、投递 -- 都是在这个循环之上叠加的层，循环本身不会改变。
          </p>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">完整的 Agent 循环</span>
              <span class="code-lang">Python</span>
            </div>
            <pre><code v-html="highlightedAgentLoop"></code></pre>
          </div>

          <div class="stop-reason-table">
            <h4>stop_reason 含义</h4>
            <table>
              <thead>
                <tr>
                  <th>stop_reason</th>
                  <th>含义</th>
                  <th>动作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>"end_turn"</code></td>
                  <td>模型完成了回复</td>
                  <td>打印，继续循环</td>
                </tr>
                <tr>
                  <td><code>"tool_use"</code></td>
                  <td>模型想调用工具</td>
                  <td>执行，反馈结果</td>
                </tr>
                <tr>
                  <td><code>"max_tokens"</code></td>
                  <td>回复被 token 限制截断</td>
                  <td>打印部分文本</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="key-insight">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h4>关键要点</h4>
            <ul>
              <li><strong>messages[]</strong> 是唯一的状态，每次 API 调用都会传递完整数组</li>
              <li><strong>stop_reason</strong> 是每次响应后的唯一决策点</li>
              <li>循环结构永远不变，后续章节围绕它添加功能</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 2. Capability 能力层 -->
      <div v-show="activeTab === 'capability'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-2">Level 2</span>
          <h3>Capability 能力层</h3>
        </div>
        <p class="section-intro">
          工具 = 数据 (schema) + 处理函数映射表。模型选一个名字，你查表执行。添加新工具只需要在 TOOLS 中加一项 + 在 TOOL_HANDLERS 中加一项，循环本身不需要改动。
        </p>

        <div class="flow-diagram">
          <h4>工具调用流程</h4>
          <MermaidChart :diagram="toolUseDiagram" />
        </div>

        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🔧</span>
            <div>
              <h4>TOOLS + TOOL_HANDLERS</h4>
              <span class="concept-subtitle">Schema 定义与分发表</span>
            </div>
          </div>
          <p class="concept-desc">
            两个平行的数据结构。TOOLS 告诉模型有什么工具，TOOL_HANDLERS 告诉代码如何执行。
          </p>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">Schema + 分发表</span>
              <span class="code-lang">Python</span>
            </div>
            <pre><code v-html="highlightedToolUse"></code></pre>
          </div>
        </div>

        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">✋</span>
            <div>
              <h4>Hands - 执行能力</h4>
              <span class="concept-subtitle">Agent 的"手"</span>
            </div>
          </div>
          <p class="concept-desc">
            让 Agent 具备操作真实世界的能力：
          </p>
          <div class="tools-grid">
            <div class="tool-item">
              <span class="tool-icon">💻</span>
              <span class="tool-name">bash</span>
              <span class="tool-desc">执行 Shell 命令</span>
            </div>
            <div class="tool-item">
              <span class="tool-icon">📖</span>
              <span class="tool-name">read_file</span>
              <span class="tool-desc">读取文件内容</span>
            </div>
            <div class="tool-item">
              <span class="tool-icon">✍️</span>
              <span class="tool-name">write_file</span>
              <span class="tool-desc">写入文件</span>
            </div>
            <div class="tool-item">
              <span class="tool-icon">✏️</span>
              <span class="tool-name">edit_file</span>
              <span class="tool-desc">编辑文件</span>
            </div>
            <div class="tool-item">
              <span class="tool-icon">🌐</span>
              <span class="tool-name">browser</span>
              <span class="tool-desc">浏览器自动化</span>
            </div>
            <div class="tool-item">
              <span class="tool-icon">🗄️</span>
              <span class="tool-name">database</span>
              <span class="tool-desc">数据库操作</span>
            </div>
          </div>
        </div>

        <!-- Skills 市场 -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🛒</span>
            <div>
              <h4>Skills 市场</h4>
              <span class="concept-subtitle">ClawHub 生态</span>
            </div>
          </div>
          <p class="concept-desc">
            如果 OpenClaw 是手机，Skills 就是 App，ClawHub 就是应用商店 —— 一行命令装一个新能力。
          </p>

          <div class="skills-stats">
            <div class="stat-item">
              <span class="stat-number">16,000+</span>
              <span class="stat-label">已注册 Skills</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">9</span>
              <span class="stat-label">分类目录</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">VirusTotal</span>
              <span class="stat-label">安全扫描</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">semantic-search</span>
              <span class="stat-label">语义搜索</span>
            </div>
          </div>

          <div class="skills-grid">
            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">🔍</span>
                <span class="category-name">搜索与浏览</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">tavily-search</span>
                  <span class="skill-desc">联网实时搜索，获取最新信息</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">web-automation</span>
                  <span class="skill-desc">浏览器自动化，抓取网页/填表</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">find-search</span>
                  <span class="skill-desc">增强文件搜索，精准定位</span>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">📄</span>
                <span class="category-name">文档与文件</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">summarize</span>
                  <span class="skill-desc">总结 URL/PDF/音频/视频</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">doc-creator</span>
                  <span class="skill-desc">创建 Word/PDF 文档</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">markdown-to-pdf</span>
                  <span class="skill-desc">Markdown 转精美 PDF</span>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">🔒</span>
                <span class="category-name">安全与系统</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">skill-vetter</span>
                  <span class="skill-desc">安装前自动安全审查</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">system-integrity</span>
                  <span class="skill-desc">文件加密备份/完整性校验</span>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">📧</span>
                <span class="category-name">通讯与协作</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">imap-smtp-email</span>
                  <span class="skill-desc">邮件收发/分类/自动回复</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">slack</span>
                  <span class="skill-desc">Slack 消息/频道管理</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">google-workspace</span>
                  <span class="skill-desc">Gmail/Drive/Docs/Sheets 全套</span>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">📊</span>
                <span class="category-name">数据与分析</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">data-analyst</span>
                  <span class="skill-desc">Excel/CSV 数据分析与可视化</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">calculator</span>
                  <span class="skill-desc">精确数学计算</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">confluence</span>
                  <span class="skill-desc">知识库文档搜索管理</span>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">⚡</span>
                <span class="category-name">效率增强</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">self-improving</span>
                  <span class="skill-desc">AI 自我学习改进</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">memory-manager</span>
                  <span class="skill-desc">长期记忆管理优化</span>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">🎨</span>
                <span class="category-name">内容创作</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">image-generator</span>
                  <span class="skill-desc">AI 图片/图表生成</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">text-to-speech</span>
                  <span class="skill-desc">文字转语音播报</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">video-summary</span>
                  <span class="skill-desc">YouTube/B站 视频摘要</span>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">🛠️</span>
                <span class="category-name">开发工具</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">git</span>
                  <span class="skill-desc">Git 版本控制操作</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">code-reviewer</span>
                  <span class="skill-desc">代码审查与优化建议</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">docker</span>
                  <span class="skill-desc">容器管理与部署</span>
                </div>
              </div>
            </div>

            <div class="skill-category">
              <div class="category-header">
                <span class="category-icon">🔌</span>
                <span class="category-name">MCP 服务</span>
              </div>
              <div class="skill-list">
                <div class="skill-item">
                  <span class="skill-name">mcd-order</span>
                  <span class="skill-desc">麦当劳点餐/优惠查询</span>
                </div>
                <div class="skill-item">
                  <span class="skill-name">weather-mcp</span>
                  <span class="skill-desc">天气查询与预报</span>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-usage">
            <div class="usage-title">📖 如何使用</div>
            <div class="usage-items">
              <div class="usage-item">
                <span class="usage-label">安装</span>
                <code>clawhub install @author/skill-name</code>
              </div>
              <div class="usage-item">
                <span class="usage-label">搜索</span>
                <code>clawhub search "关键词"</code>
              </div>
              <div class="usage-item">
                <span class="usage-label">发布</span>
                <span>编写 SKILL.md 封装专属技能发布到 ClawHub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Context 上下文层 -->
      <div v-show="activeTab === 'context'" class="tab-panel">
        <div name="section-header">
          <span class="section-badge level-3">Level 3</span>
          <h3>Context 上下文层</h3>
        </div>
        <p class="section-intro">
          会话持久化 + 记忆检索。JSONL replay + 跨 session 持久化 + 用户级隔离。这是比 Claude Code 更强的持久系统，不是简单的 prompt 注入。
        </p>

        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">💾</span>
            <div>
              <h4>Sessions - 会话持久化</h4>
              <span class="concept-subtitle">JSONL 存储</span>
            </div>
          </div>
          <p class="concept-desc">
            JSONL: 写入追加, 读取重放。溢出时总结旧消息。真正的持久系统，而非 prompt 注入。
          </p>

          <div class="sessions-flow">
            <div class="flow-step">
              <span class="step-icon">✍️</span>
              <span class="step-title">写入追加</span>
              <span class="step-desc">Append only，适合高并发</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <span class="step-icon">📖</span>
              <span class="step-title">读取重放</span>
              <span class="step-desc">Replay 完整会话</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <span class="step-icon">📦</span>
              <span class="step-title">溢出压缩</span>
              <span class="step-desc">总结旧消息</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <span class="step-icon">🔒</span>
              <span class="step-title">用户隔离</span>
              <span class="step-desc">会话级隔离</span>
            </div>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">Session 存储格式</span>
              <span class="code-lang">JSONL</span>
            </div>
            <pre><code v-html="highlightedSession"></code></pre>
          </div>
        </div>

        <div class="key-insight">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h4>为什么比 Claude Code 更强？</h4>
            <ul>
              <li><strong>真正的持久化</strong>：文件级存储，而非内存</li>
              <li><strong>跨 session</strong>：重启后可以恢复</li>
              <li><strong>用户隔离</strong>：安全的多租户支持</li>
              <li><strong>溢出处理</strong>：自动压缩，而非强制截断</li>
            </ul>
          </div>
        </div>

        <!-- Agent 体系 -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🤖</span>
            <div>
              <h4>主 Agent、子 Agent 与 Session</h4>
              <span class="concept-subtitle">智能体体系</span>
            </div>
          </div>
          <p class="concept-desc">
            理解 OpenClaw 最核心的三个概念：谁在干活、怎么分身、对话怎么隔离。
          </p>

          <div class="agent-architecture">
            <div class="agent-section">
              <div class="section-title">主 Agent（Main Agent）</div>
              <ul class="concept-list">
                <li><strong>默认 Main Agent</strong>：系统自带一个默认 Agent，开箱即用</li>
                <li><strong>自定义 Main Agent</strong>：可创建多个 Main Agent，每个拥有独立的 workspace、SOUL.md、Memory、Session，互不干扰</li>
                <li><strong>Skills 配置</strong>：可配置为独立专属或全局共享</li>
              </ul>
            </div>

            <div class="agent-section">
              <div class="section-title">子 Agent（Sub-Agent）</div>
              <ul class="concept-list">
                <li>由 Main Agent 临时创建，继承 Main Agent 全部配置</li>
                <li>通常用于并行跑任务，子 Agent 还可以继续嵌套创建孙 Agent</li>
                <li><strong>创建方式</strong>：自然语言 "创建 3 个 subagent 帮我分别总结这 3 篇文档" 或命令行 /spawn</li>
              </ul>
            </div>

            <div class="agent-section">
              <div class="section-title">会话 / Session</div>
              <ul class="concept-list">
                <li><strong>1 个 Agent + 1 个对话通道 = 1 个 Session</strong></li>
                <li>WebUI + main agent = session_1</li>
                <li>钉钉用户 A 私聊 + main agent = session_2</li>
                <li>钉钉用户 B 私聊 + main agent = session_3</li>
                <li>钉钉群聊 + main agent = session_4</li>
                <li>飞书私聊 + main agent = session_5</li>
                <li>每个 Session 的上下文完全独立，互不干扰</li>
                <li>同一个 Agent 可以同时服务多个渠道、多个用户</li>
              </ul>
            </div>

            <div class="agent-section">
              <div class="section-title">Agent 间通信：agent2Agent</div>
              <ul class="concept-list">
                <li>不同 Main Agent 之间可以通过 agent2Agent 方式通信</li>
                <li>由 Gateway 做消息转发</li>
                <li>例如：「搜索 Agent」找到信息后自动转交给「写作 Agent」完成文章撰写</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Intelligence 认知层 -->
      <div v-show="activeTab === 'intelligence'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-4">Level 4</span>
          <h3>Intelligence 认知层</h3>
        </div>
        <p class="section-intro">
          动态组装的工作区引导文件，为 Agent 构建完整的上下文环境。
        </p>

        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🧠</span>
            <div>
              <h4>工作区引导文件</h4>
              <span class="concept-subtitle">Workspace Bootstrap Files</span>
            </div>
          </div>
          <p class="concept-desc">
            每个 Main Agent 都有自己独立的 workspace，这些文件共同构成了 Agent 的「灵魂」。初始设定、记忆、会话完全隔离。
          </p>

          <!-- 文件目录与描述并排展示 -->
          <div class="workspace-bootstrap">
            <div class="bootstrap-tree">
              <h5>文件目录</h5>
              <div class="tree-diagram">
                <div class="tree-line">workspace/</div>
                <div class="tree-line">&nbsp;&nbsp;├─ <span class="file-name">SOUL.md</span></div>
                <div class="tree-line">&nbsp;&nbsp;├─ <span class="file-name">USER.md</span></div>
                <div class="tree-line">&nbsp;&nbsp;├─ <span class="file-name">IDENTITY.md</span></div>
                <div class="tree-line">&nbsp;&nbsp;├─ <span class="file-name">AGENTS.md</span></div>
                <div class="tree-line">&nbsp;&nbsp;├─ <span class="file-name">TOOLS.md</span></div>
                <div class="tree-line">&nbsp;&nbsp;├─ <span class="file-name">SAFETY.md</span></div>
                <div class="tree-line">&nbsp;&nbsp;├─ <span class="file-name">MEMORY.md</span></div>
                <div class="tree-line">&nbsp;&nbsp;├─ <span class="file-name">HEARTBEAT.md</span></div>
                <div class="tree-line">&nbsp;&nbsp;└─ <span class="folder-name">memory/</span></div>
                <div class="tree-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ <span class="file-name">*.md</span></div>
              </div>
            </div>

            <div class="bootstrap-descriptions">
              <h5>文件说明</h5>
              <div class="desc-list">
                <div class="desc-item">
                  <span class="file-name">SOUL.md</span>
                  <span class="file-tag manual">几乎不自动更新</span>
                  <p>Agent 的核心人格定义，决定说话风格和行为模式。温柔体贴还是干脆利落？你来定义。人格一旦设定就保持稳定。</p>
                </div>
                <div class="desc-item">
                  <span class="file-name">USER.md</span>
                  <span class="file-tag auto">自动更新</span>
                  <p>用户画像：你的身份、职业、偏好、常用工具。AI 越了解你，输出越符合你的需求。从对话中学习你的偏好。</p>
                </div>
                <div class="desc-item">
                  <span class="file-name">IDENTITY.md</span>
                  <span class="file-tag auto">自动更新</span>
                  <p>Agent 身份信息，与 SAFETY.md、TOOLS.md 共同定义 Agent 的能力边界。</p>
                </div>
                <div class="desc-item">
                  <span class="file-name">AGENTS.md</span>
                  <span class="file-tag auto">自动更新</span>
                  <p>工作区规则和行为约束：什么能做、什么绝不能做、操作前是否需要确认。根据工作场景持续优化。</p>
                </div>
                <div class="desc-item">
                  <span class="file-name">TOOLS.md</span>
                  <span class="file-tag auto">自动更新</span>
                  <p>可用工具列表，与 SAFETY.md、IDENTITY.md 共同定义 Agent 的能力边界。</p>
                </div>
                <div class="desc-item">
                  <span class="file-name">SAFETY.md</span>
                  <span class="file-tag auto">自动更新</span>
                  <p>安全红线，与 TOOLS.md、IDENTITY.md 共同定义 Agent 的能力边界。</p>
                </div>
                <div class="desc-item">
                  <span class="file-name">MEMORY.md</span>
                  <span class="file-tag auto">自动更新</span>
                  <p>长期记忆存储：从对话中自动提炼关键信息（偏好、决策、重要事项）并持久化保存。每 50 轮对话或用户明确要求时更新。</p>
                </div>
                <div class="desc-item">
                  <span class="file-name">HEARTBEAT.md</span>
                  <span class="file-tag auto">自动更新</span>
                  <p>心跳定时任务配置：定时触发的自动化工作，如晨间简报、邮件巡检、定时推送。按任务执行情况调整。</p>
                </div>
              </div>
            </div>
          </div>

          <div class="core-concept">
            <h5>提示词组装机制 (Prompt Assembly Mechanism)</h5>
            <p>系统提示词 = 磁盘上的文件。换文件，换人格，不改代码。8 个文件按顺序拼接为完整的 system prompt：</p>
            <div class="assembly-flow">
              <span class="flow-item">SOUL</span>
              <span class="flow-arrow">→</span>
              <span class="flow-item">USER</span>
              <span class="flow-arrow">→</span>
              <span class="flow-item">IDENTITY</span>
              <span class="flow-arrow">→</span>
              <span class="flow-item">AGENTS</span>
              <span class="flow-arrow">→</span>
              <span class="flow-item">TOOLS</span>
              <span class="flow-arrow">→</span>
              <span class="flow-item">SAFETY</span>
              <span class="flow-arrow">→</span>
              <span class="flow-item">MEMORY</span>
              <span class="flow-arrow">→</span>
              <span class="flow-item">HEARTBEAT</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Autonomy 自主层 -->
      <div v-show="activeTab === 'autonomy'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-5">Level 5</span>
          <h3>Autonomy 自主层</h3>
        </div>
        <p class="section-intro">
          让 Agent 从"被调用"变成"主动运行"。定时触发任务，实现真正的自主行为。
        </p>

        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">💓</span>
            <div>
              <h4>Heartbeat 心跳机制</h4>
              <span class="concept-subtitle">主动型 Agent</span>
            </div>
          </div>
          <p class="concept-desc">
            一个定时检查线程，定期询问"该不该跑？"。如果满足触发条件，就主动执行任务。
            心跳任务和用户消息走同一消息管线，共享完整的上下文环境。
          </p>
          <ul class="concept-list">
            <li><strong>定时触发</strong>：按设定的时间间隔定期检查，如每分钟、每小时</li>
            <li><strong>条件判断</strong>：根据配置的条件决定是否执行，如特定时间点、有新数据</li>
            <li><strong>完整上下文</strong>：心跳任务可以使用 soul.md、memory.md 等完整的工作区文件</li>
            <li><strong>结果通知</strong>：任务执行完成后通过飞书、邮件等渠道推送结果</li>
          </ul>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">HEARTBEAT.md 示例</span>
            </div>
            <pre><code># HEARTBEAT.md

## 每次心跳检查
- 检查邮件，有重要未读时通知我
- 检查明日日历，有会议提前提醒

## 偶尔做（不需要每次）
- 整理 memory 文件
- 检查 git 仓库状态</code></pre>
          </div>
        </div>

        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">⏰</span>
            <div>
              <h4>Cron 定时任务</h4>
              <span class="concept-subtitle">灵活的时间配置</span>
            </div>
          </div>
          <p class="concept-desc">
            支持 cron 表达式配置定时任务，可以实现复杂的调度策略：
          </p>
          <ul class="concept-list">
            <li><strong>每日定时</strong>：每天早上 8:00 发送行业简报</li>
            <li><strong>周期任务</strong>：每隔 30 分钟检查一次邮件</li>
            <li><strong>工作日执行</strong>：仅在周一到周五执行任务</li>
            <li><strong>一次性任务</strong>：在指定时间执行一次，如会议开始前提醒</li>
          </ul>
        </div>
      </div>

      <!-- 6. Infrastructure 基础设施层 -->
      <div v-show="activeTab === 'infrastructure'" class="tab-panel">
        <div class="section-header">
          <span class="section-badge level-6">Level 6</span>
          <h3>Infrastructure 基础设施层</h3>
        </div>
        <p class="section-intro">
          让 Agent 能在真实世界稳定运行。这一层是 Claude Code 完全没有的，也是 OpenClaw 最大的新增部分。
        </p>

        <!-- Channels -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🌐</span>
            <div>
              <h4>Channels 通道</h4>
              <span class="concept-subtitle">统一的消息格式</span>
            </div>
          </div>
          <p class="concept-desc">
            每个平台不同，但它们都产生相同的 InboundMessage。Channel ABC 定义了 receive() + send() 契约。
          </p>

          <div class="inbound-message">
            <h4>InboundMessage 统一格式</h4>
            <div class="code-block">
              <div class="code-header">
                <span class="code-title">InboundMessage 数据结构</span>
                <span class="code-lang">Python</span>
              </div>
              <pre><code v-html="highlightedInboundMessage"></code></pre>
            </div>
          </div>

          <div class="channels-supported">
            <div class="channel-item">
              <span class="channel-icon">💬</span>
              <div>
                <h5>飞书</h5>
                <p>Webhook 接入，token 认证，@提及检测，多类型消息解析</p>
              </div>
            </div>
            <div class="channel-item">
              <span class="channel-icon">💼</span>
              <div>
                <h5>钉钉</h5>
                <p>企业微信机器人 API，消息卡片，支持群聊和私聊</p>
              </div>
            </div>
            <div class="channel-item">
              <span class="channel-icon">🐧</span>
              <div>
                <h5>QQ</h5>
                <p>OneBot 协议支持，CQ 码解析，群消息处理，私聊回复</p>
              </div>
            </div>
            <div class="channel-item">
              <span class="channel-icon">💙</span>
              <div>
                <h5>微信</h5>
                <p>企业微信 API 支持，接收消息，推送消息到用户或群聊</p>
              </div>
            </div>
            <div class="channel-item">
              <span class="channel-icon">📱</span>
              <div>
                <h5>Telegram</h5>
                <p>长轮询 getUpdates (30s)，offset 持久化，媒体组缓冲，文本合并</p>
              </div>
            </div>
            <div class="channel-item">
              <span class="channel-icon">🖥️</span>
              <div>
                <h5>CLI</h5>
                <p>标准输入输出，最简单的通道实现</p>
              </div>
            </div>
            <div class="channel-item">
              <span class="channel-icon">🔌</span>
              <div>
                <h5>WebSocket</h5>
                <p>JSON-RPC 2.0 协议，支持实时双向通信</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Gateway & Routing -->

        <!-- Delivery -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">📤</span>
            <div>
              <h4>Delivery 消息投递</h4>
              <span class="concept-subtitle">先写磁盘，再尝试投递</span>
            </div>
          </div>
          <p class="concept-desc">
            磁盘持久化的预写队列。入队时先写磁盘，再尝试投递。如果进程在入队和投递之间崩溃，消息仍然保存在磁盘上。
          </p>

          <div class="flow-diagram">
            <h4>投递流程</h4>
            <MermaidChart :diagram="deliveryDiagram" />
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">原子写入实现</span>
              <span class="code-lang">Python</span>
            </div>
            <pre><code v-html="highlightedDelivery"></code></pre>
          </div>

          <div class="backoff-table">
            <h4>退避策略 [5s, 25s, 2min, 10min] ±20% jitter</h4>
            <table>
              <thead>
                <tr>
                  <th>重试次数</th>
                  <th>基础延迟</th>
                  <th>范围</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>5s</td><td>4-6s</td></tr>
                <tr><td>2</td><td>25s</td><td>20-30s</td></tr>
                <tr><td>3</td><td>2min</td><td>96-144s</td></tr>
                <tr><td>4</td><td>10min</td><td>8-12min</td></tr>
                <tr><td>5+</td><td>failed/</td><td>移至失败目录</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Resilience -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🛡️</span>
            <div>
              <h4>Resilience 弹性</h4>
              <span class="concept-subtitle">三层重试洋葱</span>
            </div>
          </div>
          <p class="concept-desc">
            一次调用失败，轮换重试。FailoverReason 枚举将异常分类为六个类别，决定由哪一层处理。
          </p>

          <div class="flow-diagram">
            <h4>三层重试洋葱</h4>
            <MermaidChart :diagram="resilienceDiagram" />
          </div>

          <div class="failover-table">
            <h4>失败分类器</h4>
            <table>
              <thead>
                <tr>
                  <th>FailoverReason</th>
                  <th>检测关键词</th>
                  <th>冷却时间</th>
                  <th>处理方式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>auth</code></td>
                  <td>401, key, auth</td>
                  <td>300s</td>
                  <td>切换下一个 profile</td>
                </tr>
                <tr>
                  <td><code>rate_limit</code></td>
                  <td>429, rate</td>
                  <td>120s</td>
                  <td>等待后重试</td>
                </tr>
                <tr>
                  <td><code>timeout</code></td>
                  <td>timeout, timed out</td>
                  <td>60s</td>
                  <td>切换 profile</td>
                </tr>
                <tr>
                  <td><code>billing</code></td>
                  <td>402, quota, billing</td>
                  <td>300s</td>
                  <td>切换 profile</td>
                </tr>
                <tr>
                  <td><code>overflow</code></td>
                  <td>context, token, overflow</td>
                  <td>无</td>
                  <td>压缩后重试</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">ProfileManager 认证轮换</span>
              <span class="code-lang">Python</span>
            </div>
            <pre><code v-html="highlightedProfileManager"></code></pre>
          </div>
        </div>

        <!-- Concurrency -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🏎️</span>
            <div>
              <h4>Concurrency 并发</h4>
              <span class="concept-subtitle">命名车道 + FIFO 队列</span>
            </div>
          </div>
          <p class="concept-desc">
            命名 lane 序列化混沌。每个 lane 是一个独立的 FIFO 队列，由 threading.Condition 保护。
          </p>

          <div class="flow-diagram">
            <h4>并发架构</h4>
            <MermaidChart :diagram="concurrencyDiagram" />
          </div>

          <div class="lanes-detail">
            <h4>标准 Lane</h4>
            <div class="lane-cards">
              <div class="lane-card">
                <span class="lane-name">main</span>
                <span class="lane-max">max=1</span>
                <p>用户输入专用，阻塞等待结果</p>
              </div>
              <div class="lane-card">
                <span class="lane-name">cron</span>
                <span class="lane-max">max=1</span>
                <p>定时任务车道</p>
              </div>
              <div class="lane-card">
                <span class="lane-name">heartbeat</span>
                <span class="lane-max">max=1</span>
                <p>心跳任务车道</p>
              </div>
            </div>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">LaneQueue 核心原语</span>
              <span class="code-lang">Python</span>
            </div>
            <pre><code v-html="highlightedLaneQueue"></code></pre>
          </div>

          <div class="key-point">
            <div class="key-icon">🔄</div>
            <div class="key-content">
              <h4>Generation 追踪</h4>
              <p>
                每个 lane 有一个整数 generation 计数器。reset_all() 时所有 generation 递增。
                当过期任务完成时（其 generation 与当前不匹配），不调用 _pump()。
                这防止了僵尸任务在重启后排空队列。
              </p>
            </div>
          </div>
        </div>

      </div>
      </template>

      <!-- 场景实战内容 -->
      <template v-if="activeCategory === 'scenarios'">
        <!-- 场景 01 -->
        <div v-show="activeScenario === 'scenario01'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 01</span>
              <h3>个人情感陪伴 / 生活助手</h3>
            </div>
            <p class="scenario-intro">通过 soul.md 打造温暖的 AI 伙伴，日常聊天、倾诉心事、情绪疏导</p>

            <div class="scenario-section">
              <div class="feature-grid">
                <div class="feature-item">
                  <span class="feature-icon">💕</span>
                  <h5>温暖人设定义</h5>
                  <p>通过 soul.md 设定温柔细腻的性格，像朋友间的自然聊天，不是冰冷的机器回复</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🧠</span>
                  <h5>记忆让它懂你</h5>
                  <p>记住你的心情变化、重要日期、最近的烦恼和喜好，越聊越像老朋友</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🌿</span>
                  <h5>生活助手延伸</h5>
                  <p>提醒事项、天气播报、行程安排、纪念日提醒、读书推荐</p>
                </div>
              </div>
            </div>

            <div class="highlight-box">
              <div class="highlight-icon">📍</div>
              <div class="highlight-content">
                <h4>典型使用方式</h4>
                <p>每天睡前聊几句，分享今天的开心或烦恼。AI 会记住你说过的话，下次主动问你"上次提到的面试结果怎么样了？"</p>
              </div>
            </div>

            <div class="scenario-section">
              <h4>💻 Prompt 示例</h4>
              <div class="prompt-box">
                <pre>你是我的私人生活伙伴"小暖"，性格温柔细腻，擅长倾听和共情。当我分享开心的事时一起庆祝，当我情绪低落时给予理解和温暖的鼓励（不要说教）。记住我提到的重要日期和偏好，偶尔主动关心我的近况。说话自然随意，像朋友间的聊天，不要太正式。每天早上发一条简短的问候，包含今天的天气和一句暖心的话。</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 场景 02 -->
        <div v-show="activeScenario === 'scenario02'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 02</span>
              <h3>资讯自动采集与定时推送</h3>
            </div>
            <p class="scenario-intro">配置搜索 Skill + 定时任务，24 小时无人值守的私人信息官</p>

            <div class="scenario-section">
              <div class="feature-grid">
                <div class="feature-item">
                  <span class="feature-icon">⏰</span>
                  <h5>定时自动触发</h5>
                  <p>每天早上 8:00 自动搜集过去 24 小时的行业新闻、论文和技术文章</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🔍</span>
                  <h5>智能筛选摘要</h5>
                  <p>筛选最有价值的 5-8 条，每条一句话概述核心信息并附原文链接</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📱</span>
                  <h5>多渠道推送</h5>
                  <p>整理后通过飞书消息推送到你指定的群组或私聊，打开手机就看到今日全貌</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">⚡</span>
                  <h5>异常实时告警</h5>
                  <p>关键词出现高频波动或重大事件时，不等定时任务，立刻主动通知你</p>
                </div>
              </div>
            </div>

            <div class="highlight-box">
              <div class="highlight-icon">📍</div>
              <div class="highlight-content">
                <h4>实际效果</h4>
                <p>打开飞书前已知今日行业全貌，再也不怕错过重要信息。每周还能自动生成一份行业周报。</p>
              </div>
            </div>

            <div class="scenario-section">
              <h4>💻 Prompt 示例</h4>
              <div class="prompt-box">
                <pre>请你作为我的私人信息官，每天早上 8:00 自动完成以下工作：1）搜索过去 24 小时内"AI Agent""大模型应用""OpenClaw"相关的重要新闻和文章；2）筛选出最有价值的 5-8 条；3）每条用一句话概述核心信息 + 附原文链接；4）整体给出一段 50 字以内的"今日看点"总结；5）通过飞书消息推送给我。格式简洁，优先中文来源。如果发现重大突发事件（如大厂发布新模型、重要政策变化），不等定时任务，立刻通知我。</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 场景 03 -->
        <div v-show="activeScenario === 'scenario03'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 03</span>
              <h3>日报 / 周报编辑助手</h3>
            </div>
            <p class="scenario-intro">把工作要点口语化发给 AI，自动润色、结构化、套模板生成日报</p>

            <div class="scenario-section">
              <div class="feature-grid">
                <div class="feature-item">
                  <span class="feature-icon">⏱️</span>
                  <h5>30分钟 → 2分钟</h5>
                  <p>Before：花 30 分钟绞尽脑汁写日报。After：2 分钟语音输入 → AI 5 秒生成 → 1 分钟确认修改</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🗣️</span>
                  <h5>口语化输入</h5>
                  <p>把今天做的事情用语音或口语告诉 AI，不用刻意组织语言，AI 会帮你整理</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📝</span>
                  <h5>结构化输出</h5>
                  <p>自动按"今日完成 / 进行中 / 明日计划"三个板块整理，Markdown 格式</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🔄</span>
                  <h5>历史参考</h5>
                  <p>如果我说"跟昨天差不多"，AI 会参考昨天日报内容做微调，而非简单复制</p>
                </div>
              </div>
            </div>

            <div class="highlight-box">
              <div class="highlight-icon">📍</div>
              <div class="highlight-content">
                <h4>典型使用方式</h4>
                <p>每天下班前 2 分钟，口语化告诉 AI："今天见了客户改了方案，明天继续跟进。哦对了那个 bug 还没修。"AI 自动整理成专业日报。</p>
              </div>
            </div>

            <div class="scenario-section">
              <h4>💻 Prompt 示例</h4>
              <div class="prompt-box">
                <pre>你是我的日报编辑助理。我会把今天做的事情用口语化的方式告诉你，请你帮我：1）按"今日完成 / 进行中 / 明日计划"三个板块整理；2）用简洁专业的语言润色，每条不超过两句话；3）套用 Markdown 格式输出；4）如果我提到的内容有逻辑不通或遗漏，主动提醒我补充。记住我的部门是市场部，汇报对象是部门总监。如果我说"跟昨天差不多"，请参考我昨天的日报内容做微调。</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 场景 04 -->
        <div v-show="activeScenario === 'scenario04'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 04</span>
              <h3>打通邮件系统</h3>
            </div>
            <p class="scenario-intro">安装 imap-smtp-email Skill，让 OpenClaw 成为你的智能邮件管家</p>

            <div class="scenario-section">
              <div class="feature-grid">
                <div class="feature-item">
                  <span class="feature-icon">📂</span>
                  <h5>自动分类</h5>
                  <p>按"紧急需回复 / 重要可稍后 / 通知类可忽略"三级自动分类，优先级排序</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📋</span>
                  <h5>智能摘要</h5>
                  <p>对每封重要邮件生成一句话摘要，提取发件人、关键信息和期望行动</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✍️</span>
                  <h5>草稿起草</h5>
                  <p>为紧急邮件起草回复草稿供你确认，确认后安全发送，绝不自动发送</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">⏰</span>
                  <h5>定时巡检</h5>
                  <p>每天 9:00 / 14:00 / 18:00 三次巡检，不错过任何重要邮件</p>
                </div>
              </div>
            </div>

            <div class="highlight-box">
              <div class="highlight-icon">📍</div>
              <div class="highlight-content">
                <h4>典型使用方式</h4>
                <p>每天三个固定时间点，AI 自动检查邮箱，把分类结果和摘要通过飞书发给你。看到感兴趣的邮件直接回复"帮我起草回复"，AI 立即生成草稿。</p>
              </div>
            </div>

            <div class="scenario-section">
              <h4>💻 Prompt 示例</h4>
              <div class="prompt-box">
                <pre>请你作为我的邮件管家，连接我的工作邮箱后完成以下工作：1）每天早上 9:00、下午 14:00、晚上 18:00 读取过去未读邮件；2）按"紧急需回复 / 重要可稍后 / 通知类可忽略"三级分类；3）对紧急邮件提取关键信息并起草回复草稿供我确认；4）对重要邮件生成一句话摘要；5）把分类结果通过飞书消息发给我。注意：任何邮件回复必须经我确认后才能发送，绝不自动发送。</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 场景 05 -->
        <div v-show="activeScenario === 'scenario05'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 05</span>
              <h3>打通飞书文档与多维表格</h3>
            </div>
            <p class="scenario-intro">利用飞书官方插件，让 AI 直接在飞书里创建、编辑和管理结构化数据</p>

            <div class="scenario-section">
              <div class="feature-grid">
                <div class="feature-item">
                  <span class="feature-icon">📄</span>
                  <h5>飞书文档</h5>
                  <p>会议纪要、项目文档、通知公告，直接创建并发布到指定群组</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📊</span>
                  <h5>多维表格 Bitable</h5>
                  <p>CRM 客户管理、项目进度跟踪、数据批量录入，自动同步更新</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📈</span>
                  <h5>电子表格</h5>
                  <p>数据填写、公式计算、报表生成，用自然语言完成 Excel 操作</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📅</span>
                  <h5>日历任务</h5>
                  <p>创建日程、设置提醒、管理待办事项，与飞书日历深度集成</p>
                </div>
              </div>
            </div>

            <div class="highlight-box">
              <div class="highlight-icon">📍</div>
              <div class="highlight-content">
                <h4>典型使用方式</h4>
                <p>告诉 AI："帮我写一份今天产品评审会的纪要，发到产品组群里。"AI 自动整理并创建飞书文档。或者说："把这份客户名单导入 CRM"，AI 批量处理。</p>
              </div>
            </div>

            <div class="scenario-section">
              <h4>💻 Prompt 示例</h4>
              <div class="prompt-box">
                <pre>请根据今天产品评审会的讨论内容，整理一份飞书文档格式的会议纪要，包含：参会人员、讨论议题、关键结论、待办事项（标注负责人和截止日期），写好后直接创建为飞书文档发到"产品组"群里。同时在飞书多维表格"项目进度表"中更新相关任务的最新状态。</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 场景 06 -->
        <div v-show="activeScenario === 'scenario06'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 06</span>
              <h3>构建个人知识库 —— 你的「第二大脑」</h3>
            </div>
            <p class="scenario-intro">看到好文章随时转发给 OpenClaw 沉淀，让"收藏=拥有"变成"收藏=真正消化"</p>

            <div class="scenario-section">
              <div class="feature-grid">
                <div class="feature-item">
                  <span class="feature-icon">📥</span>
                  <h5>随时投喂</h5>
                  <p>转发文章链接、PDF 文件、文字片段，AI 自动抓取并处理各种格式</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🏷️</span>
                  <h5>自动分类</h5>
                  <p>用 3-5 个语义标签自动分类（如 #AI趋势 #产品设计 #管理方法）</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📝</span>
                  <h5>精华摘要</h5>
                  <p>提取核心观点，生成 100 字以内精华摘要存入长期记忆</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🔍</span>
                  <h5>语义检索</h5>
                  <p>问"关于 XX 我之前收藏过什么"，AI 快速检索并给出相关内容和来源</p>
                </div>
              </div>
            </div>

            <div class="highlight-box">
              <div class="highlight-icon">📍</div>
              <div class="highlight-content">
                <h4>典型使用方式</h4>
                <p>看到好文章直接转发给 AI："这个收藏一下。"AI 自动阅读、分类、提炼。日后问："我之前看过关于 prompt 工程的文章吗？"AI 立即调出相关笔记。</p>
              </div>
            </div>

            <div class="scenario-section">
              <h4>💻 Prompt 示例</h4>
              <div class="prompt-box">
                <pre>你是我的知识管理助手。从现在起，我会不定期转发文章链接、PDF 文件或文字片段给你，请你：1）自动阅读全文，提取核心观点和关键信息；2）用 3-5 个标签对内容分类（如 #AI趋势 #产品设计 #管理方法）；3）生成一段 100 字以内的精华摘要存入记忆；4）当我后续问"关于 XX 我之前收藏过什么"时，能快速检索并给出相关内容和来源。这是我的"第二大脑"，帮我把碎片知识变成系统化的个人资产。</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 场景 07 -->
        <div v-show="activeScenario === 'scenario07'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 07</span>
              <h3>公众号自动化发布系统</h3>
            </div>
            <p class="scenario-intro">定时任务 + 搜索 + 写作 + API 调用 —— 一句指令跑通完整业务线</p>

            <div class="scenario-section">
              <div class="feature-grid">
                <div class="feature-item">
                  <span class="feature-icon">⏰</span>
                  <h5>定时自动启动</h5>
                  <p>每天 20:00 定时触发任务流，无需人工干预，完全自动化运行</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🔍</span>
                  <h5>热点采集</h5>
                  <p>通过 tavily-search 全网扫描 AI 领域热点话题，获取最新资讯</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📊</span>
                  <h5>话题筛选</h5>
                  <p>分析热点内容，评估传播价值，按潜力排序选择最佳话题</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✍️</span>
                  <h5>自动写作</h5>
                  <p>撰写 1500-2000 字专业文章，配上吸引人的标题，一气呵成</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📤</span>
                  <h5>API 发布</h5>
                  <p>通过微信公众号 API 存入草稿箱，只需人工审核后一键发布</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🔄</span>
                  <h5>端到端闭环</h5>
                  <p>从采集到发布全流程自动化，真正实现"一句话搞定公众号运营"</p>
                </div>
              </div>
            </div>

            <div class="highlight-box">
              <div class="highlight-icon">📍</div>
              <div class="highlight-content">
                <h4>实际效果</h4>
                <p>每天晚上 20:00 起床，AI 自动完成热点采集→话题筛选→文章写作→存入草稿箱。第二天你只需打开公众号后台审核发布，每天节省 2 小时。</p>
              </div>
            </div>

            <div class="scenario-section">
              <h4>💻 Prompt 示例</h4>
              <div class="prompt-box">
                <pre>你是我的微信公众号运营助手。请你每天 20:00 自动执行以下流程：1）采集今日 AI 领域的热点新闻和话题；2）分析热点内容，选择最有传播价值的 1 个话题；3）撰写一篇 1500-2000 字的公众号文章，风格专业但易懂，配上吸引人的标题；4）写完后通过微信公众号 API 存入我的草稿箱。我的 App ID 是 wx****，App Secret 是 ****。如果你不会操作公众号 API，请自行搜索并安装相关 Skill。</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 场景 08 -->
        <div v-show="activeScenario === 'scenario08'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 08</span>
              <h3>接入麦当劳 MCP —— AI 直接调用真实服务</h3>
            </div>
            <p class="scenario-intro">趣味场景展示 MCP 协议的威力：AI 不只搜索信息，还能直接调用商业服务 API 完成下单</p>

            <div class="scenario-section">
              <div class="feature-grid">
                <div class="feature-item">
                  <span class="feature-icon">🍔</span>
                  <h5>智能点餐推荐</h5>
                  <p>告诉预算和口味偏好，AI 自动查询菜单，推荐最适合的套餐组合</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎫</span>
                  <h5>优惠券自动匹配</h5>
                  <p>自动查找可用优惠券，智能叠加优惠，计算出最低价格方案</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🥗</span>
                  <h5>营养健康管理</h5>
                  <p>根据热量控制目标推荐搭配方案，健身减脂也能放心吃</p>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✅</span>
                  <h5>一键确认下单</h5>
                  <p>推荐方案确认后自动完成下单，配送地址自动填入，全程无需手动操作</p>
                </div>
              </div>
            </div>

            <div class="mcp-info">
              <div class="mcp-icon">🔌</div>
              <div class="mcp-content">
                <h4>MCP (Model Context Protocol)</h4>
                <p>MCP 是 Anthropic 推出的模型上下文协议，让 AI 能够直接调用外部服务。不同于简单的 API 搜索，MCP 让 AI "握住工具的手"——不只是知道有什么能力，而是真正执行操作、完成闭环任务。</p>
              </div>
            </div>

            <div class="highlight-box">
              <div class="highlight-icon">📍</div>
              <div class="highlight-content">
                <h4>典型使用方式</h4>
                <p>告诉 AI："帮我看看附近麦当劳有什么优惠，我想点一份 30 元以内的午餐，热量控制在 800 大卡以下。"AI 推荐 2-3 种搭配，标注价格和热量，你选好后直接帮你下单送到家。</p>
              </div>
            </div>

            <div class="scenario-section">
              <h4>💻 Prompt 示例</h4>
              <div class="prompt-box">
                <pre>帮我看看附近的麦当劳有什么优惠活动，我想点一份 30 元以内的午餐套餐，热量控制在 800 大卡以下。请推荐 2-3 种搭配方案，标注价格和热量，我选好后帮我下单，送到公司地址：XX 路 XX 号。</pre>
              </div>
            </div>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MermaidChart from '../components/MermaidChart.vue'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('python', python)
hljs.registerLanguage('json', json)

const activeCategory = ref('architecture')
const activeTab = ref('execution')
const activeScenario = ref('scenario01')

const scenarios = [
  { id: 'scenario01', name: '个人情感陪伴' },
  { id: 'scenario02', name: '资讯采集推送' },
  { id: 'scenario03', name: '日报编辑助手' },
  { id: 'scenario04', name: '打通邮件系统' },
  { id: 'scenario05', name: '飞书文档表格' },
  { id: 'scenario06', name: '个人知识库' },
  { id: 'scenario07', name: '公众号发布' },
  { id: 'scenario08', name: '麦当劳 MCP' }
]

const layers = [
  { id: 'execution', level: 'Level 1', name: 'Execution', desc: '执行内核', icon: '⚙️' },
  { id: 'capability', level: 'Level 2', name: 'Capability', desc: '能力层', icon: '🔧' },
  { id: 'context', level: 'Level 3', name: 'Context', desc: '上下文层', icon: '💾' },
  { id: 'intelligence', level: 'Level 4', name: 'Intelligence', desc: '认知层', icon: '🧠' },
  { id: 'autonomy', level: 'Level 5', name: 'Autonomy', desc: '自主层', icon: '🤖' },
  { id: 'infrastructure', level: 'Level 6', name: 'Infrastructure', desc: '基础设施', icon: '🏗️' }
]

const promptLayers = [
  { name: 'SOUL.md', desc: '人格定义', detail: 'Agent 的核心价值观和性格' },
  { name: 'USER.md', desc: '用户信息', detail: '当前用户身份和偏好设置' },
  { name: 'IDENTITY.md', desc: '身份标识', detail: 'Agent 的角色和职责定义' },
  { name: 'AGENTS.md', desc: '工作区规则', detail: '子代理配置和行为规范' },
  { name: 'TOOLS.md', desc: '工具配置', detail: '可用工具的描述和参数' },
  { name: 'SAFETY.md', desc: '安全规则', detail: '安全边界和限制条件' },
  { name: 'MEMORY.md', desc: '长期记忆', detail: '历史交互和经验总结' },
  { name: 'HEARTBEAT.md', desc: '心跳任务', detail: '定时任务的触发条件' }
]

// 代码示例 - 来自 claw0 教程
const agentLoopCode = `def agent_loop() -> None:
    messages: list[dict] = []

    while True:
        user_input = input(colored_prompt()).strip()
        if not user_input or user_input.lower() in ("quit", "exit"):
            break

        messages.append({"role": "user", "content": user_input})

        try:
            response = client.messages.create(
                model=MODEL_ID,
                max_tokens=8096,
                system=SYSTEM_PROMPT,
                messages=messages,
            )
        except Exception as exc:
            print(f"API Error: {exc}")
            messages.pop()
            continue

        if response.stop_reason == "end_turn":
            for block in response.content:
                if hasattr(block, "text"):
                    print_assistant(block.text)
            messages.append({"role": "assistant", "content": response.content})
        elif response.stop_reason == "tool_use":
            # 处理工具调用...
            pass`

const toolUseCode = `TOOLS = [
    {
        "name": "bash",
        "description": "Run a shell command and return its output.",
        "input_schema": {
            "type": "object",
            "properties": {
                "command": {"type": "string", "description": "The shell command."},
                "timeout": {"type": "integer", "description": "Timeout in seconds."},
            },
            "required": ["command"],
        },
    },
    # ... read_file, write_file, edit_file (相同模式)
]

TOOL_HANDLERS: dict[str, Any] = {
    "bash": tool_bash,
    "read_file": tool_read_file,
    "write_file": tool_write_file,
    "edit_file": tool_edit_file,
}

def process_tool_call(tool_name: str, tool_input: dict) -> str:
    handler = TOOL_HANDLERS.get(tool_name)
    if handler is None:
        return f"Unknown tool: {tool_name}"
    try:
        return handler(**tool_input)
    except Exception as exc:
        return str(exc)  # 错误作为字符串返回`

const sessionCode = `# sessions/user_123.jsonl
{"role": "user", "content": "你好", "timestamp": "2024-01-01T10:00:00Z"}
{"role": "assistant", "content": [{"type": "text", "text": "你好！有什么可以帮你的？"}]}
{"role": "user", "content": "帮我写个函数", "timestamp": "2024-01-01T10:01:00Z"}

# 读取重放
with open("sessions/user_123.jsonl") as f:
    for line in f:
        msg = json.loads(line)
        messages.append(msg)`

const promptAssemblyCode = `def assemble_prompt() -> str:
    parts = []

    # 按顺序叠加每一层
    parts.append(Path("workspace/SOUL.md").read_text())
    parts.append(Path("workspace/IDENTITY.md").read_text())
    parts.append(Path("workspace/TOOLS.md").read_text())
    parts.append(Path("workspace/USER.md").read_text())
    parts.append(Path("workspace/AGENTS.md").read_text())
    parts.append(retrieve_memory())  # 混合记忆检索
    parts.append(Path("workspace/HEARTBEAT.md").read_text())
    parts.append(Path("workspace/BOOTSTRAP.md").read_text())

    return "\\n\\n".join(parts)`

const heartbeatCode = `import threading
import croniter
from datetime import datetime

def heartbeat_loop():
    while True:
        now = datetime.now()
        if croniter.croniter(CRON_EXPRESSION, now).is_now():
            # 使用灵魂/记忆构建提示词
            prompt = build_prompt_from_soul_and_memory()

            # 和用户消息共用同一管线
            agent.process(prompt)

        time.sleep(60)  # 每分钟检查一次`

const highlightedAgentLoop = computed(() => hljs.highlight(agentLoopCode, { language: 'python' }).value)
const highlightedToolUse = computed(() => hljs.highlight(toolUseCode, { language: 'python' }).value)
const highlightedSession = computed(() => hljs.highlight(sessionCode, { language: 'json' }).value)
const highlightedPromptAssembly = computed(() => hljs.highlight(promptAssemblyCode, { language: 'python' }).value)
const highlightedHeartbeat = computed(() => hljs.highlight(heartbeatCode, { language: 'python' }).value)

// Mermaid 图表定义
const agentLoopDiagram = `flowchart TD
    A[User Input] --> B[messages append]
    B --> C[client.messages.create]
    C --> D{stop_reason?}
    D -->|"end_turn"| E[Print Output]
    D -->|"tool_use"| F[Execute Tool]
    F --> G[tool_result]
    G --> B
    E --> H[Continue Loop]
    H --> B`

const toolUseDiagram = `flowchart TD
    A[messages] --> B[LLM API with TOOLS]
    B --> C{stop_reason?}
    C -->|"tool_use"| D[TOOL_HANDLERS name input]
    D --> E[tool_result]
    E --> F[messages append tool_result]
    F --> B
    C -->|"end_turn"| G[End]`

const heartbeatDiagram = `flowchart TD
    A[Main Loop User Messages] --> B[Heartbeat Scheduler]
    B --> C{should_run?}
    C -->|No| D[Sleep 60s]
    C -->|Yes| E[Build Prompt from Soul + Memory]
    E --> F[agent.process prompt]
    F --> B
    D --> B`

const deliveryDiagram = `flowchart TD
    A[Agent Reply] --> B[chunk_message split by platform]
    B --> C[DeliveryQueue.enqueue]
    C --> D["Write .tmp.\{pid\}.\{id\}.json"]
    D --> E[fsync flush to disk]
    E --> F[os.replace atomic]
    F --> G[DeliveryRunner scan 1s]
    G --> H{Deliver Success?}
    H -->|Yes| I[ack delete .json]
    H -->|No| J[fail retry_count++]
    J --> K{retry_count >= 5?}
    K -->|Yes| L[move to failed/]
    K -->|No| M[compute backoff]
    M --> N[update next_retry_at]
    N --> G`

const resilienceDiagram = `flowchart TD
    A[API Request] --> B[Layer 1: Auth Rotation]
    B --> C[for each profile not in cooldown]
    C --> D[create client profile.api_key]
    D --> E[Layer 2: Overflow Recovery]
    E --> F[for compact_attempt in 0..2]
    F --> G[Layer 3: Tool-Use Loop]
    G --> H{success?}
    H -->|Yes| I[mark_success return result]
    H -->|No| J[classify_failure]
    J --> K{overflow?}
    K -->|Yes| L[compact retry Layer 2]
    K -->|No| M{auth/rate?}
    M -->|Yes| N[mark_failure break to Layer 1]
    M -->|No| O[timeout? mark 60s cooldown]
    O --> B`

const concurrencyDiagram = `flowchart TD
    A[Incoming Work] --> B[CommandQueue.enqueue lane name]
    B --> C{Lane Queue}
    C --> D[main max=1 FIFO]
    C --> E[cron max=1 FIFO]
    C --> F[heartbeat max=1 FIFO]
    D --> G{active < max?}
    E --> G
    F --> G
    G -->|Yes| H[threading.Thread run_task]
    G -->|No| I[wait in queue]
    H --> J[_task_done]
    J --> K[active_count--]
    K --> L[_pump next if active < max]`

const routingDiagram = `flowchart TD
    A[Inbound Message] --> B[Gateway]
    B --> C[BindingTable.resolve]
    C --> D{Tier 1 peer_id?}
    D -->|Match| E[Return agent_id]
    D -->|No| F{Tier 2 guild_id?}
    F -->|Match| E
    F -->|No| G{Tier 3 account_id?}
    G -->|Match| E
    G -->|No| H{Tier 4 channel?}
    H -->|Match| E
    H -->|No| I{Tier 5 default?}
    I -->|Match| E
    I -->|No| J[No binding found]`

// 代码示例 - 基础设施层
const routingCode = `@dataclass
class Binding:
    agent_id: str
    tier: int           # 1-5, 越小越具体
    match_key: str      # "peer_id" | "guild_id" | "account_id" | "channel" | "default"
    match_value: str    # e.g. "telegram:12345", "discord", "*"
    priority: int = 0   # 同一 tier 内, 越高越优先

class BindingTable:
    def resolve(self, channel="", account_id="",
                guild_id="", peer_id="") -> tuple[str | None, Binding | None]:
        for b in self._bindings:
            if b.tier == 1 and b.match_key == "peer_id":
                if ":" in b.match_value:
                    if b.match_value == f"{channel}:{peer_id}":
                        return b.agent_id, b
                elif b.match_value == peer_id:
                    return b.agent_id, b
            # ... 其他 tier 类似
        return None, None`

const inboundMessageCode = `@dataclass
class InboundMessage:
    text: str
    sender_id: str
    channel: str = ""          # "cli", "telegram", "feishu"
    account_id: str = ""       # 接收消息的 bot
    peer_id: str = ""          # DM=user_id, group=chat_id, topic=chat_id:topic:thread_id
    is_group: bool = False
    media: list = field(default_factory=list)
    raw: dict = field(default_factory=dict)`

const deliveryCode = `def _write_entry(self, entry: QueuedDelivery) -> None:
    final_path = self.queue_dir / f"{entry.id}.json"
    tmp_path = self.queue_dir / f".tmp.{os.getpid()}.{entry.id}.json"

    data = json.dumps(entry.to_dict(), indent=2, ensure_ascii=False)
    with open(tmp_path, "w", encoding="utf-8") as f:
        f.write(data)
        f.flush()
        os.fsync(f.fileno())        # 数据已落盘

    os.replace(str(tmp_path), str(final_path))  # POSIX 上的原子操作

# 三步保证:
# 1. 写入 .tmp.{pid}.{id}.json (崩溃 = 孤立的临时文件, 无害)
# 2. fsync() -- 数据已落盘
# 3. os.replace() -- 原子交换 (崩溃 = 旧文件或新文件)`

const profileManagerCode = `class ProfileManager:
    def select_profile(self) -> AuthProfile | None:
        now = time.time()
        for profile in self.profiles:
            if now >= profile.cooldown_until:
                return profile
        return None

    def mark_failure(self, profile, reason, cooldown_seconds=300.0):
        profile.cooldown_until = time.time() + cooldown_seconds
        profile.failure_reason = reason.value

    def mark_success(self, profile):
        profile.failure_reason = None
        profile.last_good_at = time.time()`

const laneQueueCode = `class LaneQueue:
    def __init__(self, name: str, max_concurrency: int = 1) -> None:
        self.name = name
        self.max_concurrency = max(1, max_concurrency)
        self._deque = deque()           # [(fn, future, generation), ...]
        self._condition = threading.Condition()
        self._active_count = 0
        self._generation = 0

    def _pump(self):
        """Pop and start tasks while active < max_concurrency."""
        while self._active_count < self.max_concurrency and self._deque:
            fn, future, gen = self._deque.popleft()
            self._active_count += 1
            threading.Thread(
                target=self._run_task, args=(fn, future, gen), daemon=True
            ).start()

    def _task_done(self, gen):
        with self._condition:
            self._active_count -= 1
            if gen == self._generation:  # stale tasks do not re-pump
                self._pump()
            self._condition.notify_all()`

const highlightedRouting = computed(() => hljs.highlight(routingCode, { language: 'python' }).value)
const highlightedInboundMessage = computed(() => hljs.highlight(inboundMessageCode, { language: 'python' }).value)
const highlightedDelivery = computed(() => hljs.highlight(deliveryCode, { language: 'python' }).value)
const highlightedProfileManager = computed(() => hljs.highlight(profileManagerCode, { language: 'python' }).value)
const highlightedLaneQueue = computed(() => hljs.highlight(laneQueueCode, { language: 'python' }).value)

</script>

<style scoped>
.openclaw-page {
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
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 20px;
  color: var(--text-secondary);
}

/* Category Tabs */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab:hover {
  border-color: #a855f7;
}

.category-tab.active {
  border-color: #7c3aed;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
}

.category-tab .category-icon {
  font-size: 20px;
}

.category-tab .category-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

/* Architecture Overview */
.architecture-overview {
  margin-bottom: 40px;
}

.architecture-overview h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  text-align: center;
}

.layer-tabs {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.layer-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}

.layer-tab:hover {
  border-color: #a855f7;
}

.layer-tab.active {
  border-color: #7c3aed;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
}

.layer-tab-icon {
  font-size: 20px;
}

.layer-tab-content {
  display: flex;
  flex-direction: column;
}

.layer-tab-level {
  font-size: 10px;
  color: #7c3aed;
  font-weight: 600;
}

.layer-tab-name {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
}

.layer-tab-desc {
  font-size: 11px;
  color: #6b7280;
}

/* Scenarios Overview */
.scenarios-overview {
  margin-bottom: 40px;
}

.scenario-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.scenario-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scenario-tab:hover {
  border-color: #ec4899;
}

.scenario-tab.active {
  border-color: #ec4899;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
}

.scenario-num {
  font-size: 11px;
  font-weight: 700;
  color: #ec4899;
  background: #fce7f3;
  padding: 2px 6px;
  border-radius: 4px;
}

.scenario-name {
  font-size: 12px;
  font-weight: 500;
  color: #1f2937;
}

/* Scenario Content */
.scenario-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e5e7eb;
}

.scenario-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.scenario-badge {
  padding: 8px 16px;
  background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%);
  color: white;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.scenario-header h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.scenario-intro {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.scenario-section {
  margin-bottom: 24px;
}

.scenario-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.scenario-section ul,
.scenario-section ol {
  margin: 0;
  padding-left: 20px;
}

.scenario-section li {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.8;
}

.scenario-section p {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.7;
}

/* Tab Content */
.tab-content-area {
  margin-bottom: 48px;
}

.tab-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.section-badge.level-1 { background: linear-gradient(135deg, #2563eb, #3b82f6); }
.section-badge.level-2 { background: linear-gradient(135deg, #7c3aed, #a855f7); }
.section-badge.level-3 { background: linear-gradient(135deg, #10b981, #34d399); }
.section-badge.level-4 { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
.section-badge.level-5 { background: linear-gradient(135deg, #ec4899, #f472b6); }
.section-badge.level-6 { background: linear-gradient(135deg, #ef4444, #f87171); }

.section-header h3 {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.section-intro {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 24px;
}

/* Flow Diagram */
.flow-diagram {
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
}

.flow-diagram h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.mermaid-diagram {
  background: white;
  border-radius: 10px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.mermaid-diagram pre {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  white-space: pre;
}

/* Concept Card */
.concept-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid #e5e7eb;
}

.concept-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.concept-icon {
  font-size: 28px;
}

.concept-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.concept-subtitle {
  font-size: 12px;
  color: #6b7280;
}

.concept-desc {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 16px;
}

.concept-desc code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: #7c3aed;
}

.concept-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.concept-list li {
  padding: 8px 0;
  font-size: 13px;
  color: #4b5563;
  line-height: 1.5;
  border-bottom: 1px solid #f3f4f6;
}

.concept-list li:last-child {
  border-bottom: none;
}

.concept-list li strong {
  color: #1f2937;
}

/* Agent Architecture */
.agent-architecture {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.agent-section {
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.agent-section .section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

/* Code Block */
.code-block {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background: #0f172a;
}

.code-title {
  font-size: 13px;
  font-weight: 500;
  color: #e2e8f0;
}

.code-lang {
  font-size: 11px;
  color: #94a3b8;
  background: #334155;
  padding: 2px 8px;
  border-radius: 4px;
}

.code-block pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  color: #e2e8f0;
  line-height: 1.5;
}

.scenario-section .code-block {
  max-height: none;
  overflow: visible;
}

.scenario-section .code-block pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Feature Grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.feature-grid.three-col {
  grid-template-columns: repeat(3, 1fr);
}

.feature-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.feature-item .feature-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.feature-item h5 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.feature-item p {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.feature-tag {
  display: block;
  margin-top: 8px;
  font-size: 10px;
  color: #7c3aed;
  background: #f5f3ff;
  padding: 4px 8px;
  border-radius: 4px;
}

/* Highlight Box */
.highlight-box {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  border: 2px solid #f59e0b;
  margin-bottom: 24px;
}

.highlight-box .highlight-icon {
  font-size: 24px;
}

.highlight-box .highlight-content h4 {
  font-size: 15px;
  font-weight: 600;
  color: #92400e;
  margin: 0 0 8px 0;
}

.highlight-box .highlight-content p {
  font-size: 13px;
  color: #78350f;
  margin: 0;
  line-height: 1.6;
}

/* Prompt Box - 更易读的文本样式 */
.prompt-box {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
}

.prompt-box pre {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  font-size: 15px;
  line-height: 1.8;
  color: #334155;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Skill Tag */
.skill-tag {
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-radius: 8px;
  font-size: 12px;
  color: #1e40af;
  margin-bottom: 20px;
}

/* Workflow Steps */
.workflow-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.workflow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  min-width: 100px;
  border: 1px solid #e5e7eb;
}

.workflow-step .step-num {
  width: 24px;
  height: 24px;
  background: #7c3aed;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.workflow-step .step-title {
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
}

.workflow-step .step-desc {
  font-size: 10px;
  color: #6b7280;
}

.workflow-arrow {
  font-size: 20px;
  color: #9ca3af;
}

/* MCP Info */
.mcp-info {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 2px solid #0ea5e9;
}

.mcp-info h4 {
  font-size: 15px;
  font-weight: 600;
  color: #0369a1;
  margin: 0 0 12px 0;
}

.mcp-info p {
  font-size: 13px;
  color: #075985;
  margin: 0;
  line-height: 1.7;
}

/* Tables */
.stop-reason-table {
  margin-top: 20px;
}

.stop-reason-table h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.stop-reason-table table {
  width: 100%;
  border-collapse: collapse;
}

.stop-reason-table th,
.stop-reason-table td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
}

.stop-reason-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #4b5563;
}

.stop-reason-table code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #7c3aed;
}

/* Key Insight */
.key-insight {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-radius: 12px;
  border: 1px solid #10b981;
  margin-bottom: 20px;
}

.key-insight .insight-icon {
  font-size: 24px;
}

.key-insight .insight-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 8px;
}

.key-insight .insight-content ul {
  margin: 0;
  padding-left: 16px;
}

.key-insight .insight-content li {
  font-size: 13px;
  color: #047857;
  line-height: 1.6;
}

/* Key Point */
.key-point {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  border: 1px solid #f59e0b;
}

.key-point .key-icon {
  font-size: 24px;
}

.key-point .key-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 8px;
}

.key-point .key-content p {
  font-size: 13px;
  color: #78350f;
  margin: 0;
  line-height: 1.6;
}

/* Tools Grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.tool-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.tool-icon {
  font-size: 20px;
}

.tool-name {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  font-family: monospace;
}

.tool-desc {
  font-size: 11px;
  color: #6b7280;
}

/* Skills Market */
.skills-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 2px solid #0ea5e9;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #0369a1;
}

.stat-label {
  font-size: 12px;
  color: #075985;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.skill-category {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.category-icon {
  font-size: 18px;
}

.category-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  background: white;
  border-radius: 8px;
}

.skill-name {
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
  font-family: monospace;
}

.skill-desc {
  font-size: 11px;
  color: #6b7280;
}

.skill-usage {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 2px solid #0ea5e9;
}

.usage-title {
  font-size: 14px;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 12px;
}

.usage-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.usage-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.usage-label {
  font-size: 12px;
  font-weight: 600;
  color: #075985;
  min-width: 40px;
}

.usage-item code {
  font-family: monospace;
  font-size: 12px;
  padding: 4px 8px;
  background: white;
  border-radius: 4px;
  color: #2563eb;
}

.usage-item span:last-child {
  font-size: 12px;
  color: #075985;
}

/* Sessions Flow */
.sessions-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 18px;
  background: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  min-width: 100px;
}

.step-icon {
  font-size: 22px;
}

.step-title {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
}

.step-desc {
  font-size: 11px;
  color: #6b7280;
}

.flow-arrow {
  font-size: 20px;
  color: #9ca3af;
}

/* Prompt Layers */
.prompt-layers {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.prompt-layers .layer-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #f8fafc;
  border-radius: 8px;
}

.prompt-layers .layer-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #7c3aed;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.prompt-layers .layer-info {
  display: flex;
  flex-direction: column;
}

.prompt-layers .layer-name {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.prompt-layers .layer-desc {
  font-size: 11px;
  color: #64748b;
}

.prompt-layers .layer-detail {
  font-size: 10px;
  color: #94a3b8;
  margin-top: 2px;
}

/* Workspace Structure */
.workspace-structure {
  margin-top: 24px;
  padding: 20px;
  background: #1e293b;
  border-radius: 12px;
}

.workspace-structure h4 {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 16px;
}

.tree-diagram {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  line-height: 1.8;
  color: #94a3b8;
}

.tree-line {
  white-space: pre;
}

.tree-diagram .file-name {
  color: #a78bfa;
}

.tree-diagram .folder-name {
  color: #fbbf24;
}

.workspace-note {
  margin-top: 16px;
  padding: 12px;
  background: #334155;
  border-radius: 8px;
  font-size: 12px;
  color: #cbd5e1;
  text-align: center;
}

/* Workspace Bootstrap Files */
.workspace-bootstrap {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  margin: 20px 0;
}

.bootstrap-tree h5,
.bootstrap-descriptions h5 {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.bootstrap-tree {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
}

.bootstrap-tree .tree-diagram {
  background: transparent;
  padding: 0;
}

.bootstrap-descriptions {
  max-height: 500px;
  overflow-y: auto;
}

.desc-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.desc-item {
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.desc-item .file-name {
  font-size: 13px;
  font-weight: 600;
  color: #7c3aed;
  font-family: monospace;
}

.desc-item .file-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
}

.file-tag.manual {
  background: #fef3c7;
  color: #b45309;
}

.file-tag.auto {
  background: #dcfce7;
  color: #15803d;
}

.desc-item p {
  font-size: 11px;
  color: #6b7280;
  margin: 8px 0 0 0;
  line-height: 1.5;
}

/* Core Concept */
.core-concept {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border-radius: 12px;
  border: 1px solid #a855f7;
}

.core-concept h5 {
  font-size: 14px;
  font-weight: 600;
  color: #6d28d9;
  margin-bottom: 8px;
}

.core-concept > p {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 16px;
}

.assembly-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.flow-item {
  padding: 6px 12px;
  background: white;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #7c3aed;
  font-family: monospace;
  border: 1px solid #ddd6fe;
}

.flow-arrow {
  color: #a78bfa;
  font-size: 14px;
}

/* Infrastructure Grid */
.infra-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.infra-card {
  background: white;
  border-radius: 14px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.infra-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.infra-icon {
  font-size: 24px;
}

.infra-name {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.infra-card p {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
}

.routing-flow,
.delivery-flow {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #4b5563;
  background: #f8fafc;
  padding: 8px;
  border-radius: 6px;
}

.channels-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.channel-tag {
  font-size: 11px;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 12px;
  color: #4b5563;
}

.retry-layers {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.retry-layer {
  position: absolute;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}

.retry-layer.outer {
  background: #fef2f2;
  color: #dc2626;
}

.retry-layer.middle {
  background: #fff7ed;
  color: #ea580c;
  transform: scale(0.85);
}

.retry-layer.inner {
  background: #f0fdf4;
  color: #16a34a;
  transform: scale(0.7);
}

.lanes-diagram {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lanes-diagram .lane {
  font-size: 11px;
  padding: 6px 10px;
  background: #f5f3ff;
  border-radius: 4px;
  color: #5b21b6;
  font-family: monospace;
}

/* Infrastructure 扩展样式 */
.tier-table,
.dm-scope-table,
.backoff-table,
.failover-table {
  margin: 16px 0;
}

.tier-table h4,
.dm-scope-table h4,
.backoff-table h4,
.failover-table h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.tier-table table,
.dm-scope-table table,
.backoff-table table,
.failover-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.tier-table th,
.dm-scope-table th,
.backoff-table th,
.failover-table th,
.tier-table td,
.dm-scope-table td,
.backoff-table td,
.failover-table td {
  padding: 10px 12px;
  text-align: left;
  border: 1px solid #e5e7eb;
}

.tier-table th,
.dm-scope-table th,
.backoff-table th,
.failover-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.tier-table td,
.dm-scope-table td,
.backoff-table td,
.failover-table td {
  color: #4b5563;
}

.tier-table code,
.dm-scope-table code,
.backoff-table code,
.failover-table code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  color: #7c3aed;
}

.inbound-message {
  margin: 20px 0;
}

.inbound-message h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.channels-supported {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.channel-item {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.channel-item .channel-icon {
  font-size: 20px;
}

.channel-item h5 {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.channel-item p {
  font-size: 11px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.lanes-detail {
  margin: 20px 0;
}

.lanes-detail h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.lane-cards {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.lane-card {
  flex: 1;
  min-width: 140px;
  padding: 14px;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border-radius: 10px;
  border: 1px solid #a855f7;
}

.lane-card .lane-name {
  font-size: 14px;
  font-weight: 600;
  color: #7c3aed;
  font-family: monospace;
}

.lane-card .lane-max {
  font-size: 11px;
  color: #6b7280;
  margin-left: 8px;
}

.lane-card p {
  font-size: 11px;
  color: #6b7280;
  margin: 8px 0 0 0;
}

/* 响应式 */
@media (max-width: 1024px) {
  .tools-grid,
  .infra-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .layer-tabs {
    flex-direction: column;
  }

  .layer-tab {
    min-width: auto;
  }

  .sessions-flow {
    flex-direction: column;
  }

  .sessions-flow .flow-arrow {
    transform: rotate(90deg);
  }
}
</style>
