// Terminal data and Agent demo traces.
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
        text: 'read_document("vendor_payment_pack.pdf", provenance="page")',
        kind: "call",
    },
    {
        role: "TOOL",
        sub: "returns",
        text: "markdown · provenance.page spans",
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
        sub: "calls",
        text: 'extract_image(uri="spoor://pdf/page/4")',
        kind: "call",
    },
    {
        role: "TOOL",
        sub: "returns",
        text: "image/png · page 4",
        kind: "result",
    },
    {
        sub: "calls",
        text: 'inspect_image("page-4.png")',
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
        fmt: "XLSX",
        lines: [
            {
                role: "USER",
                text: "@销售数据.xlsx  这批数据销售总额多少？",
                kind: "user",
            },
            {
                role: "MODEL",
                sub: "thinking",
                text: "5 万行明细太大，先看表结构。",
                kind: "reason",
            },
            {
                sub: "calls",
                text: 'read_table(path="销售数据.xlsx")',
                kind: "call",
            },
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
                text: "「汇总」表里有合计，按列精确取。",
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
                text: "销售总额 ¥227.7 亿，来自「汇总」表 ——",
                kind: "msg",
            },
            { text: "没把 5 万行明细读进上下文。", kind: "msg" },
        ],
    },
    {
        fmt: "DOCX",
        lines: [
            {
                role: "USER",
                text: "@录入流程.docx  这套流程一共几步？",
                kind: "user",
            },
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
                text: "配图都没进文本，10 张一起取。",
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
                text: "共 10 步：录入小区 → 选栋单元 → 填房号",
                kind: "msg",
            },
            { text: "→ … → 录入人脸，每步含界面截图。", kind: "msg" },
        ],
    },
];

export const traceScenesEn: { fmt: string; lines: Line[] }[] = [
    {
        fmt: "PDF",
        lines: [
            {
                role: "USER",
                text: "@vendor_payment_pack.pdf Extract payee, amount, payment terms, and default clauses. Do not guess when unsure.",
                kind: "user",
            },
            {
                role: "MODEL",
                sub: "thinking",
                text: "I'll read the file and require page-level provenance.",
                kind: "reason",
            },
            {
                sub: "calls",
                text: 'read_document("vendor_payment_pack.pdf", provenance="page")',
                kind: "call",
            },
            {
                role: "TOOL",
                sub: "returns",
                text: "markdown · provenance.page spans",
                kind: "result",
            },
            { text: "pdf_page_no_text_layer · page 4", kind: "warn" },
            { text: "embedded_visuals_omitted · page 4", kind: "warn" },
            {
                role: "MODEL",
                sub: "thinking",
                text: "The amount may be in the scanned image on page 4. I'll send it to the VLM and mark the result for review.",
                kind: "reason",
            },
            {
                sub: "calls",
                text: 'extract_image(uri="spoor://pdf/page/4")',
                kind: "call",
            },
            {
                role: "TOOL",
                sub: "returns",
                text: "image/png · page 4",
                kind: "result",
            },
            {
                sub: "calls",
                text: 'inspect_image("page-4.png")',
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
                text: "Payee: Acme Data Services Ltd. [source: p2]\nAmount: ¥128,000 [page 4 visual content · VLM read · needs review]\nPayment terms: first payment due within 5 business days after signing [source: p3]\nDefault clause: 0.5% late fee per day [source: p7]",
                kind: "msg",
            },
        ],
    },

    {
        fmt: "XLSX",
        lines: [
            {
                role: "USER",
                text: "@sales_data.xlsx What is the total sales amount for this batch?",
                kind: "user",
            },
            {
                role: "MODEL",
                sub: "thinking",
                text: "50k rows is too much for context. I'll inspect the workbook structure first.",
                kind: "reason",
            },
            {
                sub: "calls",
                text: 'read_table(path="sales_data.xlsx")',
                kind: "call",
            },
            {
                role: "TOOL",
                sub: "returns",
                text: "schema-v2 · 5 sheets · preview 100 / 50000 rows",
                kind: "result",
            },
            { text: "truncated: true", kind: "warn" },
            {
                role: "MODEL",
                sub: "thinking",
                text: "The Summary sheet has totals. Read the exact columns there.",
                kind: "reason",
            },
            {
                sub: "calls",
                text: 'read_table(sheet="Summary", columns="Metric,Value")',
                kind: "call",
            },
            {
                role: "TOOL",
                sub: "returns",
                text: '"Total sales amount (CNY)": "22,770,356,158.98"',
                kind: "result",
            },
            {
                role: "MODEL",
                sub: "replies",
                text: "Total sales: ¥22.77B, from the Summary sheet —",
                kind: "msg",
            },
            {
                text: "without loading all 50k detail rows into context.",
                kind: "msg",
            },
        ],
    },
    {
        fmt: "DOCX",
        lines: [
            {
                role: "USER",
                text: "@onboarding_sop.docx How many steps are in this flow?",
                kind: "user",
            },
            {
                role: "MODEL",
                sub: "thinking",
                text: "Read the document text first to get the numbered steps.",
                kind: "reason",
            },
            {
                sub: "calls",
                text: 'read_document(path="onboarding_sop.docx")',
                kind: "call",
            },
            {
                role: "TOOL",
                sub: "returns",
                text: "**1** … **10** step numbers + text",
                kind: "result",
            },
            { text: "embedded_visuals_omitted · 10 images", kind: "warn" },
            {
                text: "each image has a traceable URI spoor://docx/…",
                kind: "uri",
            },
            {
                role: "MODEL",
                sub: "thinking",
                text: "The screenshots are not in the text. Fetch all 10 images.",
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
                text: "image/png · 10 images",
                kind: "result",
            },
            {
                role: "MODEL",
                sub: "replies",
                text: "10 steps total: create community → choose building/unit → enter room number",
                kind: "msg",
            },
            {
                text: "→ … → enroll face, with screenshots for each step.",
                kind: "msg",
            },
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
            {
                text: '   "location":{"kind":"page","number":6}}',
                kind: "warnDim",
            },
            { text: "## Page 1", kind: "head" },
            { text: "区块链能做什么、不能做什么？  徐忠 邹传伟", kind: "norm" },
            { text: "图 1：Token 范式概括", kind: "dim" },
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
            {
                text: '  "usage": "收窄:--sheet / --rows / --columns",',
                kind: "dim",
            },
            { text: '  "tables": [{ "sheet": "汇总",', kind: "key" },
            {
                text: '    "headers": { "指标": {…}, "数值": {…} },',
                kind: "key",
            },
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
            {
                text: '  {"code":"embedded_visuals_omitted", …}',
                kind: "warnDim",
            },
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
            {
                text: "> [!WARNING] 含图片/绘图，Agent 应按需提取",
                kind: "warn",
            },
        ],
    },
];

/* 快速开始 —— 每个技术栈：① 安装 → ② 解析 → ③ 结果（含完整性警告）
   注：三列横排卡，每行尽量 ≤ ~36 字符以免折行 */
export const quickStartTabs: { key: string; steps: Line[][] }[] = [
    {
        key: "cli",
        steps: [
            // 默认 macOS（brew，两行）；Windows 由 QuickStart 客户端脚本替换为 scoop
            [
                { text: "$ brew tap harrisonwang/tap", kind: "accent" },
                { text: "$ brew install spoor", kind: "accent" },
            ],
            [{ text: "$ spoor report.pdf > report.md", kind: "accent" }],
            [
                { text: "## Page 1", kind: "head" },
                { text: "Q3 营收 1.28 亿，同比 +18% …", kind: "norm" },
                { text: "", kind: "norm" },
                { text: "⚠ embedded_visuals_omitted · p6", kind: "warn" },
            ],
        ],
    },
    {
        key: "py",
        steps: [
            [{ text: "$ pip install pyspoor", kind: "accent" }],
            [
                { text: "from spoor import parse_path", kind: "dim" },
                { text: 'r = parse_path("report.pdf")', kind: "norm" },
                { text: "print(r.markdown)", kind: "norm" },
            ],
            [
                { text: "markdown = r.markdown", kind: "norm" },
                { text: "warnings = r.warnings", kind: "norm" },
                { text: "⚠ embedded_visuals_omitted · p6", kind: "warn" },
            ],
        ],
    },
    {
        key: "node",
        steps: [
            [{ text: "$ npm i @harrisonwang/spoor", kind: "accent" }],
            [
                {
                    text: "import { parse } from '@harrisonwang/spoor'",
                    kind: "dim",
                },
                { text: 'const r = await parse("report.pdf")', kind: "norm" },
                { text: "console.log(r.markdown)", kind: "norm" },
            ],
            [
                { text: "r.markdown       // ready for LLM", kind: "norm" },
                { text: "r.warnings       // integrity report", kind: "norm" },
                { text: "⚠ embedded_visuals_omitted · p6", kind: "warn" },
            ],
        ],
    },
    {
        key: "rust",
        steps: [
            [{ text: "$ cargo add spoor-core", kind: "accent" }],
            [
                { text: "use spoor_core::parse_path;", kind: "dim" },
                { text: 'let r = parse_path("report.pdf")?;', kind: "norm" },
                { text: 'println!("{}", r.markdown);', kind: "norm" },
            ],
            [
                { text: "r.markdown       // LLM-ready", kind: "norm" },
                { text: "r.warnings       // check omissions", kind: "norm" },
                { text: "⚠ embedded_visuals_omitted · Page(6)", kind: "warn" },
            ],
        ],
    },
    {
        key: "web",
        steps: [
            [
                { text: '<input type="file" accept=".pdf" />', kind: "accent" },
                { text: "选择 report.pdf", kind: "dim" },
            ],
            [
                { text: "await initSpoor()", kind: "dim" },
                { text: "const r = parsePdf(file)", kind: "norm" },
                { text: "renderPreview(r.markdown)", kind: "norm" },
            ],
            [
                { text: 'download("report.md", r.markdown)', kind: "accent" },
                { text: "✓ 0 网络请求 · 文件不出端", kind: "accent" },
                { text: "⚠ embedded_visuals_omitted · p6", kind: "warn" },
            ],
        ],
    },
];
