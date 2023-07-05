import axios from "axios";

axios.defaults.validateStatus = () => true;

test("calculates the price of the ride during the day", async () => {
  const input = {
    segments: [{ distance: 10, date: "2021-03-01T10:00:00" }],
  };
  const response = await axios.post(
    "http://localhost:3000/calculate_ride",
    input
  );
  const output = response.data;
  expect(output.price).toBe(21);
});

test("throws an error when the distance is invalid", async () => {
  const input = {
    segments: [{ distance: -10, date: "2021-03-01T10:00:00" }],
  };
  const response = await axios.post(
    "http://localhost:3000/calculate_ride",
    input
  );
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid distance");
});

test("register the passenger", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
  };
  const response1 = await axios.post("http://localhost:3000/passengers", input);
  const output1 = response1.data;
  expect(output1.passengerId).toBeDefined();
});

test("does not register the passenger with invalid document", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616076",
  };
  const response = await axios.post("http://localhost:3000/passengers", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid cpf");
});

test("returns the passenger", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
  };
  const response1 = await axios.post("http://localhost:3000/passengers", input);
  const output1 = response1.data;
  const response2 = await axios.get(
    `http://localhost:3000/passengers/${output1.passengerId}`
  );
  const output2 = response2.data;
  expect(output2.name).toBe("John Doe");
  expect(output2.email).toBe("john.doe@gmail.com");
  expect(output2.document).toBe("83432616074");
});

test("registers the driver", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    carPlate: "AAA999",
  };
  const response1 = await axios.post("http://localhost:3000/drivers", input);
  const output1 = response1.data;
  expect(output1.driverId).toBeDefined();
});

test("does not register the driver with invalid document", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616076",
    carPlate: "AAA9999",
  };
  const response = await axios.post("http://localhost:3000/drivers", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid cpf");
});

test("returns the driver", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
    carPlate: "AAA9999",
  };
  const response1 = await axios.post("http://localhost:3000/drivers", input);
  const output1 = response1.data;
  const response2 = await axios.get(
    `http://localhost:3000/drivers/${output1.driverId}`
  );
  const output2 = response2.data;
  expect(output2.name).toBe("John Doe");
  expect(output2.email).toBe("john.doe@gmail.com");
  expect(output2.document).toBe("83432616074");
  expect(output2.carPlate).toBe("AAA9999");
});
