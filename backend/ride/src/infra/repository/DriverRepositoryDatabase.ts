import { sql } from "@vercel/postgres";
import DriverRepository from "../../application/repository/DriverRepository";
import Driver from "../../domain/Driver";

export default class DriverRepositoryDatabase implements DriverRepository {
  async save(driver: Driver) {
    await sql`insert into cac.driver (driver_id, name, email, document, car_plate) values (${driver.driverId}, ${driver.name}, ${driver.email.value}, ${driver.document.value}, ${driver.carPlate.value})`;
  }

  async get(driverId: string) {
    const { rows } =
      await sql`select * from cac.driver where driver_id = ${driverId};`;
    const [driverData] = rows;
    return new Driver(
      driverData.driver_id,
      driverData.name,
      driverData.email,
      driverData.document,
      driverData.car_plate
    );
  }
}
