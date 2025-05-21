import { CreateTransactionUnexpectedError } from "@modules/transaction/application/errors/create-transaction-unexpected-error";
import { CreateTransactionService } from "@modules/transaction/application/services/create-transaction.service";
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateTransactionBodyDTO } from "../dtos/create-transaction.dto";
import { InvalidFieldsExceptionDTO } from "../dtos/invalid-fields-exception.dto";

@ApiTags("Transaction")
@Controller("transactions")
export class TransactionController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
  ) {}

  @ApiOperation({
    summary: "Cria transação",
    description:
      "<p><strong>Descrição:</strong></p><p>Esta rota é utilizada para criar um transação.",
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateTransactionBodyDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: InvalidFieldsExceptionDTO,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: CreateTransactionUnexpectedError,
  })
  @Post()
  async createTransaction(
    @Body() { amount, timestamp }: CreateTransactionBodyDTO
  ): Promise<void> {
    await this.createTransactionService.execute({
      amount, 
      timestamp
    });
  }
}
