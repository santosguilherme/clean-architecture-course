import DatabaseConnection from "../database/DatabaseConnection";
import DriverRepository from "../../application/repository/DriverRepository";
import Driver from "../../domain/Driver";

export default class DriverRepositoryDatabase implements DriverRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async save(driver: Driver) {
    await this.connection.query(
      "insert into cac.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)",
      [
        driver.driverId,
        driver.name,
        driver.email.value,
        driver.document.value,
        driver.carPlate.value,
      ]
    );
  }

  async get(driverId: string) {
    const [driverData] = await this.connection.query(
      "select * from cac.driver where driver_id = $1",
      [driverId]
    );
    return new Driver(
      driverData.driver_id,
      driverData.name,
      driverData.email,
      driverData.document,
      driverData.car_plate
    );
  }
}
