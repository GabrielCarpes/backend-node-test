import { TransactionRepository } from "../repositories/transaction.repository";
import { CreateTransactionUseCase } from "./create-transactio-usecase";
import { Transaction } from "../entities/transaction";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateTransactionRequest } from "../interfaces/create-transaction-request.interface";
import { CreateTransactionUnexpectedError } from "../errors/create-transaction-unexpected-error";
import { transactionMock } from "@test/factories/transaction.factory";


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

  it('should be able to create a Transaction', async () => {
    const props: CreateTransactionRequest = {
      amount: 120.00,
      timestamp: "2024-02-20T12:34:56.789Z"
    };

    await createTransactionUseCase.execute(props);

    expect(spyTransactionRespositoryCreate).toHaveBeenCalledTimes(1);
    expect(createTransactionUseCase.execute(props)).not.toBeInstanceOf(CreateTransactionUnexpectedError);
  });
});
