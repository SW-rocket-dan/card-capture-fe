#!/bin/bash

# 기존 폴더가 있으면 삭제
if [ -d "/home/ec2-user/card-capture-fe" ]; then
    rm -rf /home/ec2-user/card-capture-fe
fi

# 새로운 폴더 생성
mkdir -p /home/ec2-user/card-capture-fe

cd /home/ec2-user/card-capture-fe

# 환경 변수 설정
echo "NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}" > .env

# 빌드된 파일을 그대로 사용
unzip -o /home/ec2-user/build.zip -d /home/ec2-user/card-capture-fe

# 서버 시작 (예시)
npm start
