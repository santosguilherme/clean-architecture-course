import "dotenv/config";

import GetTransaction from "./application/usecase/GetTransaction";
import ProcessPayment from "./application/usecase/ProcessPayment";
import VercelPostgresAdapter from "./infra/database/VercelPostgresAdapter";
import Registry from "./infra/di/Registry";
import PayPalGateway from "./infra/gateway/PayPalGateway";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import TransactionRepositoryDatabase from "./infra/repository/TransactionRepositoryDatabase";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import QueueController from "./infra/queue/QueueController";

// Main Composition Root
const main = async () => {
  const connection = new VercelPostgresAdapter();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const transactionRepository = new TransactionRepositoryDatabase(connection);
	const httpServer = new ExpressAdapter();
	const registry = Registry.getInstance();
	const paymentGateway = new PayPalGateway();
	const processPayment = new ProcessPayment(transactionRepository, paymentGateway);
	const getTransaction = new GetTransaction(transactionRepository);
	registry.provide("processPayment", processPayment);
	registry.provide("getTransaction", getTransaction);
	new MainController(httpServer);
	new QueueController(queue);
	httpServer.listen(3001);
};

main();