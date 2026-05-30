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

| App | 功能 | JS 腳本 | QX conf | Surge sgmodule | Loon plugin | Shadowrocket module |
|-----|------|---------|---------|----------------|-------------|-------------------|

*(尚無腳本 — 等待 HAR 分析後自動生成)*

### 🔧 功能增強 / Enhancement

| App | 功能 | JS 腳本 | QX conf | Surge sgmodule | Loon plugin | Shadowrocket module |
|-----|------|---------|---------|----------------|-------------|-------------------|

*(尚無腳本 — 等待 HAR 分析後自動生成)*

### 📊 規則 / Rules

| 規則名稱 | 類型 | 說明 | QX | Surge | Loon | Shadowrocket |
|----------|------|------|----|-------|------|-------------|

*(尚無規則 — 等待 HAR 分析後自動生成)*

---

## 📖 匯入指南

### Quantumult X
```
QX → 設定 → 下載 → 從 URL 下載配置
```
- https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/QX/naruto-fe.conf
- https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/QX/tachimanga.conf

### Surge
```
Surge → 模組 → 安裝新模組
```
- https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Surge/naruto-fe.sgmodule
- https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Surge/tachimanga.sgmodule

### Loon
```
Loon → 插件 → 從 URL 安裝
```
- https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Loon/naruto-fe.plugin
- https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Loon/tachimanga.plugin

### Shadowrocket
```
Shadowrocket → 配置 → 模塊 → 添加模塊
```
- https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Shadowrocket/naruto-fe.module
- https://raw.githubusercontent.com/r666bc/minis-qx/main/Scripts/Shadowrocket/tachimanga.module

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
└── Rules/               → 分流/去廣告規則（.list / .conf）
```

## 📐 腳本格式規範

參考業界主流規範（[blackmatrix7](https://github.com/blackmatrix7/ios_rule_script)、[deezertidal](https://github.com/deezertidal/shadowrocket-rules)、[fmz200](https://github.com/fmz200/wool_scripts)）：

| 工具 | 格式 | 要點 |
|------|------|------|
| **JS 腳本** | `.js` | 純 JS 代碼，不含 `[rewrite_local]` / `[mitm]` 等註釋 |
| **Quantumult X** | `.conf` | `#!name=` 開頭 metadata，直接寫 rewrite 規則 + `hostname =` |
| **Surge** | `.sgmodule` | `[Script]` + `[MITM]` 區段，MITM 用 `%APPEND%` |
| **Loon** | `.plugin` | `[Script]` + `[MITM]` 區段 |
| **Shadowrocket** | `.module` | `[Script]` + `[MITM]` 區段，`requires-body=1` |
| **JS URL** | raw CDN | 全部使用 `raw.githubusercontent.com`（QX 只認 raw CDN） |
