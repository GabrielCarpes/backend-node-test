import { Injectable } from "@nestjs/common";
import { GetStatsTransactionsUnexpectedError } from "../errors/get-stats-transaction-unexpected-error";
import { GetStatsTransactionUseCase } from "../useCases/get-statistics-transactio-usecase";
import { StatsResponseDTO } from "@modules/transaction/infra/http/dtos/stats-response.dto";

@Injectable()
export class GetStatsTransactionService {
  constructor(
    private readonly getStatsTransactionUseCase: GetStatsTransactionUseCase,
  ) {}

  async execute(): Promise<StatsResponseDTO> {
    let response : any;
    try {
      response =  await this.getStatsTransactionUseCase.execute();
    } catch (error) {
      throw new GetStatsTransactionsUnexpectedError();
    }

    return response;
  }
}
