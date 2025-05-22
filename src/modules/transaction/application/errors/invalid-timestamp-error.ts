import { UnprocessableEntityException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { name } from "../../../../../package.json";

const message = "O timestamp da transação não deve ultrapassar data e hora presente";
const error = `${name}/invalid_timestamp_transaction_error`;

export class InvalidTimestampTransactionError extends UnprocessableEntityException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
