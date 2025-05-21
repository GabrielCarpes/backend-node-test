import { Injectable } from "@nestjs/common";
import { CreateTransactionRequest } from "../interfaces/create-transaction-request.interface";
import { CreateTransactionUnexpectedError } from "../errors/create-transaction-unexpected-error";
import { CreateTransactionUseCase } from "../useCases/create-transactio-usecase";
import { isFutureDate, isISODate } from "@shared/utils/date-validation";
import { InvalidTimestampTransactionError } from "../errors/invalid-timestamp-error";
import { InvalidFormatTimestampTransactionError } from "../errors/invalid-timestamp-format-error";

@Injectable()
export class CreateTransactionService {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  async execute({
    amount, 
    timestamp
  }: CreateTransactionRequest): Promise<void> {
    if(!isISODate(timestamp)){
      throw new InvalidFormatTimestampTransactionError();
    }
    
    if(isFutureDate(timestamp)){
      throw new InvalidTimestampTransactionError();
    }

    try {
      await this.createTransactionUseCase.execute({
        amount, 
        timestamp
      });
    } catch (error) {
      throw new CreateTransactionUnexpectedError();
    }
  }
}
