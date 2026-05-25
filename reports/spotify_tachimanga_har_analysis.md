# HAR 分析報告 — Spotify + Tachimanga

> 來源：Quantumult X HAR 抓包（2026-05-25 07:08 UTC）
> 共 61 個請求，歷時 ~48 秒

---

## 1. 涉及 App

### 1.1 Spotify iOS v9.0.18.548
- **User-Agent**: `Spotify/9.0.18.548 iOS/Version 17.3.1 (Build 21D61)`
- **設備**: iPhone 14,7 (iPhone SE 3rd gen)
- **帳戶**: `312q5u6axdxzbwpryieswwuuyopu`
- **授權**: Bearer Token（2 個不同 token 出現過）+ client-token
- **主要域名**: `gae2-spclient.spotify.com` (36 req), `spclient.wg.spotify.com` (14 req)
- **回應格式**: 幾乎全部是 **Protobuf**（application/vnd.collection-v2.spotify.proto / application/protobuf / application/octet-stream），僅 4 個 JSON 回應

### 1.2 Tachimanga iOS v4.15 (build 446)
- **User-Agent**: `Tachimanga/446 CFNetwork/1492.0.1 Darwin/23.3.0`
- **Bundle ID**: `com.mangacrush.ios`
- **API**: `api3.tachimanga.app`
- **回應格式**: JSON

---

## 2. Spotify 端點分析

### 問題：Spotify 使用自定義 Protobuf
除了 `apresolve.spotify.com`（accesspoint 列表）和少數端點外，**所有 API 回應均為 Protobuf 編碼**。這意味著：
- ❌ 無法直接讀取回應內容確認會員/訂閱狀態欄位
- ❌ 無法簡單地用 `JSON.parse`/`body.replace` 偽造回應
- ✅ 但如果已知 .proto 定義，仍然可以修改 protobuf 二進制並重新 base64 編碼

### 已識別的關鍵端點

| # | 端點 | 方法 | 大小 | 分析 |
|---|------|------|------|------|
| 2 | `/recently-played/v3/user/{uid}/recently-played` | GET | 0 | 304 Not Modified，有 ETag |
| 5-33 | `/collection/v2/delta` | POST | 17b | 心跳/同步請求，僅含 timestamp |
| 8 | `/user-customization-service/v1/customize` | POST | 60KB | 🔥 **最大回覆，用戶個性化配置**，含 feature flags、自定義選項 |
| 21/51 | `/connect-state/v1/devices/{device_id}` | PUT | 28KB | 設備狀態同步，含當前正在播放的歌曲 |
| 34 | `/device-capabilities/v1/capabilities` | GET | 574b | **JSON 回應** — 裝置能力 |
| 49/56 | `/gabo-receiver-service/v3/events` | POST | 6-78b | 事件追蹤 |
| 58 | `/extended-metadata/v0/extended-metadata` | POST | 70b | 擴展元數據查詢 |

### 唯一 JSON 端點：device-capabilities
```json
{
  "license": "mft",
  "supports_v2_playlist_uris": false,
  "supported_audio_quality": "HIFI",
  "audio_quality": "HIGH",
  ...
}
```
→ 支援 HiFi 品質，但這是裝置能力而非帳戶權限

---

## 3. Tachimanga v4.15 → 潛在破解目標 🎯

### 3.1 核心發現
Tachimanga 使用簡單的 **JSON API**，只有一個端點：

```
POST https://api3.tachimanga.app/api/info/fetch
Content-Type: application/json; charset=utf-8
```

**請求 body**:
```json
{
  "dataKey": "PURCHASE_INFO",
  "callerInfo": {
    "clientTimestamp": 1779692928566,
    "version": "4.15",
    "build": "446",
    "bundleId": "com.mangacrush.ios",
    "deviceId": null,
    "locale": "zh_Hant"
  }
}
```

**當前回覆**:
```json
{
  "data": {
    "dataKey": "PURCHASE_INFO",
    "syncInfo": null
  },
  "code": "SUCCESS"
}
```

**重點**: `syncInfo: null` — 代表沒有購買記錄。

### 3.2 可能的破解方向

#### 方向 A：MITM 修改回覆
如果 Tachimanga 在客戶端用購買狀態決定功能（類似網易雲音樂），則 MITM 攔截並修改回覆即可：

```javascript
// QX rewrite script
let body = JSON.parse($response.body);
body.data.syncInfo = {
  "purchased": true,
  "productId": "com.mangacrush.ios.premium",
  "expiryDate": 4102444800000,  // 2100年
  "isTrial": false
};
$done({body: JSON.stringify(body)});
```

⚠️ 但需進一步確認：
- 是否有其他端點驗證授權
- 是否有本地簽名/校驗
- 是否需要 `syncInfo` 的特定結構

#### 方向 B：更全面的 API 探測
HAR 中只有 `info/fetch` 一個端點，應該嘗試：

```
POST /api/auth/login
POST /api/auth/register
GET  /api/user/profile
POST /api/purchase/verify
GET  /api/premium/status
```

#### 方向 C：Tachimanga 擴展源
HAR 中顯示安裝了 4 個擴展源：
- `everfio/tachiyomi-extensions`
- `keiyoushi/tachiyomi-extensions` (2次請求)
- `suwayomi/tachiyomi-extension`
- `leijie115/tachimanga/main`

Tachimanga 本質上是 Tachiyomi 的 iOS 移植版，其擴展機制、數據庫結構與 Tachiyomi 相似。Premium 功能通常包括：
- 廣告移除
- 自動備份
- iCloud 同步
- 更多主題

---

## 4. 總結：可行性評估

| 目標 | 可行性 | 難度 | 說明 |
|------|--------|------|------|
| **Tachimanga Premium** 🥇 | **中等** | ⭐⭐⭐ | JSON API，回覆結構簡單，但需確認驗證機制和 syncInfo 結構 |
| Spotify Premium/Family | **低** | ⭐⭐⭐⭐⭐ | 全 Protobuf 通信，無 JSON 端點可讀取會員狀態 |
| Spotify 去廣告 | **低** | ⭐⭐⭐⭐ | 廣告請求全走 protobuf/grpc，無法簡單攔截 |

### 建議下一步
1. **嘗試 Tachimanga Premium 破解** — 先做 MITM 攔截回覆修改測試
2. 如有需要，重新抓包時在 Tachimanga 中操作更多功能（進設定頁、點 Premium 按鈕）以暴露更多 API 端點

---

## 附錄：HAR 中 App 活動記錄

從請求時序還原的用戶操作：
1. 07:08:43 — 打開 Spotify（WebSocket dealer 連接，獲取 fortune）
2. 07:08:43 — Spotify 同步 collection delta（多次心跳）
3. 07:08:43 — 搜索「赤と青」（日本語歌曲）
4. 07:08:44 — Spotify 同步設備狀態、播放能力
5. 07:08:47 — 切換到 Tachimanga（purchase info 查詢）
6. 07:08:48 — Tachimanga 檢查同步資訊
7. 07:08:49 — 返回 Spotify（繼續播放/搜尋）
8. 07:09:31 — Tachimanga 再次檢查同步資訊
