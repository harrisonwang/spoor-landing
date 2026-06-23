// Terminal data — same content for both languages (real spoor output is Chinese-doc based).
// Kinds map to colors in the component CSS.

export type Line = { role?: string; sub?: string; text: string; kind: string };

/* 高风险抽取场景 —— Hero Agent 展示 */
export const extractionScene: Line[] = [
  {
    role: "USER",
    text: "@vendor_payment_pack.pdf  提取收款方、付款金额、付款条件和违约条款。不确定的地方不要猜。",
    kind: "user",
  },
  {
    role: "MODEL",
    sub: "thinking",
    text: "我会用 read 读取文件，并要求页级来源。",
    kind: "reason",
  },
  {
    sub: "calls",
    text: "vendor_payment_pack.pdf",
    kind: "call",
  },
  {
    role: "TOOL",
    sub: "returns",
    text: "provenance.page",
    kind: "result",
  },
  { text: "pdf_page_no_text_layer · page 4", kind: "warn" },
  { text: "embedded_visuals_omitted · page 4", kind: "warn" },
  {
    role: "MODEL",
    sub: "thinking",
    text: "金额可能在第 4 页扫描图中。交给 VLM 识别，并标记结果需人工复核。",
    kind: "reason",
  },
  {
    role: "TOOL",
    sub: "returns",
    text: "visual handle: spoor://pdf/page/4",
    kind: "uri",
  },
  {
    sub: "calls",
    text: "inspect(spoor://pdf/page/4)",
    kind: "vlm",
  },
  {
    role: "TOOL",
    sub: "returns",
    text: "amount candidate: ¥128,000",
    kind: "vlmResult",
  },
  {
    role: "MODEL",
    sub: "replies",
    text: "收款方：Acme Data Services Ltd.  [来源: p2]\n付款金额：¥128,000  [第 4 页视觉内容 · VLM 识别 · 需人工复核]\n付款条件：签署后 5 个工作日支付首款  [来源: p3]\n违约条款：逾期每日按 0.5% 支付违约金  [来源: p7]",
    kind: "msg",
  },
];

export const traceScenes: { fmt: string; lines: Line[] }[] = [
  {
    fmt: "PDF",
    lines: extractionScene,
  },
  {
    fmt: "PDF",
    lines: [
      {
        role: "USER",
        text: "@央行工作论文.pdf  这张图讲了什么?",
        kind: "user",
      },
      {
        role: "MODEL",
        sub: "thinking",
        text: "先把文档读成文本。",
        kind: "reason",
      },
      {
        sub: "calls",
        text: 'read_document(path="央行工作论文.pdf")',
        kind: "call",
      },
      {
        role: "TOOL",
        sub: "returns",
        text: "## 区块链能做什么、不能做什么 …  [28 KB]",
        kind: "result",
      },
      { text: "embedded_visuals_omitted · page 6", kind: "warn" },
      { text: "spoor://pdf/obj/59/0", kind: "uri" },
      {
        role: "MODEL",
        sub: "thinking",
        text: "第 6 页有张图没进文本,取出来看。",
        kind: "reason",
      },
      {
        sub: "calls",
        text: 'extract_document_media(uri="spoor://pdf/obj/59/0")',
        kind: "call",
      },
      {
        role: "TOOL",
        sub: "returns",
        text: "image/png · 1 张",
        kind: "result",
      },
      {
        role: "MODEL",
        sub: "replies",
        text: "图 1 是「Token 范式」同心圆:内圈是链上",
        kind: "msg",
      },
      { text: "可信世界,外圈是链下现实世界。", kind: "msg" },
    ],
  },
  {
    fmt: "XLSX",
    lines: [
      {
        role: "USER",
        text: "@销售数据.xlsx  这批数据销售总额多少?",
        kind: "user",
      },
      {
        role: "MODEL",
        sub: "thinking",
        text: "5 万行明细太大,先看表结构。",
        kind: "reason",
      },
      { sub: "calls", text: 'read_table(path="销售数据.xlsx")', kind: "call" },
      {
        role: "TOOL",
        sub: "returns",
        text: "schema-v2 · 5 个 sheet · 预览 100 / 50000 行",
        kind: "result",
      },
      { text: "truncated: true", kind: "warn" },
      {
        role: "MODEL",
        sub: "thinking",
        text: "「汇总」表里有合计,按列精确取。",
        kind: "reason",
      },
      {
        sub: "calls",
        text: 'read_table(sheet="汇总", columns="指标,数值")',
        kind: "call",
      },
      {
        role: "TOOL",
        sub: "returns",
        text: '"销售总金额(元)": "22,770,356,158.98"',
        kind: "result",
      },
      {
        role: "MODEL",
        sub: "replies",
        text: "销售总额 ¥227.7 亿,来自「汇总」表 ——",
        kind: "msg",
      },
      { text: "没把 5 万行明细读进上下文。", kind: "msg" },
    ],
  },
  {
    fmt: "DOCX",
    lines: [
      { role: "USER", text: "@录入流程.docx  这套流程一共几步?", kind: "user" },
      {
        role: "MODEL",
        sub: "thinking",
        text: "先读文档拿步骤文字。",
        kind: "reason",
      },
      {
        sub: "calls",
        text: 'read_document(path="录入流程.docx")',
        kind: "call",
      },
      {
        role: "TOOL",
        sub: "returns",
        text: "**1** … **10**  步骤标号 + 文字",
        kind: "result",
      },
      { text: "embedded_visuals_omitted · 10 张图", kind: "warn" },
      { text: "每张图有独立地址 spoor://docx/…", kind: "uri" },
      {
        role: "MODEL",
        sub: "thinking",
        text: "配图都没进文本,10 张一起取。",
        kind: "reason",
      },
      {
        sub: "calls",
        text: "extract_document_media(uri=[…×10])",
        kind: "call",
      },
      {
        role: "TOOL",
        sub: "returns",
        text: "image/png · 10 张",
        kind: "result",
      },
      {
        role: "MODEL",
        sub: "replies",
        text: "共 10 步:录入小区 → 选栋单元 → 填房号",
        kind: "msg",
      },
      { text: "→ … → 录入人脸,每步含界面截图。", kind: "msg" },
    ],
  },
];

export const cliSeq: { fmt: string; cmd: string; out: Line[] }[] = [
  {
    fmt: "PDF",
    cmd: "spoor 央行工作论文.pdf",
    out: [
      { text: "warning: 解析结果不完整 央行工作论文.pdf:", kind: "warn" },
      { text: '  {"code":"embedded_visuals_omitted",', kind: "warnDim" },
      { text: '   "location":{"kind":"page","number":6}}', kind: "warnDim" },
      { text: "## Page 1", kind: "head" },
      { text: "区块链能做什么、不能做什么?  徐忠 邹传伟", kind: "norm" },
      { text: "图 1:Token 范式概括", kind: "dim" },
      { text: "![PDF image 1 (p6)](spoor://pdf/obj/59/0)", kind: "uri" },
      { text: "", kind: "norm" },
      { text: "> [!WARNING] spoor 返回 1 条完整性警告", kind: "warn" },
    ],
  },
  {
    fmt: "XLSX",
    cmd: "spoor 销售数据.xlsx",
    out: [
      { text: '{ "schema_version": "spoor-table-json-v2",', kind: "dim" },
      { text: '  "usage": "收窄:--sheet / --rows / --columns",', kind: "dim" },
      { text: '  "tables": [{ "sheet": "汇总",', kind: "key" },
      { text: '    "headers": { "指标": {…}, "数值": {…} },', kind: "key" },
      {
        text: '    "rows": [ {"指标":"总订单数","数值":"50000"},',
        kind: "norm",
      },
      {
        text: '              {"指标":"客户总数","数值":"10000"} ],',
        kind: "norm",
      },
      { text: '    "row_range": {"first":2,"last":20},', kind: "key" },
      { text: '    "truncated": false }] }', kind: "dim" },
    ],
  },
  {
    fmt: "DOCX",
    cmd: "spoor 录入流程.docx",
    out: [
      { text: "warning: 解析结果不完整 录入流程.docx:", kind: "warn" },
      { text: '  {"code":"embedded_visuals_omitted", …}', kind: "warnDim" },
      {
        text: "![DOCX image 1](spoor://docx/part/word/media/image1.png)",
        kind: "uri",
      },
      {
        text: "![DOCX image 2](spoor://docx/part/word/media/image3.png)",
        kind: "uri",
      },
      { text: "录入人脸    具体房号    X栋X单元", kind: "dim" },
      { text: "", kind: "norm" },
      { text: "> [!WARNING] 含图片/绘图,Agent 应按需提取", kind: "warn" },
    ],
  },
];

export const devTabs: { label: string; lines: Line[] }[] = [
  {
    label: "Rust",
    lines: [
      {
        text: "let mut req = spoor_core::ParseRequest::new(bytes);",
        kind: "norm",
      },
      { text: 'req.source_name = Some("report.pdf".into());', kind: "norm" },
      { text: "", kind: "norm" },
      { text: "let res = spoor_core::parse(&req)?;", kind: "accent" },
      { text: 'println!("{}", res.markdown);', kind: "norm" },
      { text: "for w in &res.warnings {           // 完整性警告", kind: "dim" },
      { text: '    eprintln!("{} {:?}", w.code, w.location);', kind: "norm" },
      { text: "}", kind: "norm" },
    ],
  },
  {
    label: "Python",
    lines: [
      { text: "from pyspoor import parse_path", kind: "dim" },
      { text: "", kind: "norm" },
      { text: "def read_document(path):           # agent 工具", kind: "dim" },
      { text: "    res = parse_path(path)", kind: "norm" },
      { text: "    for w in res.warnings:", kind: "norm" },
      { text: "        log(w.code, w.location)", kind: "norm" },
      { text: "    return res.markdown", kind: "norm" },
    ],
  },
  {
    label: "Node.js",
    lines: [
      { text: "import { parse } from '@harrisonwang/spoor'", kind: "dim" },
      { text: "import { readFile } from 'node:fs/promises'", kind: "dim" },
      { text: "", kind: "norm" },
      { text: "const res = parse(await readFile('report.pdf'),", kind: "norm" },
      { text: "  { sourceName: 'report.pdf' })", kind: "norm" },
      { text: "console.log(res.markdown)", kind: "norm" },
      {
        text: "res.warnings.forEach(w => log(w.code, w.location))",
        kind: "norm",
      },
    ],
  },
  {
    label: "WASM Web",
    lines: [
      {
        text: "import init, { parse } from '@harrisonwang/spoor-wasm'",
        kind: "dim",
      },
      { text: "", kind: "norm" },
      { text: "await init()", kind: "norm" },
      { text: "// 文件在浏览器内解析,不上传", kind: "dim" },
      { text: "const res = parse(new Uint8Array(buf),", kind: "norm" },
      { text: "  { sourceName: file.name })", kind: "norm" },
      { text: "render(res.markdown)", kind: "norm" },
    ],
  },
  {
    label: "WASM Edge",
    lines: [
      {
        text: "import init, { parse } from '@harrisonwang/spoor-wasm'",
        kind: "dim",
      },
      { text: "", kind: "norm" },
      {
        text: "export default {                   // Cloudflare Worker",
        kind: "dim",
      },
      { text: "  async fetch(req) {", kind: "norm" },
      { text: "    await init()", kind: "norm" },
      { text: "    const buf = await req.arrayBuffer()", kind: "norm" },
      { text: "    const res = parse(new Uint8Array(buf))", kind: "accent" },
      { text: "    return Response.json(res)", kind: "norm" },
      { text: "  }", kind: "norm" },
      { text: "}", kind: "norm" },
    ],
  },
];

export const installTabs: { label: string; lines: Line[] }[] = [
  {
    label: "brew",
    lines: [
      { text: "brew install harrisonwang/tap/spoor", kind: "accent" },
      { text: "", kind: "norm" },
      { text: "# macOS / Linux · CLI 单二进制", kind: "dim" },
    ],
  },
  {
    label: "scoop",
    lines: [
      { text: "scoop bucket add harrisonwang \\", kind: "accent" },
      {
        text: "  https://github.com/harrisonwang/scoop-bucket",
        kind: "accent",
      },
      { text: "scoop install spoor", kind: "accent" },
      { text: "# Windows", kind: "dim" },
    ],
  },
  {
    label: "cargo",
    lines: [
      { text: "cargo install spoor-cli", kind: "accent" },
      { text: "", kind: "norm" },
      { text: "# 进项目:cargo add spoor-core", kind: "dim" },
    ],
  },
  {
    label: "pip",
    lines: [
      { text: "pip install pyspoor", kind: "accent" },
      { text: "", kind: "norm" },
      { text: 'parse_path("report.pdf").markdown', kind: "dim" },
    ],
  },
  {
    label: "npm",
    lines: [
      { text: "npm i @harrisonwang/spoor", kind: "accent" },
      { text: "", kind: "norm" },
      { text: "parse(bytes, { sourceName }).markdown", kind: "dim" },
    ],
  },
];
