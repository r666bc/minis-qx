# minis-qx

Minis 自動分析 HAR 後生成的改寫腳本與規則。

支援工具：Quantumult X · Surge · Loon

## 目錄

```
scripts/                → .js 改寫腳本（raw URL 直接訂閱）
rules/                  → 去廣告/改寫規則
.qx/                    → QX 專用配置（snippet/conf）
.surge/                 → Surge 配置（sgmodule）
.loon/                  → Loon 配置（plugin）
reports/                → HAR 分析報告
docs/                   → 使用說明
```

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
或手動加入 rewrite + mitm 規則。

### Surge
導入 sgmodule：
- [naruto-fe.sgmodule](.surge/naruto-fe.sgmodule)
- [tachimanga_premium.sgmodule](.surge/tachimanga_premium.sgmodule)
（Surge → 模組 → 安裝新模組）

### Loon
導入 plugin：
- [naruto-fe.plugin](.loon/naruto-fe.plugin)
- [tachimanga_premium.plugin](.loon/tachimanga_premium.plugin)
（Loon → 插件 → 從 URL 安裝）

## 原始 raw URL

### JavaScript 腳本（直接訂閱用）
```
https://cdn.jsdelivr.net/gh/r666bc/minis-qx@main/scripts/naruto-fe-vip.js
https://cdn.jsdelivr.net/gh/r666bc/minis-qx@main/scripts/tachimanga_premium.js
```

### QX Snippet
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.qx/tachimanga_premium.snippet
```

### Surge 模組
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.surge/tachimanga_premium.sgmodule
```

### Loon 插件
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.loon/tachimanga_premium.plugin
```
