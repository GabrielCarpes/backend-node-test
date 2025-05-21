import { TransactionRepository } from '../transaction.repository'
import { Transaction } from '../../entities/transaction'

export class InMemoryTransctionsRepository implements TransactionRepository {
  public items: Transaction[] = []

  async create(data: Transaction) {
    this.items.push(data)
  }

  async deleteAll() {
    this.items = [];
  }
}
