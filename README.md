# Harness Engineering 演示页面

Harness Engineering 的架构演近 - 交互式演示页面

## 更新内容

### v1.0.0 (2025-04-22)

#### 新增页面

1. **首页 (/)**
   - 标题：Harness Engineering 的架构演近
   - 副标题：From Prompting → Orchestrating Intelligence
   - 7 个分类的词云图展示 AI 发展术语
   - 词云分类包括：Agentic AI、Harness Engineering、Tool & Skills、Execution、Tools、AI UI、Workflow

2. **AI 发展页面 (/ai-evolution)**
   - LLM 发展时间线进度条
   - 4 个核心模块卡片：
     - **模型硬伤** - LLM 的 4 个局限性（幻觉、上下文限制、缺乏真实世界感知、目标漂移）
     - **Prompt Engineering** - 表达层问题解决，核心技巧展示
     - **Context Engineering** - 信息层问题解决，上下文组成与挑战
     - **Harness Engineering** - OpenAI 实践案例，3 个关键要素（环境、约束、反馈）

#### 技术实现
- 技术栈：Vite + Vue 3 + Vue Router
- 设计风格：浅色现代风
- 交互方式：页面路由切换
- 组件：卡片式布局，渐变配色

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

## 项目结构

```
harness-demo/
├── src/
│   ├── components/
│   │   └── MenuBar.vue        # 菜单栏组件
│   ├── router/
│   │   └── index.js           # 路由配置
│   ├── views/
│   │   ├── HomeView.vue       # 首页（词云图）
│   │   └── EvolutionView.vue  # AI 发展页面
│   ├── App.vue                # 根组件
│   ├── main.js                # 入口文件
│   └── style.css              # 全局样式
├── index.html
├── package.json
└── vite.config.js
```

## 后续计划

- 添加交互动画效果
- 优化移动端适配
- 增加更多演示模块
