import PaymentGateway from "../gateway/PaymentGateway";
import TransactionRepository from "../repository/TransactionRepository";
import Transaction from "../../domain/transaction/Transaction";

type Input = {
  name: string;
  email: string;
  amount: number;
};

type Output = {
  transactionId: string;
};

export default class ProcessPayment {
  constructor(
      readonly transactionRepository: TransactionRepository,
      readonly paymentGateway: PaymentGateway
  ){}

  async execute(input: Input): Promise<Output> {
    const output = await this.paymentGateway.createTransaction(input);
    const transaction = new Transaction(output.transactionId, input.name, input.email, input.amount);
    await this.transactionRepository.save(transaction);
    return {
      transactionId: transaction.transactionId,
    };
  }
}