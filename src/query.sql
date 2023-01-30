create database final_challenge;

drop table if exists users cascade;
create table users (
    id serial primary key,
    name text not null,
    email text unique not null,
    image text,
    cpf text unique,
    phone text,
    password text not null
);

drop table if exists clients cascade;
create table clients (
    id serial primary key,
    name text not null,
    email text not null,
    cpf varchar(14) not null,
    phone text not null,
    date timestamptz default now(),
    charge_status boolean default true
);

drop table if exists client_address cascade;
create table client_address (
    id serial primary key,
    client_id int,
    street text,
    district text,
    city text ,
    state text ,
    zip_code text ,
    address_complement text,
    foreign key (client_id) references clients(id)
);

drop table if exists charges;
create table charges (
 	id serial primary key,
  	client_id int not null,
  	description text not null,
  	status boolean not null,
  	value int not null,
  	dueDate TIMESTAMPTZ not null,
  	foreign key (client_id) references clients(id)
);