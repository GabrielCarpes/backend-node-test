import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { name } from "../../../../../../package.json";
const error = `${name}/invalid_fields_exception`;

const message = ["amount é obrigatório", "timestamp é obrigatório"];

export class StatsTransactionDTO extends BadRequestException {
  @ApiProperty({
    type: [String, Array],
    example: message,
  })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor(message) {
    super(message, error);
  }
}
