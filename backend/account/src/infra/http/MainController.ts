import UsecaseFactory from "../../application/factory/UsecaseFactory";
import CreatePassenger from "../../application/usecase/CreatePassenger";
import GetPassenger from "../../application/usecase/GetPassenger";
import inject from "../di/Inject";
import HttpServer from "./HttpServer";
import Queue from "../queue/Queue";

export default class MainController {
	@inject("createPassenger")
	createPassenger?: CreatePassenger;
  @inject("getPassenger")
	getPassenger?: GetPassenger;

  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory, queue: Queue) {
    // sync
    httpServer.on("post", "/passengers", async (params: any, body: any) => {
      const output = await this.createPassenger?.execute(body);
      // const output = await usecaseFactory.createCreatePassenger().execute(body);
      return output;
    });

    // command handler - async
		httpServer.on("post", "/passengersAsync", async (params: any, body: any) => {
			await queue.publish("createPassenger", body);
		});

    httpServer.on("get", "/passengers/:{passengerId}", async (params: any, body: any) => {
      const output = await this.getPassenger?.execute({ passengerId: params.passengerId });
        // const output = await usecaseFactory.createGetPassenger().execute({ passengerId: params.passengerId });
        return output;
      }
    );

    httpServer.on("post", "/drivers", async (params: any, body: any) => {
      const output = await usecaseFactory.createCreateDriver().execute(body);
      return output;
    });

    httpServer.on("get", "/drivers/:{driverId}", async (params: any, body: any) => {
        const output = await usecaseFactory.createGetDriver().execute({ driverId: params.driverId });
        return output;
      }
    );
  }
}
