import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Stats } from '../interfaces/transaction.interface';
import { GetStatsTransactionsUnexpectedError } from '../errors/get-stats-transaction-unexpected-error';

@Injectable()
export class GetStatsTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) { }

  async execute(): Promise<Stats> {
    try {
      return this.transactionRepository.getStats();
    } catch (error) {
      throw new GetStatsTransactionsUnexpectedError();
    }
  }
}
