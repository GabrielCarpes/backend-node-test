import { Injectable } from "@nestjs/common";
import { DeleteTransactionUnexpectedError } from "../errors/delete-transaction-unexpected-error";
import { DeleteAllTransactionUseCase } from "../useCases/delete-all-transactio-usecase";

@Injectable()
export class DeleteAllTransactionService {
  constructor(
    private readonly deleteAllTransactionUseCase: DeleteAllTransactionUseCase,
  ) {}

  async execute(): Promise<void> {
    try {
      await this.deleteAllTransactionUseCase.execute();
    } catch (error) {
      throw new DeleteTransactionUnexpectedError();
    }
  }
}
