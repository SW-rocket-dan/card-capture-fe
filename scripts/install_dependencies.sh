#!/bin/bash

cd /home/ec2-user/card-capture-fe/card-capture
npm install

# 환경 변수 설정
echo "NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}" > .env

# 빌드
NODE_OPTIONS=--max-old-space-size=8192 npm run build
