import TransactionRepository from "../repository/TransactionRepository";

type Input = {
  transactionId: string;
};

type Output = {
  transactionId: string;
  name: string;
  email: string;
  amount: number;
};

export default class GetTransaction {
  constructor(
      readonly transactionRepository: TransactionRepository
  ){}

  async execute(input: Input): Promise<Output> {
    const transcation = await this.transactionRepository.get(input.transactionId);
    return {
      transactionId: transcation.transactionId,
      name: transcation.name,
      email: transcation.email,
      amount: transcation.amount
    };
  }
}