import CalculateRide from "./CalculateRide";

test("calculates the ride's price during the day", async () => {
  const input = {
    segments: [{ distance: 10, date: new Date("2021-03-01T10:00:00") }],
  };
  const usecase = new CalculateRide();
  const output = await usecase.execute(input);
  expect(output.price).toBe(21);
});
