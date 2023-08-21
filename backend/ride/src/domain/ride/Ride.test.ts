import Coord from "../distance/Coord";
import Ride from "./Ride";

test("calculates the price of the ride during the day", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-01T10:00:00")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-01T10:00:00")
  );
  expect(ride.calculate()).toBe(21);
});

test("calculates the price of the ride during the night", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-01T23:00:00")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-01T23:00:00")
  );
  expect(ride.calculate()).toBe(39);
});

test("calculates the price of a ride on Sunday during the day", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-07T10:00:00")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-07T10:00:00")
  );
  expect(ride.calculate()).toBe(29);
});

test("calculates the price of a ride on Sunday during the night", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-07T23:00:00")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-07T23:00:00")
  );
  expect(ride.calculate()).toBe(50);
});

test("throws an error when the date is invalid", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("invalid-date")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("invalid-date")
  );
  expect(() => ride.calculate()).toThrow(new Error("Invalid date"));
});

test("calculates the price of the ride during the day with the minimum price", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-07T23:00:00")
  );
  ride.addPosition(
    -27.579020277800876,
    -48.50838017206791,
    new Date("2021-03-07T23:00:00")
  );
  expect(ride.calculate()).toBe(10);
});

test("requests a ride", () => {
	const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
	expect(ride.status.value).toBe("requested");
});

test("accepts a ride", () => {
	const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
	ride.accept("", new Date("2021-03-01T10:10:00"));
	expect(ride.status.value).toBe("accepted");
});

test("starts a ride", () => {
	const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
	ride.accept("", new Date("2021-03-01T10:10:00"));
	ride.start(new Date("2021-03-01T10:20:00"));
	expect(ride.status.value).toBe("in_progress");
});

test("ends a ride", () => {
	const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
	ride.accept("", new Date("2021-03-01T10:10:00"));
	ride.start(new Date("2021-03-01T10:20:00"));
	ride.end(new Date("2021-03-01T10:20:00"));
	expect(ride.status.value).toBe("completed");
});

test("does not start a ride if the ride is already accpeted", () => {
	const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
	expect(() => ride.start(new Date("2021-03-01T10:40:00"))).toThrow("Invalid status");
});

test("does not end a ride if the ride is requested", () => {
	const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
	expect(() => ride.end(new Date("2021-03-01T10:40:00"))).toThrow("Invalid status");
});