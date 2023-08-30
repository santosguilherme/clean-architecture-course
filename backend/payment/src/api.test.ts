import axios from "axios";

axios.defaults.validateStatus = () => true;

test("process payments", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    amount: 30
  };
  const paymentResponse = await axios.post(
    "http://localhost:3001/process_payment",
    input
  );
  const paymentOutput = paymentResponse.data;
  const transactionResponse = await axios.get(`http://localhost:3001/transactions/${paymentOutput.transactionId}`);
  const transactionOutput = transactionResponse.data;
  expect(transactionOutput.name).toBe("John Doe");
});
