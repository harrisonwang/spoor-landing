// Centralised bilingual copy + terminal data. Edit text here, not in components.
export const languages = { zh: "中", en: "EN" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "zh";

export const ui = {
  zh: {
    "nav.agent": "智能体",
    "nav.cli": "命令行",
    "nav.runtime": "运行",
    "nav.install": "安装",
    "nav.develop": "开发",

    "hero.badge": "为 Agent 而生",
    "hero.title.a": "文档解析引擎",
    "hero.title.b": "Agent 专用",
    "hero.sub":
      "将文档、表格和网页转换为 LLM 可直接消费的文本，并为图片、图表等视觉内容保留可追踪位置，方便 Agent 与 VLM 协同处理。",
    "hero.github": "在 GitHub 上查看",
    "term.tools": "可用工具",
    "term.toolsHint": "由 Agent 自主调用",

    "trust.lead": "文档型 → Markdown · 表格型 → JSON",

    "cli.eyebrow": "CLI 优先",
    "cli.title.a": "Unix 哲学：管道即接口",
    "cli.title.b": "",
    "cli.sub":
      "一条命令接收文档，标准输出交给 LLM。无法可靠解析的内容，会标注位置与原因，交给 Agent 继续处理。",
    "cli.f1": "分页提取",
    "cli.f2": "表格裁剪",
    "cli.f3": "图片定位",

    "runtime.eyebrow": "跨端一致",
    "runtime.title": "同一核心，一致输出",
    "runtime.sub":
      "从本地原生库到 CLI，从浏览器 WASM 再到边缘运行时，底层都使用同一套解析内核。",
    "runtime.c1.tag": "原生 · NATIVE",
    "runtime.c1.title": "服务端与本地沙箱",
    "runtime.c1.body": "单二进制部署，原生库集成",
    "runtime.c2.tag": "WASM · 浏览器",
    "runtime.c2.title": "纯前端与桌面端",
    "runtime.c2.body": "浏览器内解析，数据不上传",
    "runtime.c3.tag": "WASM · EDGE",
    "runtime.c3.title": "边缘计算与 Serverless",
    "runtime.c3.body": "Worker、Lambda、FaaS 运行，冷启动友好",
    "runtime.note":
      "配合浏览器内或本地模型,文档从解析到推理整条链路都不出端 —— 合同、报表、隐私数据留在原地。",

    "install.eyebrow": "快速安装",
    "install.title": "选择你的接入方式",
    "install.sub":
      "命令行处理、本地应用集成、浏览器内解析，按场景选择对应包即可开始使用。",

    "develop.eyebrow": "开发集成",
    "develop.title.a": "接入 Agent 工具层",
    "develop.title.b": "",
    "develop.sub":
      "无论使用 Python、Node 还是 WASM，输出结构保持一致。正文、表格与解析警告分层返回，方便 Agent 继续处理。",
    "develop.link": "看完整集成示例",

    "footer.tagline": "把文档变成 LLM 能直接读的文本。",
    "footer.legal": "离线、单二进制,文件永不离开你的运行环境",
  },
  en: {
    "nav.agent": "Agent",
    "nav.cli": "CLI",
    "nav.runtime": "Runtime",
    "nav.install": "Install",
    "nav.develop": "Develop",

    "hero.badge": "DOCUMENT PARSING FOR AGENTS",
    "hero.title.a": "document parsing",
    "hero.title.b": "Agent-first",
    "hero.sub":
      "Turn documents, tables and web pages into text your LLM can consume directly, while preserving traceable locations for images, charts and other visual content so agents and multimodal models can work together.",
    "hero.github": "View on GitHub",
    "term.tools": "TOOLS",
    "term.toolsHint": "agent picks autonomously",

    "trust.lead": "DOCS → MARKDOWN · TABLES → JSON",

    "cli.eyebrow": "TERMINAL-FIRST",
    "cli.title.a": "Unix philosophy: pipes are the interface.",
    "cli.title.b": "",
    "cli.sub":
      "One command takes the document, stdout feeds the LLM. Content that cannot be read reliably is marked with location and reason, so the agent can continue from there.",
    "cli.f1": "Page extraction",
    "cli.f2": "Table slicing",
    "cli.f3": "Image location",

    "runtime.eyebrow": "CONSISTENT EVERYWHERE",
    "runtime.title": "One core, consistent output.",
    "runtime.sub":
      "CLI, native libraries, WASM and Edge Runtime share the same parsing core. The same input file produces the same result.",
    "runtime.c1.tag": "NATIVE",
    "runtime.c1.title": "Server & sandbox",
    "runtime.c1.body": "Single binary deploy, native library integration",
    "runtime.c2.tag": "WASM · BROWSER",
    "runtime.c2.title": "Frontend & desktop",
    "runtime.c2.body": "Browser-side parsing, no cloud upload",
    "runtime.c3.tag": "WASM · EDGE",
    "runtime.c3.title": "Edge & serverless",
    "runtime.c3.body": "Worker / FaaS runtime, cold-start friendly",
    "runtime.note":
      "Pair it with a browser-local or on-device model and the whole pipeline — parse to inference — never leaves the device. Contracts, reports and private data stay put.",

    "install.eyebrow": "QUICK INSTALL",
    "install.title": "Choose your integration path.",
    "install.sub":
      "Command line workflows, local app integration or browser-side parsing — pick the package that matches your scenario and start parsing.",

    "develop.eyebrow": "INTEGRATION",
    "develop.title.a": "Add it to your agent tool layer.",
    "develop.title.b": "",
    "develop.sub":
      "Python, Node and WASM integrations return the same output shape. Text, tables and parse warnings are separated so agents can continue cleanly.",
    "develop.link": "Browse full examples",

    "footer.tagline": "Documents into text your LLM can read.",
    "footer.legal": "offline, single binary — files never leave your runtime",
  },
} as const;

export function useT(lang: Lang) {
  return function t(key: keyof (typeof ui)["zh"]): string {
    return (
      (ui[lang] as Record<string, string>)[key] ??
      (ui.zh as Record<string, string>)[key]
    );
  };
}
