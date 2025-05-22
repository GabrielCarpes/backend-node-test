import { UnprocessableEntityException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { name } from "../../../../../package.json";

const message = "O timestamp da transação deve estar no formato ISO 8601 (UTC)";
const error = `${name}/invalid_format_timestamp_transaction_error`;

export class InvalidFormatTimestampTransactionError extends UnprocessableEntityException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
