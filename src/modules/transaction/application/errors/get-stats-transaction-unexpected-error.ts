import { InternalServerErrorException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { name } from "../../../../../package.json";

const message = "Erro inesperado ao obter transações";
const error = `${name}/get_transaction_unexpected_error`;

export class GetStatsTransactionsUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
