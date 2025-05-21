import { InternalServerErrorException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { name } from "../../../../../package.json";

const message = "Erro inesperado ao criar transação";
const error = `${name}/create_transaction_unexpected_error`;

export class CreateTransactionUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
