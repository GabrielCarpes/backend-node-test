import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction';
import { TransactionRepository } from '../repositories/transaction.repository';
import { CreateTransactionUnexpectedError } from '../errors/create-transaction-unexpected-error';
import { Stats } from '../interfaces/transaction.interface';

@Injectable()
export class GetStatsTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) { }

  async execute(): Promise<Stats> {
    try {
      return this.transactionRepository.getStats();
    } catch (error) {
      throw new CreateTransactionUnexpectedError();
    }
  }
}
