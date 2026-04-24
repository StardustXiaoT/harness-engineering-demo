# Harness Engineering 演示页面

Harness Engineering 的架构演进 - 交互式演示页面

## 更新内容

### v1.3.0 (2026-04-24)

#### Multi-Agent 模块完善

扩充了 Level 5 Multi-Agent 架构的三个核心模块，内容基于 learn-claude-code 原始文档：

1. **Agent Teams（持久化队友 + 异步邮箱）**
   - Teammate 生命周期：spawn → WORKING → IDLE → SHUTDOWN
   - 通信系统架构：
     - `config.json`：团队名册 + 状态追踪
     - `inbox/*.jsonl`：每个队友一个追加写入的邮箱
     - `send()` / `read_inbox()` 机制
   - 核心代码：`TeammateManager` 和 `MessageBus` 实现

2. **Teams Protocol（请求 - 响应握手协议）**
   - **Shutdown Protocol**：关闭握手机制（request_id 关联）
   - **Plan Approval Protocol**：计划审批协议
   - **共享 FSM 状态机**：pending → approved/rejected
   - 统一的请求 - 响应模式代码示例

3. **Autonomous Agents（自主认领任务的队友）**
   - 两个执行阶段：WORK 阶段和 IDLE 阶段
   - IDLE 轮询机制：5s 间隔轮询 inbox 和任务板
   - 任务自动认领：扫描 `.tasks/` 寻找未认领任务
   - 身份重新注入：上下文压缩后重新插入身份块
   - 核心代码：`_loop()` 和 `_idle_poll()` 实现

4. **Worktree Isolation（任务级目录隔离）**
   - Control Plane + Execution Plane 架构
   - 任务-Worktree 绑定机制
   - 生命周期 4 步骤：创建任务 → 创建 worktree → 执行命令 → 清理
   - 事件流：`.worktrees/events.jsonl`
   - 状态恢复：崩溃后从文件重建
   - 核心代码：`WorktreeManager` 实现

#### 技术实现
- 新增 Mermaid 流程图：Agent Teams 架构、Autonomous 生命周期、Worktree 架构
- 新增代码示例高亮：TeammateManager、WorktreeManager、Protocol 处理函数
- 响应式样式优化：适配移动端的卡片布局

---

### v1.2.0 (2026-04-23)

#### 新增页面

5. **Claude Code 页面 (/claude-code)**
   - 讲解 Harness Engineering 概念的完整演示页面
   - 5 层架构体系：

   | 层级 | 名称 | 说明 |
   |------|------|------|
   | Level 1 | Execution | 执行内核 - Agent Loop 核心循环模式 |
   | Level 2 | Capability | 能力层 - Tool Use 工具调用 + Skills 渐进式知识披露 |
   | Level 3 | Planning | 规划层 - Todo/Plan 任务追踪 + Task Graph 依赖图 |
   | Level 4 | Context | 上下文层 - 三层压缩策略 (micro_compact / auto_compact / compact tool) |
   | Level 5 | Multi-Agent | 多代理与运行时 - Subagents / Background Tasks / Agent Teams / Worktree Isolation |

   - **核心特性**：
     - Agent Loop 流程图与代码并排展示
     - JSON 结构展示（多轮调用、Tool Request、Tool Result）
     - Mermaid 流程图可视化（Task Graph、Context Compression、Worktree Isolation）
     - Skills 两层架构展示（Layer 1 系统提示 + Layer 2 按需加载）
     - Subagents 上下文隔离机制详解
     - Background Tasks 源码展示（4 步工作原理）

#### 技术实现
- 新增依赖：`highlight.js`（代码高亮）、`mermaid`（流程图渲染）
- 新增组件：`MermaidChart.vue`（客户端动态渲染 Mermaid 图表）
- 视图组件：`ClaudeCodeView.vue`（主页面，包含 5 层架构 Tab 导航）

### v1.1.0 (2025-04-22)

#### 新增页面

1. **首页 (/)**
   - 标题：Harness Engineering 的架构演进
   - 副标题：From Prompting → Orchestrating Intelligence
   - 7 个分类的词云图展示 AI 发展术语
   - 词云分类包括：Agentic AI、Harness Engineering、Tool & Skills、Execution、Tools、AI UI、Workflow

2. **AI 发展页面 (/ai-evolution)**
   - 模型硬伤背景提示
   - Tab 导航切换（Prompt Engineering / Context Engineering / Harness Engineering）
   - 各阶段详细内容卡片：
     - **Prompt Engineering** - Prompt 构建流程图、场景案例（代码审查、数据分析）
     - **Context Engineering** - 上下文构建流程图、场景案例（长对话管理、RAG 知识问答）
     - **Harness Engineering** - OpenAI 实践案例，3 个关键要素（环境、约束、反馈）
   - 底部三层包含关系嵌套可视化图

3. **Agent 页面 (/agent)**
   - 核心观点：Agent 是模型，不是框架
   - Agent 框架介绍：Coze、Dify、LangGraph、AutoGen、CrewAI
   - 真正的 Agent 概念 vs Agent 框架对比
   - 构建 Agent 的两种方式：训练模型 vs 构建 Harness

4. **Harness 页面 (/harness)**
   - 核心比喻：Model 是马，Harness 是缰绳 + 马鞍 + 道路系统
   - Harness 组成详解：
     - Tools（工具）：文件读写、Shell、网络、数据库、浏览器等
     - Knowledge（知识）：产品文档、领域资料、API 规范等
     - Observation（感知）：Git Diff、错误日志、测试结果等
     - Action（行动接口）：CLI 命令、API 调用、UI 交互等
     - Permissions（权限控制）：沙箱隔离、审批流程、信任边界等
   - Harness vs Prompt vs Context 对比表

#### 技术实现
- 技术栈：Vite + Vue 3 + Vue Router
- 设计风格：浅色现代风，卡片式布局
- 交互方式：Tab 切换 + 页面路由
- 图标：各框架真实 Logo

## 启动方式

```bash
# 进入项目目录
cd harness-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

启动后访问：http://localhost:5173/

## 页面导航

| 路径 | 页面 | 说明 |
|------|------|------|
| / | 首页 | 词云图展示 AI 发展术语 |
| /ai-evolution | AI 发展 | 三阶段演进：Prompt → Context → Harness |
| /agent | Agent | 澄清 Agent 概念 vs Agent 框架 |
| /harness | Harness | 理解 Harness 的组成和作用 |
| /claude-code | Claude Code | Harness Engineering 5 层架构详解 |

## 项目结构

```
harness-demo/
├── public/
│   └── icons/                  # 框架图标
├── src/
│   ├── components/
│   │   ├── MenuBar.vue          # 菜单栏组件
│   │   └── MermaidChart.vue     # Mermaid 流程图渲染组件（客户端动态加载）
│   ├── router/
│   │   └── index.js             # 路由配置
│   ├── views/
│   │   ├── HomeView.vue         # 首页（词云图）
│   │   ├── EvolutionView.vue    # AI 发展页面
│   │   ├── AgentView.vue        # Agent 页面
│   │   ├── HarnessView.vue      # Harness 页面
│   │   └── ClaudeCodeView.vue   # Claude Code 页面（5 层架构）
│   ├── App.vue                  # 根组件
│   ├── main.js                  # 入口文件
│   └── style.css                # 全局样式
├── index.html
├── package.json
└── vite.config.js
```

## 后续计划

- 添加交互动画效果
- 优化移动端适配
- 增加更多演示模块
