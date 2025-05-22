import { TransactionRepository } from '../transaction.repository'
import { Transaction } from '../../entities/transaction'
import { Stats } from '../../interfaces/transaction.interface';
import { calculateRecentStats } from '@shared/utils/statistics-calculate';

export class InMemoryTransctionsRepository implements TransactionRepository {
  public items: Transaction[] = []

  async create(data: Transaction) {
    this.items.push(data)
  }

  async deleteAll() {
    this.items = [];
  }

  async getStats(): Promise<Stats> {
    return calculateRecentStats(this.items);
  }
}
