import Email from "./Email";

test("creates the email", () => {
  const email = new Email("john.doe@gmail.com");
  expect(email).toBeTruthy();
});

test("throws an error when the email is invalid", () => {
  const email = "john.doe@gmail";
  expect(() => new Email(email)).toThrow(new Error("Invalid email"));
});
