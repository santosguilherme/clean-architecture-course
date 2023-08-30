import PassengerRepository from "../repository/PassengerRepository";

type Input = {
  passengerId: string;
};

type Output = {
  passengerId: string;
  name: string;
  email: string;
  document: string;
};

export default class CreatePassenger {
  constructor(readonly passengerRepository: PassengerRepository) {}

  async execute(input: Input): Promise<Output> {
    const passengerData = await this.passengerRepository.get(input.passengerId);
    return {
      passengerId: passengerData.passengerId,
      name: passengerData.name,
      email: passengerData.email.value,
      document: passengerData.document.value,
    };
  }
}
