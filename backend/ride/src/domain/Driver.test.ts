import Driver from "./Driver";

test("creates a driver", () => {
  const driver = Driver.create(
    "John Doe",
    "john.doe@gmail.com",
    "83432616074",
    "AAA9999"
  );
  expect(driver.driverId).toBeDefined();
  expect(driver.name).toBe("John Doe");
  expect(driver.email.value).toBe("john.doe@gmail.com");
  expect(driver.document.value).toBe("83432616074");
  expect(driver.carPlate.value).toBe("AAA9999");
});

test("does not create a driver when the document is invalid", () => {
  expect(() =>
    Driver.create("John Doe", "john.doe@gmail.com", "83432616076", "AAA9999")
  ).toThrow(new Error("Invalid cpf"));
});

test("does not create a driver when the email is invalid", () => {
  expect(() =>
    Driver.create("John Doe", "john.doe@gmail", "83432616074", "AAA9999")
  ).toThrow(new Error("Invalid email"));
});

test("does not create a driver when the car plate is invalid", () => {
  expect(() =>
    Driver.create("John Doe", "john.doe@gmail.com", "83432616074", "AAA999")
  ).toThrow(new Error("Invalid car plate"));
});
