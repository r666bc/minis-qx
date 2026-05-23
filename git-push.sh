#!/bin/sh
# 自動推送腳本 — 由 minis 調用
# 用法: cd /var/minis/workspace/minis-qx && sh git-push.sh "更新描述"

cd "$(dirname "$0")"

msg="${1:-自動更新 $(date '+%Y-%m-%d %H:%M')}"

git add -A
if git diff --cached --quiet; then
    echo "沒有變更，跳過推送"
    exit 0
fi

git commit -m "$msg"
git push origin main
echo "✅ 推送完成: $msg"
