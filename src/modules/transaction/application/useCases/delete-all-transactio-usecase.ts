import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { DeleteTransactionUnexpectedError } from '../errors/delete-transaction-unexpected-error';

@Injectable()
export class DeleteAllTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) { }

  async execute(): Promise<void> {
    try {
      this.transactionRepository.deleteAll();
    } catch (error) {
      throw new DeleteTransactionUnexpectedError();
    }
  }
}
