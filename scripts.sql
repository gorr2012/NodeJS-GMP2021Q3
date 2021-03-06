create extension if not exists "uuid-ossp"

create table if not exists Users (
	id uuid  primary key unique not null default uuid_generate_v4 (),
	login VARCHAR unique not null,
	password VARCHAR not null,
	age INT CHECK (age >= 4 and age <= 130),
	isDeleted boolean default false
);

insert into users (id, login, password, age, isDeleted) values
('b16dd8e1-1728-4ea9-90fd-f36a0af861b1', 'Max Gitovich', 'qwerty123456', 15, false),
('b16dd8e1-1728-4ea9-90fd-f36a0af861b2', 'Sergey Gitovich', 'qwerty123456', 35, false),
('b16dd8e1-1728-4ea9-90fd-f36a0af861b3', 'Dina Gitovich', 'qwerty123456', 32, false),
('b16dd8e1-1728-4ea9-90fd-f36a0af861b4', 'Dima Gitovich', 'qwerty123456', 64, false),
('b16dd8e1-1728-4ea9-90fd-f36a0af861b5', 'Alexander', 'qwerty123456', 41, false);

CREATE TYPE permissions AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

insert into "groups" (id, name, permissions) values
('b16dd8e1-1728-4ea9-91fd-f36a0af861b1', 'admin', '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}'),
('b16dd8e1-1728-4ea9-92fd-f36a0af861b1', 'manager', '{"READ", "WRITE", "DELETE"}'),
('b16dd8e1-1728-4ea9-93fd-f36a0af861b1', 'customer', '{"READ", "UPLOAD_FILES"}'),
('b16dd8e1-1728-4ea9-94fd-f36a0af861b1', 'other', '{"READ"}'),
('b16dd8e1-1728-4ea9-95fd-f36a0af861b1', 'content', '{"READ", "WRITE", "DELETE", "UPLOAD_FILES"}');
