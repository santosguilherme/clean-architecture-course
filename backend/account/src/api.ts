import "dotenv/config";
import CreatePassenger from "./application/usecase/CreatePassenger";
import VercelPostgresAdapter from "./infra/database/VercelPostgresAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import Registry from "./infra/di/Registry";
import UsecaseFactory from "./application/factory/UsecaseFactory";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatabase";

// Main Composition Root
const connection = new VercelPostgresAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const driverRepository = new DriverRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);
const repositoryFactory = new RepositoryFactoryDatabase(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const registry = Registry.getInstance();
registry.provide("createPassenger", createPassenger);
const httpServer = new ExpressAdapter();
new MainController(httpServer, usecaseFactory);
httpServer.listen(3002);
