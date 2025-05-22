import { transactionMock } from "./../../../../../test/factories/transaction.factory";
import { TransactionRepository } from "../repositories/transaction.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { DeleteAllTransactionUseCase } from "./delete-all-transactio-usecase";
import { DeleteTransactionUnexpectedError } from "../errors/delete-transaction-unexpected-error";


const transactionMocked = transactionMock({});

let transactionRepository: TransactionRepository;
let deleteAllTransactionUseCase: DeleteAllTransactionUseCase;

let spyTransactionRespositoryDeleteAll: jest.SpyInstance<Promise<void>, []>;

describe('DeleteAllTransactionUseCase', () => {
  beforeEach(async () => {
    const transactionRepositoryMocked = {
      provide: TransactionRepository,
      useValue: {
        deleteAll: jest.fn(() => transactionMocked),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [transactionRepositoryMocked],
    }).compile();

    transactionRepository = module.get<TransactionRepository>(TransactionRepository);

    deleteAllTransactionUseCase = new DeleteAllTransactionUseCase(transactionRepository);

    spyTransactionRespositoryDeleteAll = jest.spyOn(transactionRepository, 'deleteAll');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to deleteAll a Transaction', async () => {

    await deleteAllTransactionUseCase.execute();

    expect(spyTransactionRespositoryDeleteAll).toHaveBeenCalledTimes(1);
    expect(deleteAllTransactionUseCase.execute()).not.toBeInstanceOf(DeleteTransactionUnexpectedError);
  });

  it('should throw error if delet all fails', async () => {
    spyTransactionRespositoryDeleteAll.mockImplementationOnce(() => {
      throw new DeleteTransactionUnexpectedError();
    });
    await expect(deleteAllTransactionUseCase.execute()).rejects.toThrow(DeleteTransactionUnexpectedError);
    expect(spyTransactionRespositoryDeleteAll).toHaveBeenCalledTimes(1);
  });
});
