import RepositoryFactory from "../factory/RepositoryFactory";
import AccountGateway from "../gateway/AccountGateway";
import RideRepository from "../repository/RideRepository";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";

type Input = {
  rideId: string
}

type Output = {
  rideId: string,
  driverId?: string,
  passengerId: string,
  status: string,
  requestDate: Date,
  acceptDate?: Date,
  startDate?: Date,
  endDate?: Date,
	passengerName: string,
	driverName?: string
}

export default class GetRide {
  rideRepository: RideRepository;

  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly accountGateway: AccountGateway = new AccountGatewayHttp(new AxiosAdapter())
  ){
    this.rideRepository = repositoryFactory.createRideRepository();
  }

  async execute(input: Input): Promise<Output> {
    const ride  = await this.rideRepository.get(input.rideId);
    const { rideId, driverId, status, requestDate, acceptDate, startDate, endDate, passengerId } = ride;
    const passenger = await this.accountGateway.getPassenger(passengerId);
		let driver;
		if (driverId) {
			driver = await this.accountGateway.getDriver(driverId);
		}
    return {
      rideId,
      driverId,
      passengerId,
      status: status.value,
      requestDate,
      acceptDate,
      startDate,
      endDate,
			passengerName: passenger.name,
			driverName: driver?.name
    }
  }
}