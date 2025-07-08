# 베이스 이미지 사용
FROM 699475927546.dkr.ecr.ap-northeast-2.amazonaws.com/insurtech-insurance-front-prod-base:latest AS builder

# 작업 디렉토리 설정
WORKDIR /app

ARG BUILD_ENV

# 프로젝트 소스 복사
COPY . .

COPY ./envs/env-$BUILD_ENV .env

# React 애플리케이션 빌드
RUN npm run build

# nginx 최종 이미지 (빌드된 결과물만 복사)
FROM nginx:stable-alpine AS final

WORKDIR /usr/share/nginx/html

# Base 이미지에서 빌드된 결과물을 가져옴
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 파일 복사 (필요한 경우)
COPY default.conf /etc/nginx/conf.d/default.conf

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]