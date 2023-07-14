import Passenger from "../../domain/Passenger";

export default interface PassengerRepository {
  save(Passenger: Passenger): Promise<void>;
  get(passengerId: string): Promise<Passenger>;
}
