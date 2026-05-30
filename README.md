# minis-qx

Minis 自動分析 HAR 後生成的改寫腳本與規則。

支援工具：Quantumult X · Surge · Loon

## 腳本規範

倉庫內所有檔案遵循以下規範：

- **`scripts/*.js`** — 純 JS 代碼，不含 `[rewrite_local]` / `[mitm]` 等註釋，可直接 raw URL 訂閱
- **`.qx/*.snippet`** — QX 專用 snippet，內含 `[rewrite_local]` + `[mitm]`
- **`.surge/*.sgmodule`** — Surge 模組
- **`.loon/*.plugin`** — Loon 插件
- **所有 JS 引用 URL 使用 `raw.githubusercontent.com`** — QX 只認 raw CDN，不用 jsDelivr

## 腳本清單

| 腳本 | App | 功能 | 工具 |
|------|-----|------|------|
| [naruto-fe-vip.js](scripts/naruto-fe-vip.js) | 火影忍者社區 | VIP 解鎖 | QX/Surge/Loon |
| [tachimanga_premium.js](scripts/tachimanga_premium.js) | Tachimanga | Premium 破解 | QX/Surge/Loon |

## 各工具快速配置

### Quantumult X
導入 snippet：
- [naruto-fe.snippet](.qx/naruto-fe.snippet)
- [tachimanga_premium.snippet](.qx/tachimanga_premium.snippet)
（QX → 設定 → 下載 → 從 URL 下載配置）

## raw URL 一覽

### JavaScript 腳本
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/scripts/naruto-fe-vip.js
https://raw.githubusercontent.com/r666bc/minis-qx/main/scripts/tachimanga_premium.js
```

### QX Snippet
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.qx/naruto-fe.snippet
https://raw.githubusercontent.com/r666bc/minis-qx/main/.qx/tachimanga_premium.snippet
```

### Surge 模組
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.surge/naruto-fe.sgmodule
https://raw.githubusercontent.com/r666bc/minis-qx/main/.surge/tachimanga_premium.sgmodule
```

### Loon 插件
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.loon/naruto-fe.plugin
https://raw.githubusercontent.com/r666bc/minis-qx/main/.loon/tachimanga_premium.plugin
```

## 目錄結構

```
scripts/                → .js 改寫腳本（純 JS，raw URL 直接訂閱）
.qx/                    → QX snippet（引用 raw.githubusercontent.com）
.surge/                 → Surge sgmodule
.loon/                  → Loon plugin
reports/                → HAR 分析報告
docs/                   → 使用說明
```

> ⚠️ 注意：snippet/sgmodule/plugin 中引用的 JS URL 全部使用 `raw.githubusercontent.com`。  
> QX 只認 raw CDN，使用 jsDelivr 會導致腳本加載失敗。
