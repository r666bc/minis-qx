/*************************************

项目名称：naruto-fe 火影忍者社区 解锁VIP
脚本作者：minis-auto
更新日期：2026-05-23
后　 端：腾讯云 uniCloud
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：如果脚本无效，请先排除是否脚本冲突

[rewrite_local]
^https?://env-00jxgsbzdqch\.api-hz\.cloudbasefunction\.cn/functions/invokeFunction url script-response-body https://cdn.jsdelivr.net/gh/r666bc/minis-qx@main/scripts/naruto-fe-vip.js

[mitm]
hostname = env-00jxgsbzdqch.api-hz.cloudbasefunction.cn

*************************************/

var url = $request.url;
if (url.indexOf('api-hz.cloudbasefunction.cn') == -1) {
    $done({});
    return;
}

try {
    var body = JSON.parse($request.body);
    var cmd = body.command || {};
    var dbCmds = cmd.$db || [];
    
    var collection = '';
    for (var i = 0; i < dbCmds.length; i++) {
        if (dbCmds[i].$method === 'collection') {
            collection = dbCmds[i].$param[0];
            break;
        }
    }
    
    if (collection !== 'uni-id-users') {
        $done({});
        return;
    }
    
    var resp = JSON.parse($response.body);
    if (resp.data && resp.data.length > 0) {
        var user = resp.data[0];
        user.vip = 1;
        if (!user.hadtitle) user.hadtitle = [];
        if (user.hadtitle.indexOf('vip_member') == -1) {
            user.hadtitle.push('vip_member');
        }
        $done({body: JSON.stringify(resp)});
    } else {
        $done({});
    }
} catch (e) {
    $done({});
}
