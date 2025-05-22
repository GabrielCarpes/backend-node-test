import { InternalServerErrorException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { name } from "../../../../../package.json";

const message = "Erro inesperado ao deletar o transação";
const error = `${name}/delete_transaction_unexpected_error`;

export class DeleteTransactionUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
