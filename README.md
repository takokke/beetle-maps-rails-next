# beetle-maps-ver.2

## 概要
このアプリは、カブトムシやクワガタを見つけた場所をみんなに共有できるWebアプリケーションです。
私は現在とても自然豊かな場所に住んでおり、友達とよくカブトムシを探しにいっています。
しかし、カブトムシがどこで獲れるかネットで調べても、大まかな地域しか知ることができずに、具体的な場所を共有するサイトはありません。
友人の「カブトムシを見つけたいけど、どこにおるか分からん」という話を聞いたのがきっかけで開発しました。

## URL
https://beetle-maps.vercel.app

## 使用技術
- バックエンド技術
    - RailsAPI
    - Nginx
    - MySQL

- フロントエンド技術
    - Next.js
    - MUI

- インフラ
    - Vercel
    - AWS
        - VPC
        - ECS(Fargate)
        - ECR
        - RDS
        - Route53
        - ACM
        - S3

## 設計図
- [インフラの設計](https://drive.google.com/file/d/1YV0fLhevri97cmt0jGy6ZM03aG8v7T9R/view?usp=sharing)
- [ER図](https://drive.google.com/file/d/1N4TVCman62Den7zuJCm6MzP21jmxTAan/view?usp=sharing)
- [ワイヤーフレーム](https://drive.google.com/file/d/1HKXpgER2BpMx9Z4zozPHb8W9DDngg1BA/view?usp=sharing)

## 技術的な変更点

### R5 11/3 フロントエンドをAWS FargateからVercelに変更
理由: AWSの無料期間が過ぎ、料金が跳ね上がったため。
バックエンドに関しては、今月の料金を様子見。
Herokuへの移行も考える。