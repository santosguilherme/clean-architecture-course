import PassengerRepository from "../repository/PassengerRepository";
import UserRepository from "../repository/UserRepository";

type Input = {
  passengerId: string;
};

type Output = {
  passengerId: string;
  name: string;
  email: string;
  document: string;
  userId: string;
};

export default class GetPassenger {
  constructor(readonly passengerRepository: PassengerRepository, readonly userRepository: UserRepository) {
    console.log("GetPassenger()")
  }

  async execute(input: Input): Promise<Output> {
    const passengerData = await this.passengerRepository.get(input.passengerId);
    const user = await this.userRepository.getByEmail(passengerData.email.value);
    return {
      passengerId: passengerData.passengerId,
      name: passengerData.name,
      email: passengerData.email.value,
      document: passengerData.document.value,
      userId: user.userId
    };
  }
}
