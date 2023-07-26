import "dotenv/config";
import CalculateRide from "./application/usecase/CalculateRide";
import CreateDriver from "./application/usecase/CreateDriver";
import CreatePassenger from "./application/usecase/CreatePassenger";
import GetDriver from "./application/usecase/GetDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import VercelPostgresAdapter from "./infra/database/VercelPostgresAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
// import HapiAdapter from "./infra/http/HapiAdapter";

// Main Composition Root
const connection = new VercelPostgresAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const driverRepository = new DriverRepositoryDatabase(connection);
const calculateRide = new CalculateRide();
const createPassenger = new CreatePassenger(passengerRepository);
const getPassenger = new GetPassenger(passengerRepository);
const createDriver = new CreateDriver(driverRepository);
const getDriver = new GetDriver(driverRepository);
const httpServer = new ExpressAdapter();
//const httpServer  = new  HapiAdapter()
new MainController(
  httpServer,
  calculateRide,
  createPassenger,
  getPassenger,
  createDriver,
  getDriver
);
httpServer.listen(3000);
