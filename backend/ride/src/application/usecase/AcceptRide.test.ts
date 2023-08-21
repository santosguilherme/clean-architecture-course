import AcceptRide from "./AcceptRide";
import CreateDriver from "./CreateDriver";
import CreatePassenger from "./CreatePassenger";
import GetRide from "./GetRide";
import RequestRide from "./RequestRide";
import VercelPostgresAdapter from "../../infra/database/VercelPostgresAdapter";
import DriverRepositoryDatabase from "../../infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "../../infra/repository/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../../infra/repository/RideRepositoryDatabase";

test("Accepts a ride", async function () {
	const inputCreatePassenger = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const connection = new VercelPostgresAdapter();
	const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection));
	const outputCreatePassenger = await createPassenger.execute(inputCreatePassenger);

	const inputRequestRide = {
		passengerId: outputCreatePassenger.passengerId,
		from: {
			lat: -27.584905257808835,
			long: -48.545022195325124
		},
		to: {
			lat: -27.496887588317275,
			long: -48.522234807851476
		},
		date: new Date("2021-03-01T10:00:00")
	};
	const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
	const outputRequestRide = await requestRide.execute(inputRequestRide);

	const inputCreateDriver = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		carPlate: "AAA9999"
	};
	const createDriver = new CreateDriver(new DriverRepositoryDatabase(connection));
	const outputCreateDriver = await createDriver.execute(inputCreateDriver);

	const inputAcceptRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputCreateDriver.driverId,
		date: new Date("2021-03-01T10:10:00")
	};
	const acceptRide = new AcceptRide(new RideRepositoryDatabase(connection));
	const outputAcceptRide = await acceptRide.execute(inputAcceptRide);

	const getRide = new GetRide(new RideRepositoryDatabase(connection));
	const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
	expect(outputGetRide.driverId).toBe(outputCreateDriver.driverId);
	expect(outputGetRide.status).toBe("accepted");
	expect(outputGetRide.acceptDate).toEqual(new Date("2021-03-01T10:10:00"));
	await connection.close();
});