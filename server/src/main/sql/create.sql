create table users
(
    name     text           not null    constraint users_pk     primary key,
    password text           not null
);

create table tokens
(
    token        text      not null     constraint token_pk     primary key,
    name         text                   constraint name         references users    on update cascade,
    creationDate timestamp not null
);

create table cards
(
    id          integer     not null        constraint card_pk      primary key autoincrement,
    mode        text        not null,
    path        text        not null,
    category    text
);

create unique index users_name_uindex on users (name);
create unique index token_token_uindex on token (token);