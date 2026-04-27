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
          <span class="scenario-num">{{ index < 10 ? '0' + index : String(index) }}</span>
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
          Agent 的最小形态：一个 while 循环 + stop_reason。详细内容请参考 Claude Code 页面的 Agent Loop 模块。
        </p>

        <div class="cross-link-card">
          <div class="cross-link-icon">🔗</div>
          <div class="cross-link-content">
            <h4>查看 Agent Loop 详解</h4>
            <p>Agent Loop 核心循环模式、stop_reason 含义、完整代码示例等详细内容已在 Claude Code 页面展示。</p>
            <button class="cross-link-button" @click="router.push({ path: '/claude-code', query: { tab: 'execution' } })">
              跳转到 Claude Code →
            </button>
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

        <div class="cross-link-card">
          <div class="cross-link-icon">🔗</div>
          <div class="cross-link-content">
            <h4>查看 Tool Use 详解</h4>
            <p>TOOLS + TOOL_HANDLERS 架构、Schema 定义与分发表、Hands 执行能力（bash / read / write / edit / browser / database）等详细内容已在 Claude Code 页面展示。</p>
            <button class="cross-link-button" @click="router.push({ path: '/claude-code', query: { tab: 'capability' } })">
              跳转到 Claude Code →
            </button>
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
                <div class="skill-item">
                  <span class="skill-name">find-skills</span>
                  <span class="skill-desc">帮你查找 ClawHub 上的 Skills</span>
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
        <div class="section-header">
          <span class="section-badge level-3">Level 3</span>
          <h3>Context 上下文层</h3>
        </div>
        <p class="section-intro">
          Session = 一个 JSONL 日志 + 自动上下文控制。会话持久化 + 上下文保护，真正的磁盘级存储，不是 prompt 注入。
        </p>

        <!-- Session 只做三件事 -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🧠</span>
            <div>
              <h4>Session 只做三件事</h4>
              <span class="concept-subtitle">Session 的本质</span>
            </div>
          </div>
          <div class="subagent-core">
            <div class="core-trait" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-color: #fcd34d;">
              <div class="trait-icon">📄</div>
              <div class="trait-label">存储对话</div>
            </div>
            <div class="core-trait" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-color: #93c5fd;">
              <div class="trait-icon">🔄</div>
              <div class="trait-label">还原上下文</div>
            </div>
            <div class="core-trait" style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-color: #f9a8d4;">
              <div class="trait-icon">✂️</div>
              <div class="trait-label">控制大小</div>
            </div>
          </div>
          <div class="session-trait-desc">
            <p><strong>1. 存储对话</strong> —— 用 JSONL 文件追加写入，永远不会覆盖旧数据。</p>
            <p><strong>2. 还原上下文</strong> —— 把日志转换成 messages（给 LLM 看的格式）。</p>
            <p><strong>3. 控制上下文大小</strong> —— 防止超过模型 token 限制。</p>
          </div>
        </div>

        <!-- JSONL 数据结构 -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">📦</span>
            <div>
              <h4>JSONL 数据结构</h4>
              <span class="concept-subtitle">追加写入 · 完整保留 · 可恢复</span>
            </div>
          </div>
          <p class="concept-desc">
            每一行是一条记录，类型覆盖 user、assistant、tool_use、tool_result。Append-only，Replay 可恢复，完整历史始终保存在磁盘。
          </p>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">Session 存储格式</span>
              <span class="code-lang">JSONL</span>
            </div>
            <pre><code v-html="highlightedSession"></code></pre>
          </div>
        </div>

        <!-- 运行流程 -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🔄</span>
            <div>
              <h4>每轮请求的流程</h4>
              <span class="concept-subtitle">JSONL = 真实数据，messages = 上下文</span>
            </div>
          </div>
          <div class="sessions-flow">
            <div class="flow-step">
              <span class="step-icon">📄</span>
              <span class="step-title">读取 JSONL</span>
              <span class="step-desc">从磁盘加载日志</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <span class="step-icon">🔄</span>
              <span class="step-title">Rebuild</span>
              <span class="step-desc">日志 → messages</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <span class="step-icon">🤖</span>
              <span class="step-title">调用 LLM</span>
              <span class="step-desc">发送上下文</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <span class="step-icon">📝</span>
              <span class="step-title">写回 JSONL</span>
              <span class="step-desc">追加新记录</span>
            </div>
          </div>
          <div class="analogy-card" style="margin-top: 16px;">
            <div class="analogy-icon">👉</div>
            <div class="analogy-content">
              <p>
                <strong>JSONL</strong> 是真实数据源，<strong>messages</strong> 是每次给模型临时组装的上下文窗口。改的是 messages，JSONL 只追加不修改。
              </p>
            </div>
          </div>
        </div>

        <!-- Context Guard -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🛡️</span>
            <div>
              <h4>Context Guard 上下文保护</h4>
              <span class="concept-subtitle">四级重试策略</span>
            </div>
          </div>
          <p class="concept-desc">
            对话会越来越长，模型有 token 上限。Context Guard 通过四级重试策略，逐级压缩上下文，确保请求成功。
          </p>

          <div class="context-guard-steps">
            <div class="guard-step">
              <div class="guard-step-header">
                <span class="guard-badge attempt-0">1</span>
                <h5>直接调用</h5>
              </div>
              <p class="guard-step-desc">不做任何处理，正常发送。大多数情况下一次成功。</p>
            </div>
            <div class="guard-step">
              <div class="guard-step-header">
                <span class="guard-badge attempt-1">2</span>
                <h5>截断 Tool 输出</h5>
              </div>
              <p class="guard-step-desc">删除过大的 Tool 返回（如文件内容、JSON 数据），因为它们占 token 多、信息密度低。</p>
            </div>
            <div class="guard-step">
              <div class="guard-step-header">
                <span class="guard-badge attempt-2">3</span>
                <h5>压缩历史（Compaction）</h5>
              </div>
              <p class="guard-step-desc">旧对话 → 摘要，新对话 → 保留。用"摘要"替代"历史"，保留最近 20%，压缩最早 50%。</p>
            </div>
            <div class="guard-step fail">
              <div class="guard-step-header">
                <span class="guard-badge attempt-fail">✗</span>
                <h5>仍然超限 → 报错</h5>
              </div>
              <p class="guard-step-desc">三级策略均无效时，返回错误。</p>
            </div>
          </div>

          <div class="compaction-diagram">
            <h5>压缩策略示意</h5>
            <div class="compaction-visual">
              <div class="compact-region compressed">
                <span class="region-label">最早 50% → 摘要</span>
                <span class="region-detail">[summary] "Understood"</span>
              </div>
              <div class="compact-region middle">
                <span class="region-label">中间 30% → 保留</span>
                <span class="region-detail">原始消息</span>
              </div>
              <div class="compact-region keep">
                <span class="region-label">最近 20% → 保留</span>
                <span class="region-detail">原始消息</span>
              </div>
            </div>
          </div>
        </div>

        <div class="analogy-card">
          <div class="analogy-icon">🧠</div>
          <div class="analogy-content">
            <h4>最简理解</h4>
            <p>
              Session 可以理解为三件事的组合：<strong>📄 日志系统</strong>（JSONL 持久化存储）+ <strong>🔄 上下文生成器</strong>（rebuild 组装 messages）+ <strong>✂️ 压缩器</strong>（compaction 控制大小）。
            </p>
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
          让 Agent 从"被动响应"变成"主动运行"。三种核心机制：Heartbeat 心跳巡检、Cron 定时任务、SubAgent 分身执行。
        </p>

        <div class="dual-card">
          <!-- Heartbeat -->
          <div class="concept-card">
            <div class="concept-header">
              <span class="concept-icon">💓</span>
              <div>
                <h4>Heartbeat 心跳</h4>
                <span class="concept-subtitle">主会话的"定期巡检"</span>
              </div>
            </div>
            <p class="concept-desc">
              像一个闹钟提醒你"该检查了"。在主会话上下文中运行，能看到最近的对话历史，适合批量巡检多个事项。
            </p>
            <div class="spec-list">
              <div class="spec-item"><span class="spec-label">运行上下文</span><span class="spec-value">主会话内（能看到对话历史）</span></div>
              <div class="spec-item"><span class="spec-label">时间精度</span><span class="spec-value">宽松，偏差几分钟无影响</span></div>
              <div class="spec-item"><span class="spec-label">输出位置</span><span class="spec-value">只在主会话里，不主动推送到其他频道</span></div>
              <div class="spec-item"><span class="spec-label">静默模式</span><span class="spec-value">可返回 HEARTBEAT_OK 表示"一切正常"</span></div>
            </div>
            <div class="example-list">
              <h5>适合场景</h5>
              <div class="example-item">
                <span class="example-icon">📬</span>
                <span>"每隔 30 分钟检查一下有没有新邮件、今天有没有即将开始的会议"</span>
              </div>
              <div class="example-item">
                <span class="example-icon">🔀</span>
                <span>"批量检查邮件 + 日历 + 天气，结合最近对话做判断"</span>
              </div>
            </div>
          </div>

          <!-- Cron -->
          <div class="concept-card">
            <div class="concept-header">
              <span class="concept-icon">⏰</span>
              <div>
                <h4>Cron 定时任务</h4>
                <span class="concept-subtitle">独立运行的"定时脚本"</span>
              </div>
            </div>
            <p class="concept-desc">
              像一个定时执行的脚本。隔离运行，不依赖主会话历史，精确到分钟级触发，适合单点、确定性的任务。
            </p>
            <div class="spec-list">
              <div class="spec-item"><span class="spec-label">运行上下文</span><span class="spec-value">隔离运行（不依赖主会话历史）</span></div>
              <div class="spec-item"><span class="spec-label">时间精度</span><span class="spec-value">精确到分钟（9:00 AM sharp）</span></div>
              <div class="spec-item"><span class="spec-label">输出位置</span><span class="spec-value">可直接推送到指定频道</span></div>
              <div class="spec-item"><span class="spec-label">触发模式</span><span class="spec-value">标准 cron 表达式 / 一次性提醒</span></div>
            </div>
            <div class="example-list">
              <h5>适合场景</h5>
              <div class="example-item">
                <span class="example-icon">🌤️</span>
                <span>"每天早上 8:00 发送天气播报到用户频道"</span>
              </div>
              <div class="example-item">
                <span class="example-icon">📰</span>
                <span>"每周一 9:00 发送新闻简报到飞书群"</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 对比表 -->
        <div class="comparison-card">
          <h4>📊 对比一览</h4>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>维度</th>
                <th>💓 Heartbeat</th>
                <th>⏰ Cron</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>运行上下文</td>
                <td>主会话内（有对话历史）</td>
                <td>隔离运行（无上下文）</td>
              </tr>
              <tr>
                <td>时间精度</td>
                <td>宽松（~30 min）</td>
                <td>精确（9:00 AM sharp）</td>
              </tr>
              <tr>
                <td>能看对话历史</td>
                <td>✅</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>批量检查</td>
                <td>✅ 适合同时查多个事项</td>
                <td>❌ 单一任务</td>
              </tr>
              <tr>
                <td>静默模式</td>
                <td>✅ 可返回 HEARTBEAT_OK</td>
                <td>总是有输出</td>
              </tr>
              <tr>
                <td>推送到频道</td>
                <td>不直接推</td>
                <td>✅ 可以直接推</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- HEARTBEAT.md 示例 -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">📝</span>
            <div>
              <h4>Heartbeat 配置</h4>
              <span class="concept-subtitle">HEARTBEAT.md</span>
            </div>
          </div>
          <p class="concept-desc">
            在 HEARTBEAT.md 中定义心跳需要检查的事项，Agent 每次心跳时按清单执行。
          </p>
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

        <!-- 类比 -->
        <div class="analogy-card">
          <div class="analogy-icon">💡</div>
          <div class="analogy-content">
            <h4>打个比方</h4>
            <p>
              <strong>Heartbeat</strong> 像是你每天早上起床后，顺手检查一下邮箱、日历、天气——一次性搞定，不赶时间。<br>
              <strong>Cron</strong> 像是你设了个闹钟，到点就响，准时推送一条消息给你。
            </p>
          </div>
        </div>
        <!-- SubAgent -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">⚡</span>
            <div>
              <h4>SubAgent 核心机制</h4>
              <span class="concept-subtitle">分任务 · 并行执行 · 隔离上下文</span>
            </div>
          </div>
          <p class="concept-desc">
            SubAgent 的本质只有三件事：主 Agent 把任务拆出去，后台并行跑，每个 SubAgent 有独立 Session 互不干扰。
          </p>

          <div class="subagent-core">
            <div class="core-trait">
              <div class="trait-icon">📋</div>
              <div class="trait-label">分任务</div>
            </div>
            <div class="core-trait">
              <div class="trait-icon">⚙️</div>
              <div class="trait-label">并行执行</div>
            </div>
            <div class="core-trait">
              <div class="trait-icon">🔒</div>
              <div class="trait-label">独立 Session</div>
            </div>
          </div>

          <div class="flow-diagram">
            <h4>SubAgent 三大机制</h4>
            <MermaidChart :diagram="subagentDiagram" />
          </div>

          <div class="subagent-mechanism">
            <div class="mechanism-card">
              <div class="mechanism-header">
                <span class="mechanism-badge">1</span>
                <h5>Delegation 任务委托</h5>
              </div>
              <p class="mechanism-desc">
                一个复杂任务 → 拆成多个子任务 → 分给多个 SubAgent 各干各的。主 Agent 只管派发和回收结果。
              </p>
              <div class="example-list">
                <div class="example-item">
                  <span class="example-icon">📤</span>
                  <span>"把这 10 个文件分别重写，每个交一个 subagent 负责"</span>
                </div>
              </div>
            </div>

            <div class="mechanism-card">
              <div class="mechanism-header">
                <span class="mechanism-badge">2</span>
                <h5>Parallelism 并行执行</h5>
              </div>
              <p class="mechanism-desc">
                多个 SubAgent 同时启动、同时跑任务，不用排队等上一个做完。效率翻倍，速度更快。
              </p>
              <div class="example-list">
                <div class="example-item">
                  <span class="example-icon">⏱️</span>
                  <span>"同时启动 3 个 subagent 分析数据、写文档、查 bug，全部完成后汇总"</span>
                </div>
              </div>
            </div>

            <div class="mechanism-card">
              <div class="mechanism-header">
                <span class="mechanism-badge">3</span>
                <h5>Isolation 上下文隔离</h5>
              </div>
              <p class="mechanism-desc">
                每个 SubAgent 拥有自己独立的 Session，不共享上下文。避免任务之间互相污染或泄漏。
              </p>
              <div class="example-list">
                <div class="example-item">
                  <span class="example-icon">🔐</span>
                  <span>"SubAgent A 的对话历史 SubAgent B 看不到，主 Agent 负责收拢"</span>
                </div>
              </div>
            </div>
          </div>

          <div class="analogy-card">
            <div class="analogy-icon">💡</div>
            <div class="analogy-content">
              <h4>打个比方</h4>
              <p>
                SubAgent 就是主 Agent 的"分身术"——<strong>Delegation</strong> 像主管把任务派给下属，<strong>Parallelism</strong> 像几个人同时干活比一个人快，<strong>Isolation</strong> 像每人一间独立办公室不互相打扰。
              </p>
            </div>
          </div>
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

        <!-- Agent 设计模式 -->
        <div class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">🏗️</span>
            <div>
              <h4>Agent 设计模式</h4>
              <span class="concept-subtitle">一个能力域 = 一个 Agent，多个任务 = 多 Session</span>
            </div>
          </div>
          <p class="concept-desc">
            最佳实践不是固定"一个 Agent 或多个 Agent"，而是根据能力域来划分。
          </p>

          <div class="dual-card">
            <!-- 方案 A -->
            <div class="concept-card">
              <div class="concept-header">
                <span class="concept-icon">🟢</span>
                <div>
                  <h4>方案 A：一个 Agent + 多个 Session</h4>
                  <span class="concept-subtitle">推荐默认方案</span>
                </div>
              </div>
              <p class="concept-desc">
                同一领域、工具差不多、只是任务不同。共享工具、Skills、Workspace，仅做任务隔离。
              </p>
              <div class="agent-design-flow">
                <div class="design-center">
                  <div class="design-icon">🤖</div>
                  <div class="design-label">General Assistant</div>
                </div>
                <div class="design-branches">
                  <div class="design-branch">
                    <span class="branch-icon">💬</span>
                    <span>Session A（新闻搜索）</span>
                  </div>
                  <div class="design-branch">
                    <span class="branch-icon">📄</span>
                    <span>Session B（生成 PDF）</span>
                  </div>
                  <div class="design-branch">
                    <span class="branch-icon">📊</span>
                    <span>Session C（生成 PPT）</span>
                  </div>
                </div>
              </div>
              <div class="design-features">
                <div class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span><strong>共享工具 / Skills</strong></span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span><strong>共享 Workspace</strong>（文件系统共用）</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span><strong>仅任务隔离</strong>（Context 独立）</span>
                </div>
              </div>
              <div class="design-pros">
                <h5>优势</h5>
                <p>成本低、Context 可复用、不需要重复加载 Skill</p>
              </div>
            </div>

            <!-- 方案 B -->
            <div class="concept-card">
              <div class="concept-header">
                <span class="concept-icon">🔵</span>
                <div>
                  <h4>方案 B：多个 Agent + 多个 Session</h4>
                  <span class="concept-subtitle">OpenClaw 工程化风格</span>
                </div>
              </div>
              <p class="concept-desc">
                完全不同的能力域、安全要求高、Tool 差异大。Skill、Prompt、Workspace 全部独立。
              </p>
              <div class="agent-design-flow">
                <div class="design-centers">
                  <div class="design-center small">
                    <div class="design-icon">📰</div>
                    <div class="design-label">News Agent</div>
                    <div class="design-session">Session A</div>
                  </div>
                  <div class="design-center small">
                    <div class="design-icon">📄</div>
                    <div class="design-label">PDF Agent</div>
                    <div class="design-session">Session B</div>
                  </div>
                  <div class="design-center small">
                    <div class="design-icon">📊</div>
                    <div class="design-label">PPT Agent</div>
                    <div class="design-session">Session C</div>
                  </div>
                </div>
              </div>
              <div class="design-features">
                <div class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span><strong>Skill 独立</strong>（各自配置）</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span><strong>Prompt 独立</strong>（SOUL.md 隔离）</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span><strong>Workspace 隔离</strong>（/workspace/news/ 等）</span>
                </div>
              </div>
              <div class="design-pros">
                <h5>优势</h5>
                <p>隔离强、更安全、更稳定、防交叉污染</p>
              </div>
            </div>
          </div>

          <!-- Workspace 对比 -->
          <div class="comparison-card">
            <h4>📊 Workspace 共享 vs 隔离</h4>
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>维度</th>
                  <th>🟢 共享 Workspace</th>
                  <th>🔵 隔离 Workspace</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>文件系统</td>
                  <td>共用一个目录</td>
                  <td>各 Agent 独立目录（/workspace/news/ 等）</td>
                </tr>
                <tr>
                  <td>Session Context</td>
                  <td>各自独立</td>
                  <td>各自独立</td>
                </tr>
                <tr>
                  <td>适用场景</td>
                  <td>同一领域、任务不同（70% 场景）</td>
                  <td>高安全、权限隔离、防污染</td>
                </tr>
                <tr>
                  <td>类比</td>
                  <td>所有人在同一项目目录，各自有"工作记录"</td>
                  <td>每人一间独立办公室，文件互不访问</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="analogy-card">
            <div class="analogy-icon">💡</div>
            <div class="analogy-content">
              <h4>选择建议</h4>
              <p>
                <strong>默认选方案 A</strong>（一个 Agent + 多个 Session），因为大多数场景是同一领域的不同任务，共享工具和技能更经济。<br>
                <strong>安全或差异大时选方案 B</strong>（多个 Agent），比如新闻采集和财务分析需要完全不同的权限和工具链。
              </p>
            </div>
          </div>
        </div>

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
        <!-- 场景 00: 环境准备 -->
        <div v-show="activeScenario === 'scenario00'" class="tab-panel">
          <div class="scenario-content">
            <div class="scenario-header">
              <span class="scenario-badge">SCENE 00</span>
              <h3>环境准备 —— 从零搭建 OpenClaw</h3>
            </div>
            <p class="scenario-intro">OpenClaw 支持多种部署方式，覆盖 macOS、Linux、WSL 和 Docker。模型 API 可接入国内外主流大模型厂商。</p>

            <!-- 第一部分：部署方式 -->
            <div class="scenario-section">
              <h4>🖥️ 部署方式</h4>

              <div class="deploy-cards">
                <div class="deploy-card">
                  <div class="deploy-icon">🍎</div>
                  <h5>macOS 本地部署</h5>
                  <p>适用于 Apple Silicon (M1/M2/M3/M4) 或 Intel Mac</p>
                  <div class="deploy-steps">
                    <div class="step"><span class="step-num">1</span><span>安装 Node.js 22+</span></div>
                    <div class="step"><span class="step-num">2</span><span>一行命令安装</span></div>
                    <div class="step"><span class="step-num">3</span><span>引导式配置</span></div>
                  </div>
                  <div class="code-block">
                    <div class="code-header"><span class="code-title">安装命令</span><span class="code-lang">Shell</span></div>
                    <pre><code># 一键安装（推荐）
curl -sSL https://openclaw.ai/install | sh

# 或 npm 安装
npm install -g openclaw@latest

# 启动并进入引导配置
openclaw</code></pre>
                  </div>
                </div>

                <div class="deploy-card">
                  <div class="deploy-icon">🐧</div>
                  <h5>Linux 本地部署</h5>
                  <p>适用于 Ubuntu / Debian / CentOS / Arch 等主流发行版</p>
                  <div class="deploy-steps">
                    <div class="step"><span class="step-num">1</span><span>安装 Node.js 22+</span></div>
                    <div class="step"><span class="step-num">2</span><span>一行命令安装</span></div>
                    <div class="step"><span class="step-num">3</span><span>配置防火墙与端口</span></div>
                  </div>
                  <div class="code-block">
                    <div class="code-header"><span class="code-title">安装命令</span><span class="code-lang">Shell</span></div>
                    <pre><code># 一键安装
curl -sSL https://openclaw.ai/install | sh

# 或 npm 安装
npm install -g openclaw@latest

# 启动
openclaw</code></pre>
                  </div>
                </div>

                <div class="deploy-card">
                  <div class="deploy-icon">🪟</div>
                  <h5>Windows WSL2 部署</h5>
                  <p>通过 WSL2 在 Windows 10/11 上运行</p>
                  <div class="deploy-steps">
                    <div class="step"><span class="step-num">1</span><span>安装 WSL2 (Ubuntu)</span></div>
                    <div class="step"><span class="step-num">2</span><span>在 WSL2 内安装</span></div>
                    <div class="step"><span class="step-num">3</span><span>浏览器访问 Web UI</span></div>
                  </div>
                  <div class="code-block">
                    <div class="code-header"><span class="code-title">安装命令</span><span class="code-lang">PowerShell</span></div>
                    <pre><code># 安装 WSL2
wsl --install

# 进入 WSL2 Ubuntu 后安装 OpenClaw
curl -sSL https://openclaw.ai/install | sh

# 启动
openclaw</code></pre>
                  </div>
                </div>

                <div class="deploy-card">
                  <div class="deploy-icon">🐳</div>
                  <h5>Docker 部署</h5>
                  <p>适用于服务器、云服务器或任何有 Docker 的环境</p>
                  <div class="deploy-steps">
                    <div class="step"><span class="step-num">1</span><span>拉取镜像</span></div>
                    <div class="step"><span class="step-num">2</span><span>配置 docker-compose</span></div>
                    <div class="step"><span class="step-num">3</span><span>启动并访问 18789 端口</span></div>
                  </div>
                  <div class="code-block">
                    <div class="code-header"><span class="code-title">Docker 命令</span><span class="code-lang">Shell</span></div>
                    <pre><code># 克隆仓库并运行
git clone https://github.com/openclaw/openclaw.git
cd openclaw
./docker-setup.sh
docker compose up -d

# 或 Docker Hub 镜像
docker pull alpine/openclaw:latest</code></pre>
                  </div>
                </div>

                <div class="deploy-card">
                  <div class="deploy-icon">☁️</div>
                  <h5>国内云厂商部署</h5>
                  <p>阿里云、腾讯云、华为云等云服务器</p>
                  <div class="deploy-steps">
                    <div class="step"><span class="step-num">1</span><span>购买云服务器（建议 2C4G+）</span></div>
                    <div class="step"><span class="step-num">2</span><span>SSH 登录后安装</span></div>
                    <div class="step"><span class="step-num">3</span><span>配置安全组开放 18789 端口</span></div>
                  </div>
                  <div class="code-block">
                    <div class="code-header"><span class="code-title">推荐配置</span></div>
                    <pre><code># 最低配置
CPU: 2 vCPU
内存: 4GB+ (推荐 8GB)
存储: 40GB SSD
系统: Ubuntu 22.04 LTS</code></pre>
                  </div>
                </div>

                <div class="deploy-card">
                  <div class="deploy-icon">⚙️</div>
                  <h5>系统要求</h5>
                  <p>OpenClaw 的资源需求很低，轻装上阵</p>
                  <table class="req-table">
                    <thead>
                      <tr><th>项目</th><th>最低</th><th>推荐</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Node.js</td><td>22.14+</td><td>Node.js 24</td></tr>
                      <tr><td>CPU</td><td>1-2 vCPU</td><td>M4 / i5-13400 / R5 7600</td></tr>
                      <tr><td>内存</td><td>2 GB</td><td>16-32 GB</td></tr>
                      <tr><td>存储</td><td>20 GB</td><td>40 GB SSD</td></tr>
                      <tr><td>端口</td><td>18789</td><td>仅本地 / 内网</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="key-insight" style="margin-top: 16px;">
                <div class="insight-icon">🔒</div>
                <div class="insight-content">
                  <h4>安全提醒</h4>
                  <ul>
                    <li>不要将 18789 端口直接暴露到公网</li>
                    <li>建议使用 Tailscale、反向代理（nginx + SSL）进行远程访问</li>
                    <li>配置防火墙，仅允许信任的 IP 访问</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 第二部分：模型 API -->
            <div class="scenario-section">
              <h4>🤖 模型 API 接入</h4>
              <p class="section-intro">OpenClaw 兼容 OpenAI API 格式，可接入国内外主流大模型。配置 API Key 即可使用。</p>

              <h5 style="margin: 20px 0 12px; color: #1e40af;">国际厂商</h5>
              <div class="provider-grid">
                <div class="provider-card">
                  <div class="provider-icon">🟢</div>
                  <div class="provider-info">
                    <h6>OpenAI</h6>
                    <p>GPT-5.5 · GPT-5.4 · o3-pro</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🟣</div>
                  <div class="provider-info">
                    <h6>Anthropic</h6>
                    <p>Opus 4 · Sonnet 4 · Haiku 4.5</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🔵</div>
                  <div class="provider-info">
                    <h6>Google Gemini</h6>
                    <p>Gemini 3.1 Pro · Gemini 3.1 Flash Lite · Gemini 3</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🟠</div>
                  <div class="provider-info">
                    <h6>Meta Llama</h6>
                    <p>Llama 4 Maverick · Llama 4 Scout</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">⚫</div>
                  <div class="provider-info">
                    <h6>xAI</h6>
                    <p>Grok 4.20 · Grok 4 Fast</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🔷</div>
                  <div class="provider-info">
                    <h6>Mistral</h6>
                    <p>Large 3 · Ministral 3 · Small 4</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🟤</div>
                  <div class="provider-info">
                    <h6>Cohere</h6>
                    <p>Command R+ · Command R · Command</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">⚡</div>
                  <div class="provider-info">
                    <h6>Groq</h6>
                    <p>超高速推理，支持 Llama / Mixtral 等开源模型</p>
                  </div>
                </div>
              </div>

              <h5 style="margin: 20px 0 12px; color: #dc2626;">国内厂商</h5>
              <div class="provider-grid">
                <div class="provider-card">
                  <div class="provider-icon">🔶</div>
                  <div class="provider-info">
                    <h6>阿里通义千问 / DashScope</h6>
                    <p>Qwen3.6-Flash · Qwen3.5-Plus · Qwen3-Max-Thinking</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🔥</div>
                  <div class="provider-info">
                    <h6>DeepSeek / 深度求索</h6>
                    <p>DeepSeek V4 · DeepSeek V4-Pro-Max</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🔴</div>
                  <div class="provider-info">
                    <h6>百度文心一言 / ERNIE</h6>
                    <p>ERNIE 5.0 · ERNIE 4.5 · ERNIE X1.1</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🔷</div>
                  <div class="provider-info">
                    <h6>智谱清言 / Zhipu AI</h6>
                    <p>GLM-5.1 · GLM-5</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🌙</div>
                  <div class="provider-info">
                    <h6>月之暗面 / Moonshot</h6>
                    <p>Kimi K2.6 · Kimi K2.5</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">⭐</div>
                  <div class="provider-info">
                    <h6>阶跃星辰 / StepFun</h6>
                    <p>Step 3.5 Flash · Step Audio R1.1</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🐧</div>
                  <div class="provider-info">
                    <h6>腾讯混元 / Hunyuan</h6>
                    <p>Hunyuan 3.0 · Hunyuan 2.0</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🔥</div>
                  <div class="provider-info">
                    <h6>字节跳动 / 火山引擎</h6>
                    <p>Doubao 2.0 · Seedance 2.0 · Seedream 5.0</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🕷️</div>
                  <div class="provider-info">
                    <h6>MiniMax</h6>
                    <p>M2.7 · M2.5</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">💊</div>
                  <div class="provider-info">
                    <h6>零一万物 / 01.ai</h6>
                    <p>Yi-Large · Yi-Medium · Yi-Spark</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🌊</div>
                  <div class="provider-info">
                    <h6>百川智能 / Baichuan</h6>
                    <p>Baichuan 4</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">💎</div>
                  <div class="provider-info">
                    <h6>讯飞星火 / iFlytek Spark</h6>
                    <p>Spark X2 · Spark X1</p>
                  </div>
                </div>
                <div class="provider-card">
                  <div class="provider-icon">🌌</div>
                  <div class="provider-info">
                    <h6>昆仑万维 / Skywork</h6>
                    <p>Skywork 系列模型</p>
                  </div>
                </div>
              </div>

              <div class="code-block" style="margin-top: 16px;">
                <div class="code-header">
                  <span class="code-title">通用 API 配置（兼容 OpenAI 格式）</span>
                  <span class="code-lang">JSON</span>
                </div>
                <pre><code>{
  "provider": "openai-compatible",
  "api_url": "https://api.openai.com/v1",
  "api_key": "sk-...",
  "model": "gpt-5.5"
}</code></pre>
              </div>

              <div class="key-insight" style="margin-top: 16px;">
                <div class="insight-icon">💡</div>
                <div class="insight-content">
                  <h4>接入提示</h4>
                  <ul>
                    <li>所有厂商 API 均兼容 OpenAI 格式，只需替换 <code>api_url</code> 和 <code>api_key</code></li>
                    <li>国内厂商无需科学上网，API 响应更快；国际厂商需要网络代理</li>
                    <li>建议配置多厂商 fallback，避免单点故障</li>
                    <li>DeepSeek 性价比极高，适合大批量调用场景</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

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
import { useRouter } from 'vue-router'
import MermaidChart from '../components/MermaidChart.vue'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('python', python)
hljs.registerLanguage('json', json)

const router = useRouter()

const activeCategory = ref('architecture')
const activeTab = ref('execution')
const activeScenario = ref('scenario00')

const scenarios = [
  { id: 'scenario00', name: '环境准备' },
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

// 代码示例 - 来自 claw0 教程
const sessionCode = `# sessions/user_123.jsonl
{"type": "user", "content": "帮我检查一下最近的邮件", "timestamp": "2024-01-01T10:00:00Z"}
{"type": "assistant", "content": [{"type": "text", "text": "好的，我来帮你检查邮件。"}], "tool_use": {"id": "tool_001", "name": "read_emails"}}
{"type": "tool_result", "tool_use_id": "tool_001", "content": "[{\"from\": 'boss@company.com', 'subject': '项目进度'}]"}
{"type": "assistant", "content": [{"type": "text", "text": "你有1封未读邮件，来自老板，主题是项目进度。"}]}
{"type": "user", "content": "帮我总结一下内容", "timestamp": "2024-01-01T10:02:00Z"}`

const highlightedSession = computed(() => hljs.highlight(sessionCode, { language: 'json' }).value)

// SubAgent diagram
const subagentDiagram = `flowchart TD
    Main[主 Agent] -->|拆分派发| T1[SubTask A]
    Main -->|拆分派发| T2[SubTask B]
    Main -->|拆分派发| T3[SubTask C]
    T1 --> A1[SubAgent A]
    T2 --> A2[SubAgent B]
    T3 --> A3[SubAgent C]
    A1 --> S1[独立 Session A]
    A2 --> S2[独立 Session B]
    A3 --> S3[独立 Session C]
    A1 -->|回传结果| R[主 Agent 汇总]
    A2 -->|回传结果| R
    A3 -->|回传结果| R`

// Mermaid 图表定义
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

// 代码示例 - 基础设施层
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

/* Agent Design Patterns */
.agent-design-flow {
  padding: 20px 0;
  margin: 16px 0;
}
.design-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 14px;
  border: 2px solid #f59e0b;
  margin-bottom: 12px;
}
.design-center.small {
  padding: 12px 16px;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 2px solid #3b82f6;
  border-radius: 10px;
}
.design-icon {
  font-size: 28px;
  margin-bottom: 4px;
}
.design-label {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
}
.design-session {
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
}
.design-branches {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 32px;
  border-left: 2px dashed #cbd5e1;
  padding-left: 16px;
}
.design-centers {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
.design-branch {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #475569;
}
.branch-icon {
  font-size: 18px;
}
.design-features {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #475569;
}
.feature-icon {
  font-size: 14px;
}
.design-pros {
  margin-top: 12px;
  padding: 10px 12px;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-radius: 8px;
  border: 1px solid #10b981;
}
.design-pros h5 {
  font-size: 12px;
  font-weight: 600;
  color: #065f46;
  margin: 0 0 4px;
}
.design-pros p {
  font-size: 11px;
  color: #047857;
  margin: 0;
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

/* Dual Card Layout (Heartbeat vs Cron) */
.dual-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.spec-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 12px 0;
}

.spec-item {
  display: flex;
  gap: 6px;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.4;
}

.spec-label {
  font-weight: 600;
  color: #4b5563;
  white-space: nowrap;
}

.spec-value {
  color: #6b7280;
}

.example-list {
  margin-top: 12px;
}

.example-list h5 {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
}

.example-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 8px 12px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 8px;
  margin-bottom: 6px;
  font-size: 12px;
  color: #78350f;
  line-height: 1.5;
}

.example-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* Comparison Table */
.comparison-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid #e5e7eb;
}

.comparison-card h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.comparison-table th,
.comparison-table td {
  padding: 10px 14px;
  text-align: left;
  border: 1px solid #e5e7eb;
}

.comparison-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.comparison-table td {
  color: #4b5563;
}

.comparison-table tr:nth-child(even) td {
  background: #f9fafb;
}

/* Analogy Card */
.analogy-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-radius: 12px;
  border: 1px solid #10b981;
  margin-bottom: 20px;
}

.analogy-card .analogy-icon {
  font-size: 24px;
}

.analogy-card .analogy-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: #065f46;
  margin: 0 0 8px 0;
}

.analogy-card .analogy-content p {
  font-size: 13px;
  color: #047857;
  margin: 0;
  line-height: 1.7;
}

/* SubAgent Core Traits */
.subagent-core {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 20px 0;
}

.core-trait {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  border-radius: 12px;
  border: 1px solid #c7d2fe;
}

.core-trait .trait-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.core-trait .trait-label {
  font-size: 13px;
  font-weight: 600;
  color: #3730a3;
}

/* SubAgent Mechanism Cards */
.subagent-mechanism {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.mechanism-card {
  padding: 18px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.mechanism-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.mechanism-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
}

.mechanism-header h5 {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.mechanism-desc {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 10px;
}

/* Session Trait Description */
.session-trait-desc {
  padding: 0 20px;
  margin-top: 12px;
}
.session-trait-desc p {
  font-size: 13px;
  color: #475569;
  line-height: 1.8;
  margin: 6px 0;
}

/* Context Guard Steps */
.context-guard-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
}
.guard-step {
  padding: 14px 16px;
  background: #f8fafc;
  border-radius: 10px;
  border-left: 4px solid #4f46e5;
}
.guard-step.fail {
  border-left-color: #ef4444;
  background: #fef2f2;
}
.guard-step-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.guard-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  color: white;
  padding: 0 6px;
}
.guard-badge.attempt-0 { background: #4f46e5; }
.guard-badge.attempt-1 { background: #f59e0b; }
.guard-badge.attempt-2 { background: #ef4444; }
.guard-badge.attempt-fail { background: #dc2626; }
.guard-step-header h5 {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}
.guard-step-desc {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

/* Compaction Diagram */
.compaction-diagram {
  margin-top: 20px;
}
.compaction-diagram h5 {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px;
}
.compaction-visual {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.compact-region {
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.compact-region .region-label {
  font-size: 13px;
  font-weight: 600;
}
.compact-region .region-detail {
  font-size: 12px;
  color: #64748b;
  font-family: 'SF Mono', monospace;
}
.compact-region.compressed {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
}
.compact-region.compressed .region-label { color: #92400e; }
.compact-region.middle {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
}
.compact-region.middle .region-label { color: #334155; }
.compact-region.keep {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border: 1px solid #22c55e;
}
.compact-region.keep .region-label { color: #166534; }

/* Deploy Cards */
.deploy-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.deploy-card {
  background: white;
  border-radius: 14px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.deploy-card .deploy-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.deploy-card h5 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.deploy-card > p {
  font-size: 11px;
  color: #6b7280;
  margin: 0 0 12px 0;
}

.deploy-steps {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.deploy-steps .step {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: #6b7280;
}

.deploy-steps .step-num {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #7c3aed;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
}

.req-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.req-table th,
.req-table td {
  padding: 8px 10px;
  text-align: left;
  border: 1px solid #e5e7eb;
}

.req-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.req-table td {
  color: #4b5563;
}

/* Provider Cards */
.provider-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.provider-card {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.provider-card .provider-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.provider-card .provider-info h6 {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.provider-card .provider-info p {
  font-size: 11px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

/* Cross Link Card */
.cross-link-card {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 16px;
  border: 2px solid #3b82f6;
  align-items: flex-start;
}

.cross-link-card .cross-link-icon {
  font-size: 32px;
}

.cross-link-card .cross-link-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 8px 0;
}

.cross-link-card .cross-link-content p {
  font-size: 14px;
  color: #1e3a5f;
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.cross-link-button {
  display: inline-block;
  padding: 10px 24px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cross-link-button:hover {
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

/* 响应式 */
@media (max-width: 1024px) {
  .tools-grid,
  .infra-grid,
  .provider-grid {
    grid-template-columns: 1fr;
  }

  .deploy-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .dual-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .deploy-cards {
    grid-template-columns: 1fr;
  }

  .layer-tabs {
    flex-direction: column;
  }

  .layer-tab {
    min-width: auto;
  }

  .spec-list {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 12px;
  }

  .sessions-flow {
    flex-direction: column;
  }

  .sessions-flow .flow-arrow {
    transform: rotate(90deg);
  }

  .subagent-core {
    flex-direction: column;
    align-items: center;
  }

  .subagent-mechanism {
    gap: 12px;
  }

  .context-guard-steps {
    gap: 10px;
  }

  .compact-region {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .session-trait-desc {
    padding: 0 12px;
  }

  .design-centers {
    flex-direction: column;
    align-items: center;
  }

  .design-branches {
    margin-left: 16px;
  }
}
</style>
