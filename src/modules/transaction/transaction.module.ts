import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TransactionRepository } from './application/repositories/transaction.repository';
import { CreateTransactionService } from './application/services/create-transaction.service';
import { CreateTransactionUseCase } from './application/useCases/create-transactio-usecase';
import { TransactionController } from './infra/http/controllers/transaction.controller';
import { InMemoryTransctionsRepository } from './application/repositories/in-memory/in-memory-transaction.repository';
import { DeleteAllTransactionService } from './application/services/delete-all-transaction.service';
import { DeleteAllTransactionUseCase } from './application/useCases/delete-all-transactio-usecase';

@Module({
  controllers: [TransactionController],
  exports: [
    TransactionRepository,
  ],
  imports: [ConfigModule, HttpModule],
  providers: [
    {
      provide: TransactionRepository,
      useClass: InMemoryTransctionsRepository,
    },
    CreateTransactionService,
    CreateTransactionUseCase,
    DeleteAllTransactionService,
    DeleteAllTransactionUseCase,
  ],
})
export class TransactionModule { }
