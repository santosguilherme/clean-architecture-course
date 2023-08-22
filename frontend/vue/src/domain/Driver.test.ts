import Driver from "./Driver";

test("does not create a driver with invalid name", function () {
	expect(() => new Driver("", "", "", "", "")).toThrow(new Error("Invalid name"));
});

test("does not create a driver with invalid email", function () {
	expect(() => new Driver("", "John Doe", "", "", "")).toThrow(new Error("Invalid email"));
});

test("does not create a driver with invalid document", function () {
	expect(() => new Driver("", "John Doe", "john.doe@gmail.com", "83432616075", "")).toThrow(new Error("Invalid cpf"));
});

test("does not create a driver with invalid car plate", function () {
	expect(() => new Driver("", "John Doe", "john.doe@gmail.com", "83432616074", "AAA999")).toThrow(new Error("Invalid car plate"));
});