import { Test, TestingModule } from '@nestjs/testing';
import { GetStatsTransactionService } from './get-statistics-transaction.service';
import { GetStatsTransactionUseCase } from '../useCases/get-statistics-transactio-usecase';
import { GetStatsTransactionsUnexpectedError } from '../errors/get-stats-transaction-unexpected-error';
import { StatsResponseDTO } from '@modules/transaction/infra/http/dtos/stats-response.dto';

describe('GetStatsTransactionService', () => {
  let getStatsTransactionService: GetStatsTransactionService;
  let getStatsTransactionUseCase: GetStatsTransactionUseCase;

  const statsMock: StatsResponseDTO = {
    count: 5,
    sum: 500,
    avg: 100,
    min: 50,
    max: 200,
  };

  let spyUseCaseExecute: jest.SpyInstance<Promise<StatsResponseDTO>, []>;

  beforeEach(async () => {
    const useCaseMock = {
      provide: GetStatsTransactionUseCase,
      useValue: {
        execute: jest.fn().mockResolvedValue(statsMock),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStatsTransactionService,
        useCaseMock,
      ],
    }).compile();

    getStatsTransactionService = module.get(GetStatsTransactionService);
    getStatsTransactionUseCase = module.get(GetStatsTransactionUseCase);

    spyUseCaseExecute = jest.spyOn(getStatsTransactionUseCase, 'execute');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return transaction stats successfully', async () => {
    const result = await getStatsTransactionService.execute();

    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(statsMock);
  });

  it('should throw GetStatsTransactionsUnexpectedError if useCase throws', async () => {
    spyUseCaseExecute.mockRejectedValueOnce(new Error('DB failure'));

    await expect(getStatsTransactionService.execute()).rejects.toThrow(GetStatsTransactionsUnexpectedError);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
