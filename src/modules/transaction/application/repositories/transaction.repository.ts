import { Transaction } from "../entities/transaction";

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<void>;
  abstract deleteAll(): Promise<void>;
}
