import VercelPostgresAdapter from "../../infra/database/VercelPostgresAdapter";
import GetRide from "./GetRide";
import RequestRide from "./RequestRide";
import RideRepositoryDatabase from "../../infra/repository/RideRepositoryDatabase";
import RepositoryFactoryDatabase from "../../infra/factory/RepositoryFactoryDatabase";
import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";

test("requests a ride", async function () {
	const inputCreatePassenger = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const connection = new VercelPostgresAdapter();
	const accountGateway = new AccountGatewayHttp(new AxiosAdapter());
	const outputCreatePassenger = await accountGateway.createPassenger(inputCreatePassenger);
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
	expect(outputRequestRide.rideId).toBeDefined();
	await connection.close();
});

test("gets a ride", async function () {
	const inputCreatePassenger = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const connection = new VercelPostgresAdapter();
	const accountGateway = new AccountGatewayHttp(new AxiosAdapter());
	const outputCreatePassenger = await accountGateway.createPassenger(inputCreatePassenger);
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
	const getRide = new GetRide(new RepositoryFactoryDatabase(connection));
	const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
	expect(outputGetRide.rideId).toBeDefined();
	expect(outputGetRide.status).toBe("requested");
	expect(outputGetRide.requestDate).toEqual(new Date("2021-03-01T10:00:00"));
	await connection.close();
});