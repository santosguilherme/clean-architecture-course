import UsecaseFactory from "../../application/factory/UsecaseFactory";
import CreatePassenger from "../../application/usecase/CreatePassenger";
import inject from "../di/Inject";
import HttpServer from "./HttpServer";

export default class MainController {
	@inject("createPassenger")
	createPassenger?: CreatePassenger;
  
  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on("post", "/passengers", async (params: any, body: any) => {
      const output = await this.createPassenger?.execute(body);
      return output;
    });

    httpServer.on("get", "/passengers/:{passengerId}", async (params: any, body: any) => {
        const output = await usecaseFactory.createGetPassenger().execute({ passengerId: params.passengerId });
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
