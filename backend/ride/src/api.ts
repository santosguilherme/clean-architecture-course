import "dotenv/config";
import CalculateRide from "./application/usecase/CalculateRide";
// import CreateDriver from "./application/usecase/CreateDriver";
import CreatePassenger from "./application/usecase/CreatePassenger";
// import GetDriver from "./application/usecase/GetDriver";
// import GetPassenger from "./application/usecase/GetPassenger";
import VercelPostgresAdapter from "./infra/database/VercelPostgresAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
// import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import Registry from "./infra/di/Registry";
import UsecaseFactory from "./application/factory/UsecaseFactory";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
// import HapiAdapter from "./infra/http/HapiAdapter";

// Main Composition Root
const connection = new VercelPostgresAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
// const driverRepository = new DriverRepositoryDatabase(connection);
const calculateRide = new CalculateRide();
const createPassenger = new CreatePassenger(passengerRepository);
// const getPassenger = new GetPassenger(passengerRepository);
// const createDriver = new CreateDriver(driverRepository);
// const getDriver = new GetDriver(driverRepository);
const httpServer = new ExpressAdapter();
//const httpServer  = new  HapiAdapter()
const repositoryFactory = new RepositoryFactoryDatabase(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const registry = Registry.getInstance();
registry.provide("calculateRide", calculateRide);
registry.provide("createPassenger", createPassenger);
new MainController(httpServer, usecaseFactory);
httpServer.listen(3000);
