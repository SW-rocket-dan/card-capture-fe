#!/bin/bash


# 환경 변수 설정 (루트 권한 사용하여 파일 생성)
echo "Setting environment variables..."
sudo sh -c "echo 'NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}' > /home/ec2-user/card-capture-fe/.env"

# 기존 PM2 프로세스 삭제
echo "Deleting existing PM2 process..."
pm2 delete card-capture || true

# PM2로 애플리케이션 시작
echo "Starting application with PM2..."
NODE_OPTIONS=--max-old-space-size=8192 pm2 start npm --name "card-capture" -- start # PM2 시작 시 메모리 한도 적용

# PM2 설정 저장
echo "Saving PM2 configuration..."
pm2 save

# PM2를 부팅 시 시작하도록 설정
echo "Setting PM2 to start on boot..."
pm2 startup | tail -n 1 | sudo bash

echo "Deployment script completed."
