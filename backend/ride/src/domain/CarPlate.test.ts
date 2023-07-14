import CarPlate from "./CarPlate";

test("creates the car plate when it is valid", () => {
  const carPlate = new CarPlate("AAA9999");
  expect(carPlate).toBeDefined();
});

test("throws an error when the car plate is invalid", () => {
  expect(() => new CarPlate("AAA999")).toThrow(new Error("Invalid car plate"));
});
