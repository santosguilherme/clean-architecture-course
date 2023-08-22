import Passenger from "./Passenger";

test("does not create a passenger with invalid name", function () {
	expect(() => new Passenger("", "", "", "")).toThrow(new Error("Invalid name"));
});