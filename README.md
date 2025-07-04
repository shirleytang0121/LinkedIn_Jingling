# lnkd-jingling

This application is used as customized linkedin extension.

# Deployment with Docker

```shell
docker build --platform linux/amd64 -t lnkd-jingling .

docker run -p 5005:5000 -e DB_HOST='localhost' -e DB_PORT=3307 -e DB_USER='root' -e DB_PASSWORD='password' -e DB_NAME='lnkd_jingling' lnkd-jingling
```

In this app, there are environment variables needed to set as below.

```
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=${DB_NAME}
```

# Init mysql database

```mysql
create table linkedin_connect
(
    id       int auto_increment
        primary key,
    user_id  int                          not null,
    websites text charset utf8mb4         not null,
    status   int                          null,
    type     varchar(255) charset utf8mb4 null
)
    collate = utf8mb4_unicode_ci;

create table message
(
    id          int auto_increment
        primary key,
    user_id     int                          not null,
    mess        text charset utf8mb4         not null,
    is_select   varchar(1) charset utf8mb4   not null,
    create_time varchar(255) charset utf8mb4 not null
)
    collate = utf8mb4_unicode_ci;

create table to_invite_list
(
    id               bigint auto_increment
        primary key,
    first_name       varchar(255)  null,
    img              varchar(2047) null,
    invite_time      datetime      null,
    last_name        varchar(255)  null,
    position         varchar(255)  null,
    public_id        varchar(255)  null,
    state            smallint      null,
    urn              varchar(255)  null,
    user_linkedin_id bigint        null
)
    collate = utf8mb4_unicode_ci;

create table user
(
    id          int auto_increment
        primary key,
    apn_user_id bigint                       null,
    apn_email   varchar(255) charset utf8mb4 not null,
    password    varchar(255) charset utf8mb4 not null,
    login_code  varchar(255) charset utf8mb4 null
)
    collate = utf8mb4_unicode_ci;

create table user_linkedin_account
(
    id         bigint auto_increment
        primary key,
    user_id    bigint                       not null,
    my_urn     varchar(255) charset utf8mb4  not null,
    public_id  varchar(255) charset utf8mb4  not null,
    first_name varchar(255) charset utf8mb4  null,
    last_name  varchar(255) charset utf8mb4  null,
    img        varchar(2047) charset utf8mb4 null,
    bind_time  datetime                     null,
    unbind     smallint                     null
)
    collate = utf8mb4_unicode_ci;


```


