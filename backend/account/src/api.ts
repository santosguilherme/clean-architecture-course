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
import UserRepositoryDatabase from "./infra/repository/UserRepositoryDatabase";
import GetPassenger from "./application/usecase/GetPassenger";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import QueueController from "./infra/queue/QueueController";

// Main Composition Root
const main = async () => {
  const connection = new VercelPostgresAdapter();
  const queue = new RabbitMQAdapter();
	await queue.connect();
	const passengerRepository = new PassengerRepositoryDatabase(connection);
	const driverRepository = new DriverRepositoryDatabase(connection);
	const userRepository = new UserRepositoryDatabase(connection);
	const createPassenger = new CreatePassenger(passengerRepository, userRepository);
  const getPassenger = new GetPassenger(passengerRepository, userRepository);
	const httpServer = new ExpressAdapter();
	const repositoryFactory = new RepositoryFactoryDatabase(connection);
	const usecaseFactory = new UsecaseFactory(repositoryFactory);
	const registry = Registry.getInstance();
	registry.provide("createPassenger", createPassenger);
  registry.provide("getPassenger", getPassenger);
	new MainController(httpServer, usecaseFactory, queue);
	new QueueController(queue);
	httpServer.listen(3002);
};

main();