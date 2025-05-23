import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction';
import { TransactionRepository } from '../repositories/transaction.repository';
import { CreateTransactionUnexpectedError } from '../errors/create-transaction-unexpected-error';
import { CreateTransactionRequest } from '../interfaces/transaction.interface';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) { }

  async execute({
    amount,
    timestamp
  }: CreateTransactionRequest): Promise<void> {
    try {
      const transaction = new Transaction({
        amount,
        timestamp
      });

      return this.transactionRepository.create(transaction);
    } catch (error) {
      throw new CreateTransactionUnexpectedError();
    }
  }
}
