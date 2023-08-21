import RideRepository from "../repository/RideRepository";

type Input = {
  rideId: string
}

type Output = {
  rideId: string,
  driverId?: string,
  status: string,
  requestDate: Date,
  acceptDate?: Date,
  startDate?: Date,
  endDate?: Date
}

export default class GetRide {
  constructor(readonly rideRepository: RideRepository){}

  async execute(input: Input): Promise<Output> {
    const ride  = await this.rideRepository.get(input.rideId);
    const { rideId, driverId, status, requestDate, acceptDate, startDate, endDate } = ride;
    return {
      rideId,
      driverId,
      status: status.value,
      requestDate,
      acceptDate,
      startDate,
      endDate
    }
  }
}