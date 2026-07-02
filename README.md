# minis-qx

Minis 自動分析 HAR 後生成的代理工具改寫腳本與規則。

**支援工具**：Quantumult X · Surge · Loon · Shadowrocket

---

## 📂 腳本分類目錄

### 🔓 會員解鎖 / VIP Unlock

| App | 功能 | JS 腳本 | QX conf | Surge sgmodule | Loon plugin | Shadowrocket module |
|-----|------|---------|---------|----------------|-------------|-------------------|
| 火影忍者社區 | VIP 解鎖 | [JS](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/JS/naruto-fe-vip.js) | [conf](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/QX/naruto-fe.conf) | [sgmodule](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Surge/naruto-fe.sgmodule) | [plugin](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Loon/naruto-fe.plugin) | [module](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Shadowrocket/naruto-fe.module) |
| Tachimanga | Premium 破解 | [JS](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/JS/tachimanga_premium.js) | [conf](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/QX/tachimanga.conf) | [sgmodule](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Surge/tachimanga.sgmodule) | [plugin](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Loon/tachimanga.plugin) | [module](https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Shadowrocket/tachimanga.module) |

### 🚫 去廣告 / Ad Block

*(尚無腳本 — 等待 HAR 分析後自動生成)*

### 🔧 功能增強 / Enhancement

*(尚無腳本 — 等待 HAR 分析後自動生成)*

### 📊 規則 / Rules

*(尚無規則 — 等待 HAR 分析後自動生成)*

---

## 📁 目錄結構

```
minis-qx/
├── Scripts/
│   ├── JS/              → 純 JS 腳本（raw URL 直接訂閱）
│   ├── QX/              → Quantumult X 配置（.conf）
│   ├── Surge/           → Surge 模組（.sgmodule）
│   ├── Loon/            → Loon 插件（.plugin）
│   └── Shadowrocket/    → Shadowrocket 模組（.module）
├── Tasks/               → 定時任務腳本（.js + .snippet + .sgmodule）
└── Rules/               → 分流/去廣告規則（.list / .conf）
```

## 📐 腳本格式規範

| 工具 | 格式 | 要點 |
|------|------|------|
| **JS 腳本** | `.js` | 純 JS 代碼，不含 `[rewrite_local]` / `[mitm]` 等註釋 |
| **Quantumult X** | `.conf` / `.snippet` | rewrite 規則 + `hostname =` |
| **Surge** | `.sgmodule` | `[Script]` + `[MITM]` 區段 |
| **Loon** | `.plugin` | `[Script]` + `[MITM]` 區段 |
| **Shadowrocket** | `.module` | `[Script]` + `[MITM]` 區段 |
