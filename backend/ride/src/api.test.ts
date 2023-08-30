import axios from "axios";

axios.defaults.validateStatus = () => true;

test("calculates the price of the ride during the day", async () => {
  const input = {
    positions: [
      {
        lat: -27.584905257808835,
        long: -48.545022195325124,
        date: new Date("2021-03-01T10:00:00"),
      },
      {
        lat: -27.496887588317275,
        long: -48.522234807851476,
        date: new Date("2021-03-01T10:00:00"),
      },
    ],
  };
  const response = await axios.post(
    "http://localhost:3000/calculate_ride",
    input
  );
  const output = response.data;
  expect(output.price).toBe(21);
});

test("throws an error when the date is invalid", async () => {
  const input = {
    positions: [
      {
        lat: -27.584905257808835,
        long: -48.545022195325124,
        date: "invalid-date",
      },
      {
        lat: -27.496887588317275,
        long: -48.522234807851476,
        date: "invalid-date",
      },
    ],
  };
  const response = await axios.post(
    "http://localhost:3000/calculate_ride",
    input
  );
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid date");
});