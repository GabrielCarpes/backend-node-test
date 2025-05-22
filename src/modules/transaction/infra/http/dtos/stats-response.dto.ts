import { ApiProperty } from "@nestjs/swagger";

export class StatsResponseDTO {
  @ApiProperty({
    type: Number,
    description: "Número total de transações",
    example: "120.00",
    required: false,
  })
  count!: number;

  @ApiProperty({
    type: Number,
    description: "Valor total das transações",
    example: "120.00",
    required: false,
  })
  sum!: number;

  @ApiProperty({
    type: Number,
    description: "Valor médio das transações",
    example: "120.00",
    required: false,
  })
  avg!: number;

  @ApiProperty({
    type: Number,
    description: "Valor mínimo das transações",
    example: "120.00",
    required: false,
  })
  min!: number;

  @ApiProperty({
    type: Number,
    description: "Valor máximo das transações",
    example: "120.00",
    required: false,
  })
  max!: number;
}
