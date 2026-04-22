# Harness Engineering 演示页面

Harness Engineering 的架构演近 - 交互式演示页面

## 更新内容

### v1.1.0 (2025-04-22)

#### 新增页面

1. **首页 (/)**
   - 标题：Harness Engineering 的架构演近
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

## 项目结构

```
harness-demo/
├── public/
│   └── icons/                  # 框架图标
├── src/
│   ├── components/
│   │   └── MenuBar.vue          # 菜单栏组件
│   ├── router/
│   │   └── index.js             # 路由配置
│   ├── views/
│   │   ├── HomeView.vue         # 首页（词云图）
│   │   ├── EvolutionView.vue    # AI 发展页面
│   │   ├── AgentView.vue        # Agent 页面
│   │   └── HarnessView.vue      # Harness 页面
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
