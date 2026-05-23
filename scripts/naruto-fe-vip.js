// naruto-fe 會員解鎖腳本
// 自動生成於 2026-05-23
// 後端: env-00jxgsbzdqch.api-hz.cloudbasefunction.cn

const url = $request.url;
if (!url.includes('api-hz.cloudbasefunction.cn/functions/invokeFunction')) {
    $done({});
    return;
}

try {
    const body = JSON.parse($request.body);
    const cmd = body.command || {};
    const dbCmds = cmd.$db || [];
    
    let collection = '';
    for (const c of dbCmds) {
        if (c.$method === 'collection') {
            collection = c.$param[0];
            break;
        }
    }
    
    if (collection === 'uni-id-users') {
        let resp = JSON.parse($response.body);
        if (resp.data && resp.data.length > 0) {
            const user = resp.data[0];
            user.vip = 1;
            // vip: 0→非會員, 1→會員, 或其他值
            // 如果還需要其他欄位:
            // user.vip_level = 1;
            // user.vip_expire = 4102444800000; // 2100年
            if (!user.hadtitle) user.hadtitle = [];
            if (!user.hadtitle.includes('vip_member')) {
                user.hadtitle.push('vip_member');
            }
            $done({body: JSON.stringify(resp)});
            return;
        }
    }
    
    $done({});
} catch (e) {
    $done({});
}
