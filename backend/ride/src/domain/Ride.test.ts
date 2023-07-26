import Ride from "./Ride";

test("calculates the price of the ride during the day", () => {
  const ride = new Ride();
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
  const ride = new Ride();
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
  const ride = new Ride();
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
  const ride = new Ride();
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
  const ride = new Ride();
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
  const ride = new Ride();
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
