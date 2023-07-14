import { sql } from "@vercel/postgres";
import PassengerRepository from "../../application/repository/PassengerRepository";
import Passenger from "../../domain/Passenger";

export default class PassengerRepositoryDatabase
  implements PassengerRepository
{
  async save(passenger: Passenger) {
    await sql`insert into cac.passenger (passenger_id, name, email, document) values (${passenger.passengerId}, ${passenger.name}, ${passenger.email.value}, ${passenger.document.value})`;
  }

  async get(passengerId: string) {
    const { rows } =
      await sql`select * from cac.passenger where passenger_id = ${passengerId};`;
    const [passengerData] = rows;
    return new Passenger(
      passengerData.passenger_id,
      passengerData.name,
      passengerData.email,
      passengerData.document
    );
  }
}
