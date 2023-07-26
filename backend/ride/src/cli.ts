import CreatePassenger from "./application/usecase/CreatePassenger";
import CLIController from "./infra/cli/CLIController";
import NodeInputOutput from "./infra/cli/NodeInputOutput";
import VercelPostgresAdapter from "./infra/database/VercelPostgresAdapter";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";

// Main Composition Root
const connection = new VercelPostgresAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);
const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createPassenger);
