<template>
  <div class="provider-page">
    <div class="page-header">
      <h1 class="page-title">主流 LLM API 供应商大全</h1>
      <p class="page-subtitle">国际 & 国内主流大语言模型 API 供应商及模型一览</p>
    </div>

    <!-- 使用说明 -->
    <div class="usage-tip">
      <div class="tip-icon">i</div>
      <div class="tip-content">
        <p>本文档整理了当前主流的 LLM API 供应商信息，包含 <strong>国际供应商</strong> 和 <strong>国内供应商</strong> 两大类，涵盖主要模型名称、简介及平台接入方式。数据截至 2026 年 4 月，模型版本可能持续更新，请以各供应商官方文档为准。</p>
      </div>
    </div>

    <!-- ========== 国际供应商 ========== -->
    <div class="section">
      <div class="section-header">
        <span class="section-number global">G</span>
        <h2 class="section-title">国际供应商（International Providers）</h2>
      </div>

      <div class="provider-list">
        <!-- OpenAI -->
        <div class="provider-card featured" v-for="(p, idx) in internationalProviders" :key="p.name">
          <div class="card-header">
            <div class="card-icon-row">
              <span class="card-icon">{{ p.icon }}</span>
              <div class="card-title-group">
                <h3 class="card-name">{{ p.name }}</h3>
                <a :href="p.url" target="_blank" class="card-url">{{ p.url }}</a>
              </div>
            </div>
            <span class="card-badge">{{ p.region }}</span>
          </div>
          <p class="card-desc">{{ p.description }}</p>
          <div class="models-section">
            <h4 class="models-title">主要模型：</h4>
            <div class="model-list">
              <div class="model-item" v-for="m in p.models" :key="m.name">
                <span class="model-name">{{ m.name }}</span>
                <span class="model-desc">{{ m.desc }}</span>
              </div>
            </div>
          </div>
          <div class="card-footer" v-if="p.apiEndpoint">
            <span class="footer-label">API 端点：</span>
            <code class="footer-code">{{ p.apiEndpoint }}</code>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 国内供应商 ========== -->
    <div class="section domestic-section">
      <div class="section-header">
        <span class="section-number cn">CN</span>
        <h2 class="section-title">国内供应商（China Providers）</h2>
      </div>

      <div class="provider-list">
        <div class="provider-card" v-for="(p, idx) in chinaProviders" :key="p.name">
          <div class="card-header">
            <div class="card-icon-row">
              <span class="card-icon">{{ p.icon }}</span>
              <div class="card-title-group">
                <h3 class="card-name">{{ p.name }}</h3>
                <a :href="p.url" target="_blank" class="card-url">{{ p.url }}</a>
              </div>
            </div>
            <span class="card-badge cn-badge">国内</span>
          </div>
          <p class="card-desc">{{ p.description }}</p>
          <div class="models-section">
            <h4 class="models-title">主要模型：</h4>
            <div class="model-list">
              <div class="model-item" v-for="m in p.models" :key="m.name">
                <span class="model-name">{{ m.name }}</span>
                <span class="model-desc">{{ m.desc }}</span>
              </div>
            </div>
          </div>
          <div class="card-footer" v-if="p.apiEndpoint">
            <span class="footer-label">API 端点：</span>
            <code class="footer-code">{{ p.apiEndpoint }}</code>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 快速对比表 ========== -->
    <div class="section">
      <div class="section-header">
        <span class="section-number">T</span>
        <h2 class="section-title">快速对比与选择建议</h2>
      </div>

      <div class="comparison-table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>维度</th>
              <th>国际供应商</th>
              <th>国内供应商</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>网络访问</td>
              <td>部分需要科学上网或海外服务器</td>
              <td>国内直连，延迟低，稳定</td>
            </tr>
            <tr>
              <td>定价</td>
              <td>美元计价，部分提供免费额度</td>
              <td>人民币计价，新用户提供大量免费额度</td>
            </tr>
            <tr>
              <td>中文理解</td>
              <td>主流模型中文能力较强</td>
              <td>针对中文优化，中文场景表现优异</td>
            </tr>
            <tr>
              <td>合规要求</td>
              <td>适合海外业务或数据出境场景</td>
              <td>符合国内数据合规要求，适合企业级应用</td>
            </tr>
            <tr>
              <td>推理模型</td>
              <td>OpenAI o 系列、Claude Thinking 等</td>
              <td>DeepSeek V4、Qwen3、GLM-5 等</td>
            </tr>
            <tr>
              <td>开源权重</td>
              <td>Meta Llama、Mistral 等提供开源</td>
              <td>通义千问、零一万物、百川等提供开源</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========== 集成建议 ========== -->
    <div class="section">
      <div class="section-header">
        <span class="section-number">S</span>
        <h2 class="section-title">多供应商集成建议</h2>
      </div>

      <div class="integration-tips">
        <div class="tip-card" v-for="tip in integrationTips" :key="tip.title">
          <span class="tip-card-icon">{{ tip.icon }}</span>
          <h4 class="tip-card-title">{{ tip.title }}</h4>
          <p class="tip-card-desc">{{ tip.content }}</p>
        </div>
      </div>

      <div class="code-example">
        <h4 class="code-title">代码示例：OpenAI 兼容接口统一调用</h4>
        <pre class="code-block"><code>import OpenAI from 'openai';

// 支持任意 OpenAI 兼容的 API 端点
const clients = {
  // 国际供应商
  openai: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
  anthropic: new OpenAI({
    baseURL: 'https://api.anthropic.com/v1',
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),
  // 国内供应商（通过 DashScope 等）
  qwen: new OpenAI({
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: process.env.DASHSCOPE_API_KEY,
  }),
  deepseek: new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: process.env.DEEPSEEK_API_KEY,
  }),
};

// 统一调用模式
async function chat(provider, model, messages) {
  const response = await clients[provider].chat.completions.create({
    model,
    messages,
  });
  return response.choices[0].message.content;
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const internationalProviders = [
  {
    name: 'OpenAI',
    icon: 'O',
    region: '美国',
    url: 'https://openai.com',
    apiEndpoint: 'https://api.openai.com/v1',
    description: '全球最知名的大语言模型公司之一，GPT 系列和 o 系列模型在推理、代码生成、多模态理解等方面处于行业领先地位。提供 Chat Completions API、Assistants API、Embeddings API 等。',
    models: [
      { name: 'GPT-4.1', desc: '最新一代通用模型，支持 1M 上下文窗口，指令遵循和长上下文理解能力显著提升' },
      { name: 'GPT-4o', desc: '多功能旗舰模型，支持文本、图像、语音多模态输入，性能和速度平衡优秀' },
      { name: 'o3', desc: '最新推理模型，在数学、科学和编码等深度推理任务中表现卓越' },
      { name: 'o3-mini', desc: '轻量推理模型，推理速度快、成本低，适合需要推理但不需要最强推理能力的场景' },
      { name: 'o1', desc: '初代推理模型，擅长深度思考、数学和科学推理' },
      { name: 'gpt-4o-mini', desc: '小型快速模型，性价比极高，适合日常对话和简单任务' },
    ],
  },
  {
    name: 'Anthropic',
    icon: 'A',
    region: '美国',
    url: 'https://www.anthropic.com',
    apiEndpoint: 'https://api.anthropic.com/v1',
    description: '以 Claude 系列模型闻名，主打安全和可靠性。Claude 模型在长上下文窗口（200K tokens）、工具调用、多模态推理方面表现突出。支持 OpenAI 兼容接口格式。',
    models: [
      { name: 'Claude Opus 4', desc: '最强旗舰模型，顶级推理和创造性写作能力，适合复杂分析任务' },
      { name: 'Claude Sonnet 4.6', desc: '性能与速度的最佳平衡，综合能力强大，性价比高' },
      { name: 'Claude Haiku 4.5', desc: '轻量快速模型，适合高并发、低延迟场景' },
    ],
  },
  {
    name: 'Google Gemini',
    icon: 'G',
    region: '美国',
    url: 'https://ai.google.dev',
    apiEndpoint: 'https://generativelanguage.googleapis.com',
    description: 'Google DeepMind 的多模态大模型系列，原生支持文本、图像、音频、视频输入。Gemini 2.5 系列引入了强大的推理能力和 1M tokens 上下文窗口。通过 Google AI Studio 和 Vertex AI 两种途径接入。',
    models: [
      { name: 'Gemini 2.5 Pro', desc: '旗舰推理模型，超长上下文理解和复杂推理能力顶级' },
      { name: 'Gemini 2.5 Flash', desc: '平衡性能与成本的高效模型，适合日常推理任务' },
      { name: 'Gemini 2.0 Flash', desc: '轻量多模态模型，推理速度快，原生支持工具调用' },
    ],
  },
  {
    name: 'Meta Llama',
    icon: 'L',
    region: '美国',
    url: 'https://llama.meta.com',
    apiEndpoint: '通过云平台调用（非直接 API）',
    description: 'Meta 开源的大语言模型系列，Llama 4 是最新一代。模型权重完全开源，可在 Hugging Face、各大云平台上部署。适合需要私有化部署或微调的场景。',
    models: [
      { name: 'Llama 4 Maverick', desc: 'Llama 4 系列旗舰，MoE 架构，128K 上下文，推理能力大幅提升' },
      { name: 'Llama 4 Scout', desc: 'Llama 4 系列轻量版，更快的推理速度，适合资源受限场景' },
    ],
  },
  {
    name: 'xAI',
    icon: 'X',
    region: '美国',
    url: 'https://x.ai',
    apiEndpoint: 'https://api.x.ai/v1',
    description: 'Elon Musk 创立的 AI 公司，Grok 系列模型在实时信息处理和对话风格上有独特定位。支持 OpenAI 兼容接口，可通过 X Platform 或 Grok API 调用。',
    models: [
      { name: 'Grok 3', desc: '最强模型，推理能力大幅提升，支持深度思考模式' },
      { name: 'Grok 3 Mini', desc: '轻量推理模型，更快的响应速度' },
    ],
  },
  {
    name: 'Mistral',
    icon: 'M',
    region: '法国',
    url: 'https://mistral.ai',
    apiEndpoint: 'https://api.mistral.ai/v1',
    description: '欧洲领先的 AI 公司，主打高效和开源。Mistral 模型以高效率和优秀的代码能力著称。提供 open-mistral 系列和 Codestral 代码专用模型。支持 OpenAI 兼容接口。',
    models: [
      { name: 'Mistral Large', desc: '旗舰模型，多语言支持，128K 上下文，工具调用能力强' },
      { name: 'Codestral', desc: '代码专用模型，支持多编程语言，适合代码补全和生成' },
      { name: 'Mistral Small', desc: '轻量模型，适合简单任务和批量处理' },
    ],
  },
  {
    name: 'Cohere',
    icon: 'C',
    region: '加拿大',
    url: 'https://cohere.com',
    apiEndpoint: 'https://api.cohere.com/v2',
    description: '企业级 NLP 模型供应商，Command 系列模型在企业 RAG 和对话场景表现优异。提供 Embed、Classify、Rerank 等专用 API，是企业级 NLP 应用的理想选择。',
    models: [
      { name: 'Command R+', desc: '最强对话模型，128K 上下文，擅长 RAG 和工具调用' },
      { name: 'Command R', desc: '高效对话模型，适合企业级 RAG 应用' },
      { name: 'Command', desc: '通用文本生成模型，适合内容生成和摘要' },
    ],
  },
  {
    name: 'Amazon Bedrock (AWS)',
    icon: 'AWS',
    region: '美国',
    url: 'https://aws.amazon.com/bedrock',
    apiEndpoint: '通过 AWS SDK 调用',
    description: 'AWS 提供的托管多模型服务平台，统一管理多个供应商的模型（Anthropic Claude、Meta Llama、Mistral、Cohere、Stability AI 等）。提供统一 API 接口，支持模型路由、推理、微调等功能。',
    models: [
      { name: 'Anthropic Claude (via Bedrock)', desc: '通过 Bedrock 访问 Claude 全系模型' },
      { name: 'Meta Llama (via Bedrock)', desc: '通过 Bedrock 部署和调用 Llama 系列' },
      { name: 'Mistral (via Bedrock)', desc: '通过 Bedrock 访问 Mistral 系列模型' },
      { name: 'Titan 模型', desc: 'AWS 自研模型，用于文本生成和图像生成' },
    ],
  },
  {
    name: 'Groq',
    icon: 'GR',
    region: '美国',
    url: 'https://groq.com',
    apiEndpoint: 'https://api.groq.com/openai/v1',
    description: '以超高速推理芯片 LPU 为核心，提供极致的推理速度。支持开源模型（Llama、Mistral、Mixtral 等）的快速部署和调用，OpenAI 兼容接口，响应速度极快。',
    models: [
      { name: 'Llama 3.3 70B (Groq)', desc: '通过 Groq LPU 加速的 Llama 模型，推理速度极快' },
      { name: 'Mixtral 8x7B (Groq)', desc: 'Mistral 的混合专家模型，Groq 上超快推理' },
    ],
  },
  {
    name: 'Fireworks AI',
    icon: 'FW',
    region: '美国',
    url: 'https://fireworks.ai',
    apiEndpoint: 'https://api.fireworks.ai/v1',
    description: '提供高性能模型推理和微调服务，支持多种开源模型。支持 OpenAI 兼容接口，适合需要快速部署和弹性扩展的场景。',
    models: [
      { name: 'Firefunction v2 (via Fireworks)', desc: '基于 Llama 微调的函数调用模型' },
      { name: 'Mixtral (via Fireworks)', desc: 'Mixtral 8x7B 快速推理部署' },
    ],
  },
  {
    name: 'Perplexity (TTS)',
    icon: 'PQ',
    region: '美国',
    url: 'https://www.perplexity.ai',
    apiEndpoint: '暂无公开 API',
    description: 'AI 搜索引擎公司，主打实时联网搜索和信息聚合。其 Sonar 模型专为搜索和问答场景优化。',
    models: [
      { name: 'Sonar', desc: '联网搜索专用模型，结合搜索和推理能力' },
    ],
  },
];

const chinaProviders = [
  {
    name: '阿里通义千问 / DashScope',
    icon: 'QW',
    url: 'https://dashscope.aliyun.com',
    apiEndpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    description: '阿里巴巴集团的大语言模型平台，Qwen（通义千问）系列是国内开源社区最活跃的模型之一。通过 DashScope（模型服务灵积）平台提供 API，兼容 OpenAI 接口格式。提供从 0.5B 到 110B+ 多种尺寸的模型。',
    models: [
      { name: 'Qwen3.6-Flash', desc: '最新 Flash 版本，110B+ 参数，速度和成本最佳平衡' },
      { name: 'Qwen3.5-Plus', desc: 'Plus 版本，综合能力强，适合企业级应用' },
      { name: 'Qwen3-Max-Thinking', desc: '推理模型，擅长数学推理和逻辑思考' },
      { name: 'Qwen-VL', desc: '多模态视觉语言模型，支持图像理解' },
    ],
  },
  {
    name: '百度文心一言 / ERNIE',
    icon: 'YX',
    url: 'https://cloud.baidu.com/product/wenxinworkshop',
    apiEndpoint: '通过百度智能云 API',
    description: '百度推出的人工智能大语言模型，文心一言在中文理解和生成方面有深厚积累。通过百度智能云平台（千帆）提供 API 服务，适合国内企业级应用。',
    models: [
      { name: 'ERNIE 5.0', desc: '最新旗舰模型，深度语义理解和复杂推理能力极强' },
      { name: 'ERNIE 4.5', desc: '旗舰模型，深度语义理解和复杂推理能力强' },
      { name: 'ERNIE X1.1', desc: '推理增强模型，擅长复杂逻辑推理' },
    ],
  },
  {
    name: '智谱清言 / Zhipu AI',
    icon: 'ZP',
    url: 'https://open.bigmodel.cn',
    apiEndpoint: 'https://open.bigmodel.cn/api/paas/v4/',
    description: '由清华系 AI 公司，GLM（General Language Model）系列是国内领先的开源模型之一。智谱 AI 通过 open.bigmodel.cn 平台提供 API，兼容 OpenAI 接口格式。',
    models: [
      { name: 'GLM-5.1', desc: '最新旗舰模型，最强推理能力，128K 上下文' },
      { name: 'GLM-5', desc: '旗舰模型，综合能力强，性价比出色' },
      { name: 'CogView-3', desc: '文生图模型' },
    ],
  },
  {
    name: '月之暗面 / Moonshot',
    icon: 'MS',
    url: 'https://platform.moonshot.cn',
    apiEndpoint: 'https://api.moonshot.cn/v1',
    description: '由前 Kuaishou CTO 杨植麟创立，Kimi 系列模型以超长上下文支持（最高 128K）为特色，兼容 OpenAI 接口格式。',
    models: [
      { name: 'Kimi K2.6', desc: '最新旗舰模型，支持 128K 上下文，综合性能强' },
      { name: 'Kimi K2.5', desc: '高性价比模型，支持 32K 上下文' },
    ],
  },
  {
    name: '阶跃星辰 / StepFun',
    icon: 'SF',
    url: 'https://platform.stepfun.com',
    apiEndpoint: 'https://api.stepfun.com/v1',
    description: '由前 Kuaishou CEO 宿华创立，StepFun 的 Step 系列模型在多模态和对话生成方面表现优异。',
    models: [
      { name: 'Step 3.5 Flash', desc: '最新高性能 Agent 基座模型，稀疏 MoE 架构，256K 上下文' },
      { name: 'Step Audio R1.1', desc: '原生语音推理模型，支持"边说边思考"' },
    ],
  },
  {
    name: '腾讯混元 / Hunyuan',
    icon: 'HY',
    url: 'https://cloud.tencent.com/product/hunyuan',
    apiEndpoint: '通过腾讯云 API',
    description: '腾讯推出的大语言模型，混元模型在中文理解和代码生成方面有优势。通过腾讯云 API 提供服务，适合腾讯生态内的应用集成。',
    models: [
      { name: 'Hunyuan 3.0', desc: '旗舰模型，综合性能强' },
      { name: 'Hunyuan 2.0', desc: '标准模型，平衡性能与成本' },
    ],
  },
  {
    name: '字节跳动 / 火山引擎 Doubao',
    icon: 'DB',
    url: 'https://www.volcengine.com/product/doubao',
    apiEndpoint: '通过火山引擎 API',
    description: '字节跳动旗下的 AI 平台，Doubao（豆包）系列模型在文本生成、语音合成、图像生成等多模态场景有广泛应用。通过火山引擎平台提供服务。',
    models: [
      { name: 'Doubao 2.0', desc: '旗舰文本模型，综合能力强' },
      { name: 'Seedance 2.0', desc: '视频生成模型' },
      { name: 'Seedream 5.0', desc: '多模态视觉模型' },
    ],
  },
  {
    name: 'MiniMax',
    icon: 'MX',
    url: 'https://api.minimax.chat',
    apiEndpoint: 'https://api.minimax.chat/v1',
    description: '国内知名 AI 公司，MiniMax M 系列在长文本理解和对话生成方面表现优异。',
    models: [
      { name: 'M2.7', desc: '旗舰对话模型，长文本理解能力强' },
      { name: 'M2.5', desc: '通用文本生成模型' },
    ],
  },
  {
    name: '零一万物 / 01.ai',
    icon: '01',
    url: 'https://platform.lingyiwanwu.com',
    apiEndpoint: 'https://api.lingyiwanwu.com/v1',
    description: '由李开复创立的 AI 公司，Yi 系列模型是国际上表现优秀的中文开源模型。通过 API 平台提供兼容 OpenAI 的接口。',
    models: [
      { name: 'Yi-Large', desc: '最强旗舰模型，综合推理能力强' },
      { name: 'Yi-Medium', desc: '中等模型，性价比好' },
      { name: 'Yi-Spark', desc: '轻量快速模型' },
    ],
  },
  {
    name: '百川智能 / Baichuan',
    icon: 'BC',
    url: 'https://www.baichuan-ai.com',
    apiEndpoint: 'https://api.baichuan-ai.com/v1',
    description: '国内领先的 AI 公司，Baichuan 系列在中文理解和对话生成方面表现优秀。',
    models: [
      { name: 'Baichuan4', desc: '最新旗舰模型，综合性能强' },
      { name: 'Baichuan4-Air', desc: '轻量版本，性价比高' },
    ],
  },
  {
    name: 'DeepSeek / 深度求索',
    icon: 'DS',
    url: 'https://platform.deepseek.com',
    apiEndpoint: 'https://api.deepseek.com/v1',
    description: '杭州深度求索 AI 公司，DeepSeek V4 系列在全球引发广泛关注。提供 chat 和 reasoning 两种专用模型，OpenAI 兼容接口，性价比极高。',
    models: [
      { name: 'DeepSeek V4', desc: '最新通用语言模型（deepseek-chat），671B 参数 MoE 架构' },
      { name: 'DeepSeek V4-Pro-Max', desc: 'Pro 版推理模型（deepseek-reasoner），数学和逻辑推理顶级' },
    ],
  },
  {
    name: '昆仑万维 / Skywork',
    icon: 'SK',
    url: 'https://platform.skywork.ai',
    apiEndpoint: '通过昆仑万维 API',
    description: '昆仑万维旗下 AI 平台，Skywork 系列是知名开源模型。',
    models: [
      { name: 'Skywork-Max', desc: '旗舰模型，综合能力优秀' },
      { name: 'Skywork 开源系列', desc: '提供多尺寸开源模型' },
    ],
  },
  {
    name: 'MiniMax（海螺 AI）',
    icon: 'HG',
    url: 'https://minimaxi.com',
    apiEndpoint: '通过海螺 AI 平台',
    description: 'MiniMax 旗下海螺 AI，提供对话和图像生成等服务。',
    models: [
      { name: '海螺 AI 对话模型', desc: '多模态对话模型' },
    ],
  },
  {
    name: '讯飞星火 / iFlytek Spark',
    icon: 'XF',
    url: 'https://xinghuo.xfyun.cn',
    apiEndpoint: '通过讯飞开放平台 API',
    description: '科大讯飞旗下的大语言模型，星火 Spark 系列在中文语音交互和知识问答方面有优势。',
    models: [
      { name: 'Spark X2', desc: '旗舰模型，综合能力全面提升' },
      { name: 'Spark X1', desc: '专业版模型，性价比高' },
    ],
  },
];

const integrationTips = [
  {
    icon: '1',
    title: '统一接口抽象',
    content: '建议使用 OpenAI 兼容的 SDK 或自建适配器层，统一不同供应商的 API 调用方式，便于后续切换和对比模型。',
  },
  {
    icon: '2',
    title: '多供应商容灾',
    content: '生产环境建议配置至少 2-3 个供应商作为 fallback，主供应商不可用时自动切换到备用供应商。',
  },
  {
    icon: '3',
    title: '按需路由',
    content: '根据不同任务类型（推理、代码、对话、搜索）自动路由到最合适的模型，平衡性能与成本。',
  },
  {
    icon: '4',
    title: '缓存与限流',
    content: '对于高频重复查询，实现结果缓存；同时做好各供应商的速率限制管理，避免触发 API 限流。',
  },
];
</script>

<style scoped>
.provider-page {
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
  color: #6b7280;
}

/* 使用说明 */
.usage-tip {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: #eff6ff;
  border-radius: 16px;
  margin-bottom: 48px;
  border: 1px solid #bfdbfe;
}

.tip-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}

.tip-content p {
  font-size: 14px;
  color: #1e40af;
  line-height: 1.7;
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

.section-number.global {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
}

.section-number.cn {
  background: linear-gradient(135deg, #dc2626 0%, #f97316 100%);
}

.section-number:last-child {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

/* Provider 卡片列表 */
.provider-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(560px, 1fr));
  gap: 24px;
}

.provider-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.provider-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: #93c5fd;
}

.provider-card.featured {
  border-left: 4px solid #2563eb;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
}

.card-icon-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #2563eb;
  flex-shrink: 0;
}

.card-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-url {
  font-size: 12px;
  color: #6b7280;
  text-decoration: none;
  word-break: break-all;
}

.card-url:hover {
  color: #2563eb;
}

.card-badge {
  font-size: 11px;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 12px;
  color: #6b7280;
  white-space: nowrap;
}

.cn-badge {
  background: #fef2f2;
  color: #dc2626;
}

.card-desc {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.7;
  margin: 0 0 20px 0;
}

/* Models Section */
.models-section {
  margin-bottom: 16px;
}

.models-title {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 10px 0;
}

.model-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.model-item {
  display: flex;
  gap: 12px;
  padding: 10px 14px;
  background: #f9fafb;
  border-radius: 10px;
}

.model-name {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  min-width: 160px;
}

.model-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

/* Card Footer */
.card-footer {
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-label {
  font-size: 11px;
  color: #9ca3af;
  white-space: nowrap;
}

.footer-code {
  font-size: 11px;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 6px;
  color: #374151;
  font-family: 'Courier New', monospace;
}

/* 对比表 */
.comparison-table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.comparison-table thead {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
}

.comparison-table th {
  padding: 14px 20px;
  text-align: left;
  font-weight: 600;
}

.comparison-table td {
  padding: 14px 20px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}

.comparison-table tbody tr:nth-child(even) {
  background: #f9fafb;
}

.comparison-table tbody tr:hover {
  background: #eff6ff;
}

.comparison-table td:first-child {
  font-weight: 600;
  color: #1f2937;
  width: 120px;
}

/* 集成建议 */
.integration-tips {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.tip-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  text-align: center;
  transition: all 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border-color: #93c5fd;
}

.tip-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.tip-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.tip-card-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* 代码示例 */
.code-example {
  background: #1f2937;
  border-radius: 16px;
  padding: 28px;
  overflow-x: auto;
}

.code-title {
  font-size: 16px;
  font-weight: 600;
  color: #e5e7eb;
  margin: 0 0 16px 0;
}

.code-block {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #e5e7eb;
  white-space: pre;
  overflow-x: auto;
}

/* 响应式 */
@media (max-width: 1024px) {
  .provider-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .integration-tips {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
  }

  .model-item {
    flex-direction: column;
    gap: 4px;
  }

  .model-name {
    min-width: auto;
  }
}
</style>
