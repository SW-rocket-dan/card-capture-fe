#!/bin/bash

# 기존 파일 삭제
if [ -d "/home/ec2-user/card-capture-fe" ]; then
    sudo rm -rf /home/ec2-user/card-capture-fe/*
fi

# 새로운 폴더 생성
mkdir -p /home/ec2-user/card-capture-fe

cd /home/ec2-user/card-capture-fe

# 환경 변수 설정
sudo sh -c "echo 'NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}' > .env"

# 빌드된 파일이 존재하는지 확인
if [ ! -f "/home/ec2-user/build.zip" ]; then
    echo "Build file not found!"
    exit 1
fi

# 빌드된 파일을 그대로 사용
unzip -o /home/ec2-user/build.zip -d /home/ec2-user/card-capture-fe

# 서버 시작 (예시)
npm start
