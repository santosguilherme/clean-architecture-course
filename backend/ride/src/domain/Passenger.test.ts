import Passenger from "./Passenger";

test("creates a passenger", () => {
  const passenger = Passenger.create(
    "John Doe",
    "john.doe@gmail.com",
    "83432616074"
  );
  expect(passenger.passengerId).toBeDefined();
  expect(passenger.name).toBe("John Doe");
  expect(passenger.email.value).toBe("john.doe@gmail.com");
  expect(passenger.document.value).toBe("83432616074");
});

test("does not create a passenger with invalid document", () => {
  expect(() =>
    Passenger.create("John Doe", "john.doe@gmail.com", "83432616076")
  ).toThrow(new Error("Invalid cpf"));
});

test("does not create a passenger with invalid email", () => {
  expect(() =>
    Passenger.create("John Doe", "john.doe@gmail", "83432616074")
  ).toThrow(new Error("Invalid email"));
});
