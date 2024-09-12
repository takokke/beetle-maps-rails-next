FROM node:20.12.2
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY ./next/package.json /app/package.json
COPY ./next/package-lock.json /app/package-lock.json

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . /app