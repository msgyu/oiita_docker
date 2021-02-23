# 開発環境
* __フロントエンド__
  * __Vue.js 2.6.12__

* __バックエンド__
  * __PHP 7.4.14__
  * __Laravel 6.20.15__
  
* __インフラ__
  * __Docker 20.10.0 / docker-compose 1.27.4__
  * __nginx 1.18.0e__
  * __mysql 5.7.33__


## ディレクトリ構造

```
.
├── README.md
├── docker
│   ├── nginx
│   │   └── default.conf
│   └── php
│       ├── Dockerfile
│       └── php.ini
├── docker-compose.yml
└── laravel
```

## Dockerコンテナの構成について

以下の4つのコンテナで構成されています。

1. Webサーバー用コンテナ（nginx）　　　　　　　　→ コンテナ名： `web2`
1. アプリ用コンテナ（PHP/Laravel, Vue.js）　　　　→ コンテナ名： `web2`
1. DBコンテナ（mysql）　　　　　　　　　　　　　→ コンテナ名： `db2`
1. DB管理ツールコンテナ（phpMyAdmin）　　　　　→ コンテナ名： `phpmyadmin2`


## 各種接続情報

### local環境

- アプリURL：http://localhost:8888/
- DB管理画面(phpMyAdmin)：http://localhost:7777/
  - DB接続情報
  ```
  DB_CONNECTION=mysql
  DB_HOST=db2
  DB_PORT=3306
  DB_DATABASE=Self_Analysis_App
  DB_USERNAME=root
  DB_PASSWORD=root
  DB_PASSWORD_ROOT=root
  ```

### 本番環境

- アプリURL：http://13.113.141.150/
- DB接続情報　→本番環境のDBへアクセスするには、EC２経由でRDSに接続する必要があります。
```
DB_CONNECTION=mysql
DB_HOST=self-analysis-app.cxkogv00pcbi.ap-northeast-1.rds.amazonaws.com
DB_PORT=3306
DB_DATABASE=Self_Analysis_App
DB_USERNAME=root
DB_PASSWORD=pmPyB82c39gH
```


## Set Up

- git clone
```
$ git clone https://github.com/ngsw877/Self_Analysis_App.git
$ cd Self_Analysis_App
```

- .envを2つ、作成してください

  - ①ルート直下に作成

  - ②/laravelディレクトリ直下に作成

```
.
├── README.md
├── .env  // ①ルート直下に作成
├── docker
│   ├── nginx
│   │   └── default.conf
│   └── php
│       ├── Dockerfile
│       └── php.ini
├── docker-compose.yml
└── laravel
    ├── README.md
    ├── app
    ├── .env  // ② /laravelディレクトリ直下に作成
    ├── 以下略
        
```

- ①の .env
```
DB_DATABASE=Self_Analysis_App
DB_USERNAME=root
DB_PASSWORD=root
DB_PASSWORD_ROOT=root
TZ='Asia/Tokyo'
```

- ②の .env
```
APP_NAME=Self_Analysis_App
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8888

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=db2
DB_PORT=3306
DB_DATABASE=Self_Analysis_App
DB_USERNAME=root
DB_PASSWORD=root
DB_PASSWORD_ROOT=root

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=cookie
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

```

### コンテナを立ち上げ、app2コンテナに入る

 ```
 $ docker-compose up -d --build
 
 $ docker-compose exec app2 bash
 ```

- vendorディレクトリの作成

`$ composer install`


- アプリケーションキーの初期化

`$ php artisan key:generate`

- マイグレーション実行

`$ php artisan migrate`

- npmパッケージのインストール（Vue.js）

`$ npm install`


### Laravelのウェルカムページが開くかを確認

http://localhost:8888/

<br>
<img width="1213" alt="スクリーンショット 2021-01-30 23 29 16" src="https://user-images.githubusercontent.com/58071320/106359018-f98a7180-6352-11eb-88d5-b948b887f917.png">

<br>

### phpMyAdminへの接続

http://localhost:7777/

<br>
<img width="1370" alt="スクリーンショット 2021-01-30 23 31 00" src="https://user-images.githubusercontent.com/58071320/106359036-37879580-6353-11eb-844b-ac78297d6702.png">
<br>

以上でSet Upは完了です！


## How To

- コンテナを立ち上げる
`$ docker-compose up -d`

- コンテナを停止する
`$ docker-compose stop`

- コンテナを削除する
`$ docker-compose down`

- コンテナのステータスを確認する
`$ docker-compose ps`

- コンテナに入る
  - app2コンテナ
  `$ docker-compose exec app2 bash`
  
  - db2コンテナ
  `$ docker-compose exec db2 bash`

#### ※php artisanコマンドや、npmコマンドは基本的に `app2コンテナ` に入って実行してください。
