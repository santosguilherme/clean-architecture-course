import AcceptRide from "./AcceptRide";
import EndRide from "./EndRide";
import GetRide from "./GetRide";
import RequestRide from "./RequestRide";
import StartRide from "./StartRide";
import RideRepositoryDatabase from "../../infra/repository/RideRepositoryDatabase";
import VercelPostgresAdapter from "../../infra/database/VercelPostgresAdapter";
import RepositoryFactoryDatabase from "../../infra/factory/RepositoryFactoryDatabase";
import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import RabbitMQAdapter from "../../infra/queue/RabbitMQAdapter";
import PaymentGatewayHttp from "../../infra/gateway/PaymentGatewayHttp";

test("ends a ride", async () => {
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
	
	const inputCreateDriver = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		carPlate: "AAA9999"
	};
	const outputCreateDriver = await accountGateway.createDriver(inputCreateDriver);
	
	const inputAcceptRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputCreateDriver.driverId,
		date: new Date("2021-03-01T10:10:00")
	};
	const acceptRide = new AcceptRide(new RideRepositoryDatabase(connection));
	await acceptRide.execute(inputAcceptRide);

	const inputStartRide = {
		rideId: outputRequestRide.rideId,
		date: new Date("2021-03-01T10:20:00")
	}
	const startRide = new StartRide(new RideRepositoryDatabase(connection));
	await startRide.execute(inputStartRide);

	const inputEndRide = {
		rideId: outputRequestRide.rideId,
		date: new Date("2021-03-01T10:40:00")
	}
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const endRide = new EndRide(
		new RideRepositoryDatabase(connection),
		new PaymentGatewayHttp(new AxiosAdapter()),
		new AccountGatewayHttp(new AxiosAdapter()),
		queue
	);
	await endRide.execute(inputEndRide);

	const getRide = new GetRide(new RepositoryFactoryDatabase(connection));
	const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
	expect(outputGetRide.driverId).toBe(outputCreateDriver.driverId);
	expect(outputGetRide.status).toBe("completed");
	expect(outputGetRide.endDate).toEqual(new Date("2021-03-01T10:40:00"));
	await connection.close();
});