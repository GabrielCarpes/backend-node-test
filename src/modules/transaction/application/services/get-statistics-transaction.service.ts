import { Injectable } from "@nestjs/common";
import { GetStatsTransactionsUnexpectedError } from "../errors/get-stats-transaction-unexpected-error";
import { GetStatsTransactionUseCase } from "../useCases/get-statistics-transactio-usecase";
import { Stats } from "fs";

@Injectable()
export class GetStatsTransactionService {
  constructor(
    private readonly getStatsTransactionUseCase: GetStatsTransactionUseCase,
  ) {}

  async execute(): Promise<StatsTransactionDTO> {
    let response : Stats;
    try {
      response =  await this.getStatsTransactionUseCase.execute();
    } catch (error) {
      throw new GetStatsTransactionsUnexpectedError();
    }

    return response;
  }
}
