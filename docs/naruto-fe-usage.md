# naruto-fe 火影忍者社區 — 改寫說明

## 小程式資訊

- **名稱**: naruto-fe v1.0.0
- **框架**: uni-app (mp-weixin)
- **後端**: 騰訊雲 uniCloud (`env-00jxgsbzdqch`)
- **設備**: iPhone 14, iOS 17.3.1, WeChat 8.0.69

## 改寫腳本

### 腳本路徑
`scripts/naruto-fe-vip.js`

### 功能
攔截 `uni-id-users` 集合查詢，將 `vip` 欄位從 0 改為 1，並追加會員頭銜。

### 各工具配置

#### Quantumult X
```
[rewrite_local]
^https?://env-00jxgsbzdqch\.api-hz\.cloudbasefunction\.cn/functions/invokeFunction url script-response-body https://raw.githubusercontent.com/r666bc/minis-qx/main/scripts/naruto-fe-vip.js

[mitm]
hostname = env-00jxgsbzdqch.api-hz.cloudbasefunction.cn
```

> 或直接導入 `.qx/naruto-fe.snippet`

#### Surge
```
[Script]
naruto-fe-vip = type=http-response, pattern=^https?://env-00jxgsbzdqch\.api-hz\.cloudbasefunction\.cn/functions/invokeFunction, script-path=https://raw.githubusercontent.com/r666bc/minis-qx/main/scripts/naruto-fe-vip.js, requires-body=true

[MITM]
hostname = env-00jxgsbzdqch.api-hz.cloudbasefunction.cn
```

#### Loon
```
[Script]
http-response ^https?://env-00jxgsbzdqch\.api-hz\.cloudbasefunction\.cn/functions/invokeFunction script-path=https://raw.githubusercontent.com/r666bc/minis-qx/main/scripts/naruto-fe-vip.js

[MITM]
hostname = env-00jxgsbzdqch.api-hz.cloudbasefunction.cn
```

## 腳本原理

所有 API 走同一個端點 `/functions/invokeFunction`，透過請求 body 的 `$db` 指令區分集合。
腳本檢查 `collection === "uni-id-users"` 時才進行改寫，避免干擾其他正常請求。

## 資料庫集合

| 集合 | 用途 |
|------|------|
| UGC-comment | 評論列表（首屏核心） |
| uni-id-users | 用戶資料（vip/頭銜） |
| UGC-postcard | 明信片/帖子 |
| UGC-score | 評分記錄 |
| UGC-signin-logs | 簽到記錄 |
| activation-code | 激活碼 |

## 分析報告

完整分析報告見 `reports/weapp_har_analysis.md`
