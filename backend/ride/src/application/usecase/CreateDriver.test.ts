import CreateDriver from "./CreateDriver";
import GetDriver from "./GetDriver";
import DriverRepository from "../../infra/repository/DriverRepositoryDatabase";
import DriverRepositoryDatabase from "../../infra/repository/DriverRepositoryDatabase";
import Driver from "../../domain/Driver";

test("registers the driver", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    carPlate: "AAA9999",
  };
  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  const output = await usecase.execute(input);

  expect(output.driverId).toBeDefined();
});

// narrow integration test
test("gets the driver ", async () => {
  // fake test pattern
  const driverRepository: DriverRepository = {
    async save(driver: any): Promise<void> {},
    async get(driverId: string): Promise<any> {
      return Driver.create(
        "John Doe",
        "john.doe@gmail.com",
        "83432616074",
        "AAA9999"
      );
    },
  };
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    carPlate: "AAA9999",
  };
  const usecase1 = new CreateDriver(driverRepository);
  const output1 = await usecase1.execute(input);
  const usecase2 = new GetDriver(driverRepository);
  const output2 = await usecase2.execute({ driverId: output1.driverId });

  expect(output2.name).toBe("John Doe");
  expect(output2.email).toBe("john.doe@gmail.com");
  expect(output2.document).toBe("83432616074");
  expect(output2.carPlate).toBe("AAA9999");
});

// broad integration test
test("gets the driver from the database", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    carPlate: "AAA9999",
  };
  const usecase1 = new CreateDriver(new DriverRepositoryDatabase());
  const output1 = await usecase1.execute(input);
  const usecase2 = new GetDriver(new DriverRepositoryDatabase());
  const output2 = await usecase2.execute({ driverId: output1.driverId });

  expect(output2.name).toBe("John Doe");
  expect(output2.email).toBe("john.doe@gmail.com");
  expect(output2.document).toBe("83432616074");
  expect(output2.carPlate).toBe("AAA9999");
});
