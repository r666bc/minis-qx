// naruto-fe VIP 解鎖腳本
// raw URL: https://raw.githubusercontent.com/r666bc/minis-qx/main/scripts/naruto-fe-vip.js

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
