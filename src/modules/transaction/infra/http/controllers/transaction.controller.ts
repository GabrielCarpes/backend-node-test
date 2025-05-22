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
import { GetStatsTransactionService } from "@modules/transaction/application/services/get-statistics-transaction.service";
import { StatsResponseDTO } from "../dtos/stats-response.dto";

@ApiTags("Transações")
@Controller("transactions")
export class TransactionController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly deleteAllTransactionService: DeleteAllTransactionService,
    private readonly getStatsTransactionService: GetStatsTransactionService,
  ) {}

  @ApiOperation({
    summary: "Criar uma nova transação",
    description: `
      Cria uma nova transação financeira com valor e timestamp informados.
    `,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ 
    type: CreateTransactionBodyDTO, 
    description: "Objeto contendo os dados da transação a ser criada." 
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Transação criada com sucesso.",
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "Dados inválidos enviados no corpo da requisição.",
    type: InvalidFieldsExceptionDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "O timestamp informado deve estar no formato ISO 8601 (UTC).",
    type: InvalidFieldsExceptionDTO,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Erro inesperado ao tentar criar a transação.",
    type: CreateTransactionUnexpectedError,
  })
  @Post()
  async createTransaction(
    @Body() { amount, timestamp }: CreateTransactionBodyDTO
  ): Promise<void> {
    await this.createTransactionService.execute({ amount, timestamp });
  }

  @ApiOperation({
    summary: "Remover todas as transações",
    description: `
      Remove todas as transações existentes no sistema.
      Esta ação é irreversível e remove todos os dados de transações atuais.
    `,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Todas as transações foram removidas com sucesso.",
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Erro inesperado ao tentar remover as transações.",
    type: DeleteTransactionUnexpectedError,
  })
  @Delete()
  async deleteAllTransaction(): Promise<void> {
    await this.deleteAllTransactionService.execute();
  }

  @ApiOperation({
    summary: "Obter estatísticas das transações",
    description: `
      Retorna as estatísticas calculadas com base nas transações dos últimos 60 segundos.
      As estatísticas incluem soma, média, máximo, mínimo e quantidade de transações nesse período.
    `,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Estatísticas obtidas com sucesso.",
    type: StatsResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Erro inesperado ao tentar obter as estatísticas.",
    type: GetStatsTransactionUseCase,
  })
  @Get('/stats')
  async getStatsTransaction(): Promise<StatsResponseDTO> {
    return await this.getStatsTransactionService.execute();
  }
}

