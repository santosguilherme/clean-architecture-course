import CreatePassenger from "../../application/usecase/CreatePassenger";
import GetPassenger from "../../application/usecase/GetPassenger";
import VercelPostgresAdapter from "../../infra/database/VercelPostgresAdapter";
import PassengerRepositoryDatabase from "../../infra/repository/PassengerRepositoryDatabase";
import UserRepositoryDatabase from "../../infra/repository/UserRepositoryDatabase";

test("registers the passenger", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    password: "123456"
  };
  const connection = new VercelPostgresAdapter();
  const usecase = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  const output = await usecase.execute(input);

  expect(output.passengerId).toBeDefined();

  await connection.close();
});

test("does not register the passenger with invalid an email", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail",
    document: "83432616074",
    password: "123456"
  };
  const connection = new VercelPostgresAdapter();
  const usecase = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  await expect(() => usecase.execute(input)).rejects.toThrow(
    new Error("Invalid email")
  );
  await connection.close();
});

test("gets the passenger", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    password: "123456"
  };
  const connection = new VercelPostgresAdapter();
  const usecase1 = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  const output1 = await usecase1.execute(input);
  const usecase2 = new GetPassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  const output2 = await usecase2.execute({ passengerId: output1.passengerId });

  expect(output2.name).toBe("John Doe");
  expect(output2.email).toBe("john.doe@gmail.com");
  expect(output2.document).toBe("83432616074");
  await connection.close();
});
