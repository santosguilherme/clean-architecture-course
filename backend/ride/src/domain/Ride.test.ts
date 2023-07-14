import Ride from "./Ride";

test("calculates the price of the ride during the day", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(21);
});

test("calculates the price of the ride during the night", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-01T23:00:00"));
  expect(ride.calculate()).toBe(39);
});

test("calculates the price of a ride on Sunday during the day", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-07T10:00:00"));
  expect(ride.calculate()).toBe(29);
});

test("calculates the price of a ride on Sunday during the night", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-07T23:00:00"));
  expect(ride.calculate()).toBe(50);
});

test("returns -1 when the distance is invalid", () => {
  const ride = new Ride();
  expect(() => ride.addSegment(-10, new Date("2023-03-01T10:00:00"))).toThrow(
    new Error("Invalid distance")
  );
});

test("returns -2 when the date is invalid", () => {
  const ride = new Ride();
  expect(() => ride.addSegment(10, new Date("javascript"))).toThrow(
    new Error("Invalid date")
  );
});

test("calculates the price of the ride during the day with the minimum price", () => {
  const ride = new Ride();
  ride.addSegment(3, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(10);
});

test("calculates the price of a ride with multiple segments", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(42);
});
