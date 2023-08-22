import Name from "./Name";

test("creates a valid name", function () {
	const name = new Name("John Doe");
	expect(name.getValue()).toBe("John Doe");
});

test("does not create invalid name", function () {
	expect(() => new Name("John")).toThrow(new Error("Invalid name"));
});