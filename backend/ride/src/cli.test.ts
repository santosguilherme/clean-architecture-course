import CreatePassenger from "./application/usecase/CreatePassenger";
import CLIController from "./infra/cli/CLIController";
import InputOutput from "./infra/cli/InputOutput";
import VercelPostgresAdapter from "./infra/database/VercelPostgresAdapter";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";

test("creates a passenger using the CLI", async () => {
  const output: any = [];
  const connection = new VercelPostgresAdapter();
  const passengerRepository = new PassengerRepositoryDatabase(connection);
  const createPassenger = new CreatePassenger(passengerRepository);
  const inputOutput = new (class extends InputOutput {
    write(text: string) {
      output.push(JSON.parse(text));
    }
  })();
  new CLIController(inputOutput, createPassenger);
  await inputOutput.type("create-passenger ana ana@gmail.com 83432616074");
  expect(output.at(0)?.passengerId).toBeDefined();
  await connection.close();
});
