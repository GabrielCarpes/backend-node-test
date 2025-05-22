import { CreateTransactionUnexpectedError } from "@modules/transaction/application/errors/create-transaction-unexpected-error";
import { CreateTransactionService } from "@modules/transaction/application/services/create-transaction.service";
import {
  Body,
  Controller,
  Delete,
  Get,
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
import { DeleteTransactionUnexpectedError } from "@modules/transaction/application/errors/delete-transaction-unexpected-error";
import { DeleteAllTransactionService } from "@modules/transaction/application/services/delete-all-transaction.service";
import { GetStatsTransactionUseCase } from "@modules/transaction/application/useCases/get-statistics-transactio-usecase";
import { Stats } from "@modules/transaction/application/interfaces/transaction.interface";
import { GetStatsTransactionService } from "@modules/transaction/application/services/get-statistics-transaction.service";

@ApiTags("Transaction")
@Controller("transactions")
export class TransactionController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly deleteAllTransactionService: DeleteAllTransactionService,
    private readonly getStatsTransactionService: GetStatsTransactionService,
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

  @ApiOperation({
    summary: "Remove todas as transação",
    description:
      "<p><strong>Descrição:</strong></p><p>Esta rota é utilizada para remover todas as transação.",
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: DeleteTransactionUnexpectedError,
  })
  @Delete()
  async deleteAllTransaction(): Promise<void> {
    await this.deleteAllTransactionService.execute();
  }

  @ApiOperation({
    summary: "Retorna a estatística das transações",
    description:
      "<p><strong>Descrição:</strong></p><p>Esta rota é utilizada para retornar a estatística das transações dos últimos 60 segundos.",
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: GetStatsTransactionUseCase,
  })
  @Get()
  async getStatsTransaction(): Promise<Stats> {
    return await this.getStatsTransactionService.execute();
  }
}
