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
