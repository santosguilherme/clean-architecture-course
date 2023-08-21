import Passenger from "../../domain/passenger/Passenger";

export default interface PassengerRepository {
  save(Passenger: Passenger): Promise<void>;
  get(passengerId: string): Promise<Passenger>;
}
