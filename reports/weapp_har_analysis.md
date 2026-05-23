# 微信小程式 HAR 分析報告 — 火影忍者社區

> 抓包來源：Quantumult X (2026-05-23 18:10)
> 數據庫：`env-00jxgsbzdqch.api-hz.cloudbasefunction.cn` (uniCloud / 騰訊雲開發)

---

## 一、全域概覽

| 項目 | 數值 |
|------|------|
| 總請求數 | **53** |
| 成功(200) | **53** (100%) |
| POST / GET | 43 / 10 |
| 圖片請求 | 10 (mmbiz.qpic.cn/sz_mmbiz_qpic) |
| API 請求 | 7 (invokeFunction) |
| 微信 mmtls 加密通道 | 36 |

### 域名分佈

```
hkminorshort.weixin.qq.com      22x  (微信短連結/mmttls加密通道)
hkextshort.weixin.qq.com        14x  (微信擴展短連結/mmttls通道)
mmbiz.qpic.cn                   10x  (圖片資源)
env-00jxgsbzdqch.api-hz.cloudbasefunction.cn  7x  (核心業務API)
```

### 設備環境

| 項目 | 數值 |
|------|------|
| 框架 | uni-app (mp-weixin), uniCompilerVersion 4.87 |
| App | naruto-fe v1.0.0 (APPID: `__UNI__7E170B4`) |
| 設備 | iPhone 14 (iPhone14,7) / iOS 17.3.1 |
| 微信版本 | 8.0.69 |
| 語言 | zh-Hant |
| 場景值 | 1089 (微信聊天頁面打開) |
| 後端 | 騰訊雲開發 uniCloud |
| JWT | uniIdToken, HS256, 72h有效期 |

---

## 二、業務 API 分析

所有業務 API 走同一個雲函數端點：
```
POST https://env-00jxgsbzdqch.api-hz.cloudbasefunction.cn/functions/invokeFunction
```

### 2.1 資料庫集合一覽

| 集合名稱 | 用途 | 請求數 |
|----------|------|--------|
| **UGC-comment** | 評論列表（首屏最核心） | 1 (大量評論ID) |
| **uni-id-users** | 用戶資料（日誌日期 + VIP/頭銜） | 2 |
| **UGC-postcard** | 明信片/帖子列表（空） | 1 |
| **UGC-score** | 評分記錄（空） | 1 |
| **UGC-signin-logs** | 簽到記錄 | 1 |
| **activation-code** | 激活碼查詢（code:"11"） | 1 |

### 2.2 值得注意的端點細節

#### 🔑 用戶身份 (`uni-id-users` — #49)
```
請求欄位: used_code, hadtitle, vip
回應: { "hadtitle": ["1204"], "vip": 0 }
```
- `vip: 0` → 非會員用戶
- `hadtitle: ["1204"]` → 有頭銜 ID 1204

#### 📝 用戶日誌日期 (`uni-id-users` — #47)
```
請求欄位: like_log_date, comment_log_date, complaint_log_date
回應: 三個日期均為 1751025599000 (2025-06-27)
```
這三個字段是**用戶最後操作時間戳**，用於判斷是否需要顯示新內容。

#### 💬 評論列表 (`UGC-comment` — #48)
- 查詢條件：`env=release`, `reply_user_id=null`(只看根評論), `status=true`, `comment_date >= 2025-06-27`
- 返回：**大量評論 ID**（僅 `_id` 字段），無具體內容
- 這是首屏最核心的請求 — 拉取所有根評論列表

#### 📮 帖子列表 (`UGC-postcard` — #45)
- 查詢條件：`env=release`, `status=1`, `type=0`, `user_id=xxx`
- 查詢欄位：`_id, images, like_count, comment_count, title, content, publish_date`
- 排序：`publish_date desc`
- 分頁：`skip=0, limit=8`
- 回應：**空資料** → 該用戶尚未發布任何帖子

#### ⭐ 評分記錄 (`UGC-score` — #44)
- 查詢條件：`env=release`, `score_status=true`, `user_id=xxx`
- 僅查 `_id` 欄位
- 回應：空 → 用戶無評分

#### ✅ 簽到記錄 (`UGC-signin-logs` — #46)
- 查詢條件：`user_id=xxx`, `time > 2026-05-23`, `task_type=2`
- 返回一條記錄（2026-05-18 簽到 +10 金幣）

#### 🎫 激活碼 (`activation-code` — #50)
- 查詢 `code:"11"` → 空結果
- 這可能是輸入激活碼的查詢（code="11" 只是試探）

---

## 三、發現的開發者資訊

```
AppID:       __UNI__7E170B4
AppName:     naruto-fe
版本:        1.0.0 (code: 100)
雲開發ID:    env-00jxgsbzdqch
後端:        騰訊雲 uniCloud
框架:        uni-app 4.87 (mp-weixin)
```

---

## 四、潛在的改寫點分析

### P0 — VIP 解鎖
**端點**: `uni-id-users` — 用戶文檔直接查詢
**欄位**: `vip` (目前 = 0)
**回應操作**:
```javascript
// QX rewrite: 攔截 invokeFunction 回應
let body = JSON.parse($response.body);
// 檢查是否為 uni-id-users 查詢含 vip 欄位
if (JSON.stringify($request.body).includes('"vip"')) {
    let data = body.data;
    if (data && data.length > 0) {
        data[0].vip = 1;      // 或 2/3
        data[0].hadtitle = ["1204", "vip1", "svip"];  // 追加頭銜
    }
    $done({body: JSON.stringify(body)});
} else {
    $done({});
}
```

**注意**: 因為所有 API 走同一個 `/functions/invokeFunction` 端點，需要根據請求 body 中的 collection 名稱來條件攔截。

### P1 — 評論/帖子內容解鎖
**端點**: `UGC-comment` — 目前只返回 `_id`
**潛力**: 修改查詢欄位參數，看服務器是否會返回完整內容（可能受後端權限控制）

### P2 — 去廣告
目前抓包**未觀察到廣告請求**（P3 級別），可能廣告在其他端點或走不同域名。

---

## 五、通用 QX 改寫腳本模板

```javascript
// naruto-fe 改寫腳本
const url = $request.url;
const method = $request.method;
const body = $request.body ? JSON.parse($request.body) : {};

// 只攔截雲函數調用
if (url.includes('api-hz.cloudbasefunction.cn/functions/invokeFunction')) {
    const cmd = body.command || {};
    const dbCmds = cmd.$db || [];
    
    // 提取 collection 名稱
    let collection = '';
    for (const c of dbCmds) {
        if (c.$method === 'collection') {
            collection = c.$param[0];
            break;
        }
    }
    
    // === VIP 解鎖 ===
    if (collection === 'uni-id-users') {
        let resp = JSON.parse($response.body);
        if (resp.data && resp.data.length > 0) {
            resp.data[0].vip = 1;         // 解鎖 VIP
            resp.data[0].hadtitle.push('vip_member');  // 追加頭銜
        }
        $done({body: JSON.stringify(resp)});
        return;
    }
    
    // === UGC 內容（可擴展） ===
    // TODO: 根據後續測試添加
    
    $done({});
} else {
    $done({});
}
```

---

## 六、MITM 配置

```
[mitm]
hostname = env-00jxgsbzdqch.api-hz.cloudbasefunction.cn, mmbiz.qpic.cn
```

---

*分析完成。目前 `vip: 0` 是最直接的改寫點，但需注意 uni-id-users 的文檔級查詢 — 直接改回應即可生效。*
