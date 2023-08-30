import "dotenv/config";
import CalculateRide from "./application/usecase/CalculateRide";
import VercelPostgresAdapter from "./infra/database/VercelPostgresAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import UsecaseFactory from "./application/factory/UsecaseFactory";
import RequestRide from "./application/usecase/RequestRide";
import Registry from "./infra/di/Registry";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import RideRepositoryDatabase from "./infra/repository/RideRepositoryDatabase";
// import HapiAdapter from "./infra/http/HapiAdapter";

// Main Composition Root
const connection = new VercelPostgresAdapter();
const rideRepository = new RideRepositoryDatabase(connection);
const calculateRide = new CalculateRide();
const requestRide = new RequestRide(rideRepository);
const httpServer = new ExpressAdapter();
//const httpServer  = new  HapiAdapter()
const repositoryFactory = new RepositoryFactoryDatabase(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const registry = Registry.getInstance();
registry.provide("calculateRide", calculateRide);
new MainController(httpServer, usecaseFactory);
httpServer.listen(3000);
