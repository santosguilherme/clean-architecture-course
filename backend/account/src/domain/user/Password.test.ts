import PlainPassword from "./PlainPassword";
import SHA1Password from "./SHA1Password";

test("creates a plain password", () => {
  const password = PlainPassword.create("123456");
  expect(password.validate("123456")).toBe(true);
});

test("creates a SHA1 password", () => {
  const password = SHA1Password.create("123456");
  expect(password.validate("123456")).toBe(true);
});