import PaymentGateway from "../gateway/PaymentGateway";
import RideRepository from "../repository/RideRepository";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import PaymentGatewayHttp from "../../infra/gateway/PaymentGatewayHttp";
import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";
import AccountGateway from "../gateway/AccountGateway";
import Queue from "../../infra/queue/Queue";

type Input = {
  rideId: string,
  date: Date
}

export default class EndRide {
  constructor(
    readonly rideRepository: RideRepository,
    readonly paymentGateway: PaymentGateway = new PaymentGatewayHttp(new AxiosAdapter()),
    readonly accountGateway: AccountGateway = new AccountGatewayHttp(new AxiosAdapter()),
    readonly queue: Queue
  ){}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.end(input.date);
    await this.rideRepository.update(ride);
    const amount = ride.calculate();
    const passenger = await this.accountGateway.getPassenger(ride.passengerId);
    const paymentInput = {
      name: passenger.name,
      email: passenger.email,
      amount
    };
    // await this.paymentGateway.process(paymentInput);
		await this.queue.publish("rideCompleted", paymentInput);
  }
}