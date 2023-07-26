import CalculateRide from "../../application/usecase/CalculateRide";
import CreateDriver from "../../application/usecase/CreateDriver";
import CreatePassenger from "../../application/usecase/CreatePassenger";
import GetDriver from "../../application/usecase/GetDriver";
import GetPassenger from "../../application/usecase/GetPassenger";
import HttpServer from "./HttpServer";

export default class MainController {
  constructor(
    httpServer: HttpServer,
    calculateRide: CalculateRide,
    createPassenger: CreatePassenger,
    getPassenger: GetPassenger,
    createDriver: CreateDriver,
    getDriver: GetDriver
  ) {
    httpServer.on("post", "/calculate_ride", async (params: any, body: any) => {
      const output = await calculateRide.execute(body);
      return output;
    });

    httpServer.on("post", "/passengers", async (params: any, body: any) => {
      const output = await createPassenger.execute(body);
      return output;
    });

    httpServer.on(
      "get",
      "/passengers/:{passengerId}",
      async (params: any, body: any) => {
        const output = await getPassenger.execute({
          passengerId: params.passengerId,
        });
        return output;
      }
    );

    httpServer.on("post", "/drivers", async (params: any, body: any) => {
      const output = await createDriver.execute(body);
      return output;
    });

    httpServer.on(
      "get",
      "/drivers/:{driverId}",
      async (params: any, body: any) => {
        const output = await getDriver.execute({
          driverId: params.driverId,
        });
        return output;
      }
    );
  }
}
