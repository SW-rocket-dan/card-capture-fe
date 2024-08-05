#!/bin/bash

cd /home/ec2-user/card-capture-fe/card-capture

# PM2 프로세스 삭제
pm2 delete card-capture || true

# PM2로 앱 시작
NODE_OPTIONS=--max-old-space-size=8192 pm2 start npm --name "card-capture" -- start

# PM2 설정 저장
pm2 save

# PM2 부팅 시 시작 설정
pm2 startup | tail -n 1 | sudo bash
