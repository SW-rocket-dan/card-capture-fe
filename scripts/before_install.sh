#!/bin/bash

# 기존 폴더가 있으면 삭제
if [ -d "/home/ec2-user/app" ]; then
    rm -rf /home/ec2-user/app
fi

# 새로운 폴더 생성
mkdir -p /home/ec2-user/app
