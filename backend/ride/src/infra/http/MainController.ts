import UsecaseFactory from "../../application/factory/UsecaseFactory";
import CalculateRide from "../../application/usecase/CalculateRide";
import inject from "../di/Inject";
import HttpServer from "./HttpServer";

export default class MainController {
  @inject("calculateRide")
	calculateRide?: CalculateRide;
  
  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on("post", "/calculate_ride", async (params: any, body: any) => {
      const output = await this.calculateRide?.execute(body);
      return output;
    });

    httpServer.on("post", "/request_ride", async function (params: any, body: any) {
			const output = await usecaseFactory.createRequestRide().execute(body);
			return output;
		});
  }
}
