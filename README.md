# spoor — 官网（Astro 版）

把当前 HTML 原型重构成的 Astro 项目骨架。中英双语、暖纸+赤陶配色、两个带动画的终端、可切换的代码块 —— 全部静态生成，零运行时框架。

## 快速开始

```bash
cd spoor-landing
npm install
npm run dev      # http://localhost:4321  → 自动跳转 /zh/
```

构建 / 预览：

```bash
npm run build    # 输出到 dist/，纯静态
npm run preview
```

部署到 Cloudflare Pages：

```bash
npm run build
npx run deploy
```

## 路由

- `/`        → 重定向到 `/zh/`
- `/zh/`     中文首页
- `/en/`     English homepage

右上角中/EN 切换就是在这两条路由间跳转（`prefixDefaultLocale: true`）。

## 改文案在哪

| 想改什么 | 文件 |
|---|---|
| 所有界面文案（中英） | `src/i18n/ui.ts` |
| 终端内容：Agent 轨迹、CLI 输出、安装/开发代码 | `src/data/terminals.ts` |
| 配色 / 字体 / 间距 token | `src/styles/global.css`（`:root` 变量） |
| 分区结构 | `src/pages/[lang]/index.astro` |

文案与数据是**集中式**的：组件里基本不写死字符串，改 `ui.ts` / `terminals.ts` 即可全站生效。

## 目录

```
src/
├─ i18n/ui.ts            # 双语字典 + useT()
├─ data/terminals.ts     # 终端/代码块数据（与语言无关）
├─ layouts/Base.astro    # <html> 外壳 + 全局样式
├─ components/
│  ├─ Nav.astro          # 导航 + 语言切换
│  ├─ Hero.astro         # 首屏（含 Agent）
│  ├─ Agent.astro        # Agent 展示窗口（对话列表 + 调用轨迹）
│  ├─ TrustStrip.astro
│  ├─ Cli.astro          # 命令行区（含 CliTerminal）
│  ├─ CliTerminal.astro  # 终端打字动画 + 文档切换
│  ├─ Runtime.astro      # 运行环境（原生/WASM/Edge）
│  ├─ Install.astro      # 安装（CodeTabs）
│  ├─ Develop.astro      # 开发（CodeTabs）
│  ├─ CodeTabs.astro     # 通用：可切换的静态代码块
│  └─ Footer.astro
└─ pages/
   ├─ index.astro        # → /zh/
   └─ [lang]/index.astro # zh / en 首页
```

## 关于交互实现

两个终端的打字/轨迹动画和所有标签切换都是**原生 DOM**（组件内的 `<script>`），不依赖 React/Vue。标签的激活态用 `.is-on` class 切换（见 `global.css` 的 `.tab-fmt / .tab-dark / .tab-lang`），逻辑直白、无框架坑。

如果以后想把代码块换成 Astro 官方的 **Expressive Code**（自带语法高亮 + 标签页 + 终端框），可以装 `astro-expressive-code` 把 `CodeTabs` 替换掉；当前实现刻意保持零依赖，clone 即跑。

## 待接入（按需）

- `astro-expressive-code` —— 真·语法高亮
- `@astrojs/sitemap` / `@astrojs/og` —— SEO / 社交卡片
- 把 `site` 字段（`astro.config.mjs`）改成你的正式域名
