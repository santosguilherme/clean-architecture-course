drop schema cac cascade;
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

create table cac.ride (
	ride_id uuid primary key,
	passenger_id uuid,
	driver_id uuid,
	from_lat numeric,
	from_long numeric,
	to_lat numeric,
	to_long numeric,
	status text,
	request_date timestamp,
	accept_date timestamp,
	start_date timestamp,
	end_date timestamp,
	price numeric
);

create table cac.transaction (
	transaction_id uuid primary key,
	name text,
	email text,
	amount numeric
)