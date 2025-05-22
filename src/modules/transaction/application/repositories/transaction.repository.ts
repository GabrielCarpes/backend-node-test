import { Transaction } from "../entities/transaction";
import { Stats } from "../interfaces/transaction.interface";

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<void>;
  abstract deleteAll(): Promise<void>;
  abstract getStats(): Promise<Stats>;
}
