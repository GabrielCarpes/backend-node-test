import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsPositive
} from "class-validator";

export class CreateTransactionBodyDTO {
  @IsNumber({},{ message: "o campo amount deve ser um decimal" })
  @IsPositive({ message: "o campo amount deve ser um positivo" })
  @IsNotEmpty({ message: "o campo amount é obrigatório" })
  @ApiProperty({
    type: Number,
    minimum: 1,
    description: "Valor da transação",
    example: "120.00",
    required: true,
  })
  amount!: number;

  @IsNotEmpty({ message: "o campo timestamp é obrigatório" })
  @IsDateString({},{ message: "o campo timestamp deve ser formato ISO 8601 (UTC)" })
  @ApiProperty({
    type: String,
    minimum: 1,
    description: "Data e hora da transação no formato ISO 8601 (UTC)",
    example: "2024-02-20T12:34:56.789Z",
    required: true,
  })
  timestamp!: string;
}
