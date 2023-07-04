import { calculate } from "../src/RideCalculator";

test("calculates the price of the ride during the day", () => {
  const segments = [{ distance: 10, date: new Date("2021-03-01T10:00:00") }];
  const price = calculate(segments);
  expect(price).toBe(21);
});

test("calculates the price of the ride during the night", () => {
  const segments = [{ distance: 10, date: new Date("2021-03-01T23:00:00") }];
  const price = calculate(segments);
  expect(price).toBe(39);
});

test("calculates the price of a ride on Sunday during the day", () => {
  const segments = [{ distance: 10, date: new Date("2021-03-07T10:00:00") }];
  const price = calculate(segments);
  expect(price).toBe(29);
});

test("calculates the price of a ride on Sunday during the night", () => {
  const segments = [{ distance: 10, date: new Date("2021-03-07T23:00:00") }];
  const price = calculate(segments);
  expect(price).toBe(50);
});

test("returns -1 when the distance is invalid", () => {
  const segments = [{ distance: -10, date: new Date("2021-03-01T10:00:00") }];
  const price = calculate(segments);
  expect(price).toBe(-1);
});

test("returns -2 when the date is invalid", () => {
  const segments = [{ distance: 10, date: new Date("javascript") }];
  const price = calculate(segments);
  expect(price).toBe(-2);
});

test("calculates the price of the ride during the day with the minimum price", () => {
  const segments = [{ distance: 3, date: new Date("2021-03-01T10:00:00") }];
  const price = calculate(segments);
  expect(price).toBe(10);
});

test("calculates the price of a ride with multiple segments", () => {
  const segments = [
    { distance: 10, date: new Date("2021-03-01T10:00:00") },
    { distance: 10, date: new Date("2021-03-01T12:00:00") },
  ];
  const price = calculate(segments);
  expect(price).toBe(42);
});
