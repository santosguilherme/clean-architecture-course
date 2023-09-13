import VercelPostgresAdapter from "../../infra/database/VercelPostgresAdapter";
import PassengerRepositoryDatabase from "../../infra/repository/PassengerRepositoryDatabase";
import UserRepositoryDatabase from "../../infra/repository/UserRepositoryDatabase";
import CreatePassenger from "./CreatePassenger";
import GetSession from "./GetSession";
import Login from "./Login";

test("does the login", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    password: "123456"
  };
  const connection = new VercelPostgresAdapter();
  const createPassenger = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  await createPassenger.execute(input);
  const login = new Login(new UserRepositoryDatabase(connection));
  const inputLogin = {
    email: "john.doe@gmail.com",
    password: "123456"
  };
  const outputLogin = await login.execute(inputLogin);
  expect(outputLogin.token).toBeDefined();
  await connection.close();
});

test("does the login and validates the logged user", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    password: "123456"
  };
  const connection = new VercelPostgresAdapter();
  const createPassenger = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  await createPassenger.execute(input);
  const login = new Login(new UserRepositoryDatabase(connection));
  const inputLogin = {
    email: "john.doe@gmail.com",
    password: "123456"
  };
  const outputLogin = await login.execute(inputLogin);
  
  const getSession = new GetSession();
  const outputGetSession = await getSession.execute({ token: outputLogin.token });
  expect(outputGetSession.email).toBe("john.doe@gmail.com");
  await connection.close();
});