import { validate } from "../src/CpfValidator";

test.each([
  ["", false],
  ["invalid-string", false],
  ["123456789112345", false],
  ["11111111111", false],
  ["163.939.919-41", true],
  ["16393991941", true],
])("when the cpf is '%s' validate() returns '%s'", (input, expectedValue) => {
  expect(validate(input)).toEqual(expectedValue);
});
