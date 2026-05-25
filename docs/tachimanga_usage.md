# Tachimanga Premium 破解 — 使用說明

## 適用工具
Quantumult X / Surge / Loon / Shadowrocket / Stash

## 破解原理
攔截 `api3.tachimanga.app/api/info/fetch` 的回應，將 `syncInfo: null` 偽造成有效的 Premium 購買記錄。

## 安裝方式

### Quantumult X
**直接訂閱 snippet**：
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.qx/tachimanga_premium.snippet
```

**手動設定**：
```
[rewrite_local]
^https:\/\/api3\.tachimanga\.app\/api\/info\/fetch url script-response-body tachimanga_premium.js

[mitm]
hostname = api3.tachimanga.app, *.tachimanga.app
```

### Surge
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.surge/tachimanga_premium.sgmodule
```

### Loon
```
https://raw.githubusercontent.com/r666bc/minis-qx/main/.loon/tachimanga_premium.plugin
```

## 注意事項
1. 需要安裝並信任 MITM 憑證
2. 如果無效，可能是 App 有本地驗證（UserDefaults/Keychain），建議重新抓包時操作 Premium 頁面
