// Tachimanga Premium 破解 — 攔截 info/fetch 端點
// Quantumult X rewrite 腳本
// 端點: POST https://api3.tachimanga.app/api/info/fetch
// 手法: 偽造 syncInfo 購買記錄

const url = $request.url;
const method = $request.method;

if (url.includes('/api/info/fetch') && method === 'POST') {
  if (typeof $response !== 'undefined' && $response.body) {
    let body = JSON.parse($response.body);
    
    if (body.data) {
      // ====== 偽造 Premium 購買資訊 ======
      const fakePurchase = {
        "purchased": true,
        "productId": "com.mangacrush.ios.premium",
        "purchaseDate": 1779000000000,
        "expiryDate": 4102444800000,
        "isTrial": false,
        "autoRenew": true,
        "originalTransactionId": "2000000587654321",
        "transactionId": "2000000587654321"
      };
      
      body.data.syncInfo = fakePurchase;
      
      // 根據 dataKey 追加對應偽造欄位
      if (body.data.dataKey === "PURCHASE_INFO") {
        body.data.premium = true;
        body.data.premiumExpiry = 4102444800000;
        body.data.premiumFeatures = [
          "ad_free",
          "auto_backup",
          "icloud_sync",
          "custom_themes",
          "extended_history"
        ];
      }
      
      if (body.data.dataKey === "SYNC_INFO") {
        body.data.lastSync = 1779692957000;
        body.data.syncEnabled = true;
        body.data.cloudBackup = true;
      }
      
      $done({body: JSON.stringify(body)});
    } else {
      $done({});
    }
  } else {
    $done({});
  }
} else {
  $done({});
}
