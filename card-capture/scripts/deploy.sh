#!/bin/bash

# 디버깅용 출력
echo "Current directory: $(pwd)"
echo "Contents of /home/ec2-user:"
ls -l /home/ec2-user
echo "Does build.zip exist?"
[ -f "/home/ec2-user/build.zip" ] && echo "Yes" || echo "No"

# 기존 파일 삭제
if [ -d "/home/ec2-user/card-capture-fe" ]; then
    echo "Deleting existing card-capture-fe directory..."
    sudo rm -rf /home/ec2-user/card-capture-fe/*
else
    echo "Directory /home/ec2-user/card-capture-fe does not exist. Creating a new one..."
fi

# 새로운 폴더 생성
mkdir -p /home/ec2-user/card-capture-fe

# 환경 변수 설정 (루트 권한 사용하여 파일 생성)
echo "Setting environment variables..."
sudo sh -c "echo 'NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}' > /home/ec2-user/card-capture-fe/.env"

# 빌드된 파일 복사
if [ -f "/home/ec2-user/build.zip" ]; then
    echo "Copying build.zip to card-capture-fe directory..."
    cp /home/ec2-user/build.zip /home/ec2-user/card-capture-fe/
else
    echo "Error: build.zip not found in /home/ec2-user/"
    exit 1
fi

cd /home/ec2-user/card-capture-fe

# zip 파일 압축 해제
echo "Unzipping build.zip..."
unzip -o build.zip

# 압축 해제된 후 build.zip 파일 삭제
echo "Removing build.zip..."
rm build.zip

# 빌드 수행
echo "Building the repository..."
NODE_OPTIONS=--max-old-space-size=8192 npm run build # 빌드 시 메모리 한도 적용

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
