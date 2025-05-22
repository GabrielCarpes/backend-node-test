import { TransactionRepository } from "../repositories/transaction.repository";
import { CreateTransactionUseCase } from "./create-transactio-usecase";
import { Transaction } from "../entities/transaction";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTransactionUnexpectedError } from "../errors/create-transaction-unexpected-error";
import { transactionMock } from "./../../../../../test/factories/transaction.factory";
import { CreateTransactionRequest } from "../interfaces/transaction.interface";


const transactionMocked = transactionMock({});

let transactionRepository: TransactionRepository;
let createTransactionUseCase: CreateTransactionUseCase;

let spyTransactionRespositoryCreate: jest.SpyInstance<Promise<void>, [Transaction: Transaction]>;

describe('CreateTransactionUseCase', () => {
  beforeEach(async () => {
    const transactionRepositoryMocked = {
      provide: TransactionRepository,
      useValue: {
        create: jest.fn(() => transactionMocked),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [transactionRepositoryMocked],
    }).compile();

    transactionRepository = module.get<TransactionRepository>(TransactionRepository);

    createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);

    spyTransactionRespositoryCreate = jest.spyOn(transactionRepository, 'create');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a transaction successfully', async () => {
    const payload: CreateTransactionRequest = {
      amount: 150.75,
      timestamp: new Date().toISOString(),
    };

    await createTransactionUseCase.execute(payload);

    expect(spyTransactionRespositoryCreate).toHaveBeenCalledTimes(1);
    expect(spyTransactionRespositoryCreate).toHaveBeenCalledWith(expect.any(Transaction));
  });

  it('should throw CreateTransactionUnexpectedError if repository.create fails', async () => {
    spyTransactionRespositoryCreate.mockImplementationOnce(() => {
      throw new CreateTransactionUnexpectedError();
    });

    const payload: CreateTransactionRequest = {
      amount: 100.00,
      timestamp: new Date().toISOString(),
    };

    await expect(createTransactionUseCase.execute(payload)).rejects.toThrow(CreateTransactionUnexpectedError);
    expect(spyTransactionRespositoryCreate).toHaveBeenCalledTimes(1);
  });
});
