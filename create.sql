drop table cac.passenger;
drop schema cac;
create schema cac;

create table cac.passenger (
  passenger_id uuid primary key,
  name text,
  email text,
  document text
);

create table cac.driver (
  driver_id uuid primary key,
  name text,
  email text,
  document text,
  car_plate text
);