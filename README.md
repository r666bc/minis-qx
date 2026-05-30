# minis-qx

Minis 自動分析 HAR 後生成的代理工具改寫腳本與規則。

**支援工具**：Quantumult X · Surge · Loon · Shadowrocket

## 目錄結構

```
Scripts/
├── JS/              → 純 JS 腳本（raw URL 直接訂閱）
├── QX/              → Quantumult X 配置（.conf）
├── Surge/           → Surge 模組（.sgmodule）
├── Loon/            → Loon 插件（.plugin）
└── Shadowrocket/    → Shadowrocket 模組（.module）
```

## 腳本格式說明

參考業界主流規範（blackmatrix7、deezertidal、fmz200）：

- **JS 腳本**：純 JavaScript 代碼，不含 `[rewrite_local]` / `[mitm]` 等註釋
- **QX .conf**：`#!name=` 開頭 metadata，直接寫 rewrite 規則 + `hostname =`
- **Surge .sgmodule**：`[Script]` + `[MITM]` 區段
- **Loon .plugin**：`[Script]` + `[MITM]` 區段
- **Shadowrocket .module**：`[Script]` + `[MITM]` 區段（`requires-body=1`）
- **所有 JS URL 使用 `raw.githubusercontent.com`**（QX 只認 raw CDN）

## 腳本清單

| App | 功能 | JS 腳本 | QX | Surge | Loon | Shadowrocket |
|-----|------|---------|----|-------|------|-------------|
| 火影忍者社區 | VIP 解鎖 | [JS](Scripts/JS/naruto-fe-vip.js) | [conf](Scripts/QX/naruto-fe.conf) | [sgmodule](Scripts/Surge/naruto-fe.sgmodule) | [plugin](Scripts/Loon/naruto-fe.plugin) | [module](Scripts/Shadowrocket/naruto-fe.module) |
| Tachimanga | Premium 破解 | [JS](Scripts/JS/tachimanga_premium.js) | [conf](Scripts/QX/tachimanga.conf) | [sgmodule](Scripts/Surge/tachimanga.sgmodule) | [plugin](Scripts/Loon/tachimanga.plugin) | [module](Scripts/Shadowrocket/tachimanga.module) |

## 導入方式

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
