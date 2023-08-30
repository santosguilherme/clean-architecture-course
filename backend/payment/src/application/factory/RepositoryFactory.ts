import TransactionRepository from "../repository/TransactionRepository";

// Abstract Factory
export default interface RepositoryFactory {
	createTransactionRepository (): TransactionRepository;
}