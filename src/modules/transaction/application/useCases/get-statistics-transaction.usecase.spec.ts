import { TransactionRepository } from "../repositories/transaction.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { transactionMock } from "./../../../../../test/factories/transaction.factory";
import { GetStatsTransactionUseCase } from "./get-statistics-transactio-usecase";
import { Stats } from "../interfaces/transaction.interface";
import { GetStatsTransactionsUnexpectedError } from "../errors/get-stats-transaction-unexpected-error";


const transactionMocked = transactionMock({});

let transactionRepository: TransactionRepository;
let getStatsTransactionUseCase: GetStatsTransactionUseCase;

let spyTransactionRespositoryGetStats: jest.SpyInstance<Promise<Stats>, []>;

describe('GetStatsTransactionUseCase', () => {
  beforeEach(async () => {
    const transactionRepositoryMocked = {
      provide: TransactionRepository,
      useValue: {
        getStats: jest.fn(() => transactionMocked),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [transactionRepositoryMocked],
    }).compile();

    transactionRepository = module.get<TransactionRepository>(TransactionRepository);

    getStatsTransactionUseCase = new GetStatsTransactionUseCase(transactionRepository);

    spyTransactionRespositoryGetStats = jest.spyOn(transactionRepository, 'getStats');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to get transactions statistics', async () => {

    await getStatsTransactionUseCase.execute();

    expect(spyTransactionRespositoryGetStats).toHaveBeenCalledTimes(1);
    expect(getStatsTransactionUseCase.execute()).not.toBeInstanceOf(GetStatsTransactionsUnexpectedError);
  });

  it('should throw error if get stats fails', async () => {
    spyTransactionRespositoryGetStats.mockImplementationOnce(() => {
      throw new GetStatsTransactionsUnexpectedError();
    });
    await expect(getStatsTransactionUseCase.execute()).rejects.toThrow(GetStatsTransactionsUnexpectedError);
    expect(spyTransactionRespositoryGetStats).toHaveBeenCalledTimes(1);
  });
  
});
