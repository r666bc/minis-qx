/*
Tachimanga Premium 破解
[rewrite_local]
^https:\/\/api3\.tachimanga\.app\/api\/info\/fetch url script-response-body https://cdn.jsdelivr.net/gh/r666bc/minis-qx@main/scripts/tachimanga_premium.js

[mitm]
hostname = api3.tachimanga.app, *.tachimanga.app
*/

const url = $request.url;
const method = $request.method;

if (url.includes('/api/info/fetch') && method === 'POST') {
  if (typeof $response !== 'undefined' && $response.body) {
    let body = JSON.parse($response.body);
    
    if (body.data) {
      body.data.syncInfo = {
        "purchased": true,
        "productId": "com.mangacrush.ios.premium",
        "purchaseDate": 1779000000000,
        "expiryDate": 4102444800000,
        "isTrial": false,
        "autoRenew": true,
        "originalTransactionId": "2000000587654321",
        "transactionId": "2000000587654321"
      };
      
      body.data.premium = true;
      body.data.premiumExpiry = 4102444800000;
      
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
