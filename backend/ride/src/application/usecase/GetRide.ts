import RepositoryFactory from "../factory/RepositoryFactory";
import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";
import RideRepository from "../repository/RideRepository";

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
	passengerRepository: PassengerRepository;
	driverRepository: DriverRepository;

  constructor(readonly repositoryFactory: RepositoryFactory){
    this.rideRepository = repositoryFactory.createRideRepository();
		this.passengerRepository = repositoryFactory.createPassengerRepository();
		this.driverRepository = repositoryFactory.createDriverRepository();
  }

  async execute(input: Input): Promise<Output> {
    const ride  = await this.rideRepository.get(input.rideId);
    const { rideId, driverId, status, requestDate, acceptDate, startDate, endDate, passengerId } = ride;
    const passenger = await this.passengerRepository.get(passengerId);
		let driver;
		if (driverId) {
			driver = await this.driverRepository.get(driverId);
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