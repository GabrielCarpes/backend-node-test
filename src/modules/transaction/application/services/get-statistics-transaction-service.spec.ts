import { Test, TestingModule } from "@nestjs/testing";
import { CreateTransactionService } from "./create-transaction.service";
import { CreateTransactionUseCase } from "../useCases/create-transactio-usecase";
import { CreateTransactionUnexpectedError } from "../errors/create-transaction-unexpected-error";
import { transactionMock } from "test/factories/transaction.factory";
import { CreateTransactionRequest } from "../interfaces/transaction.interface";

const transactionMocked = transactionMock({});

let createTransactionService: CreateTransactionService;

let spyCreateTransactionUseCaseExecute: jest.SpyInstance<
  Promise<void>,
  [payload: CreateTransactionRequest]
>;

describe('CreateTransactionService', () => {
  beforeEach(async () => {
    const createTransactionUseCaseMocked = {
      provide: CreateTransactionUseCase,
      useValue: {
        execute: jest.fn(() => transactionMocked),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        createTransactionUseCaseMocked
      ],
    }).compile();

    const createTransactionUseCase =
      module.get<CreateTransactionUseCase>(CreateTransactionUseCase);

    createTransactionService = new CreateTransactionService(
      createTransactionUseCase
    );

    spyCreateTransactionUseCaseExecute = jest.spyOn(createTransactionUseCase, 'execute');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be able to create a transaction", async () => {
    const props: CreateTransactionRequest = {
      amount: 120.00,
      timestamp: "2024-02-20T12:34:56.789Z"
    };

    await createTransactionService.execute(props);

    expect(spyCreateTransactionUseCaseExecute).toHaveBeenCalledTimes(1);
    expect(createTransactionService.execute(props)).not.toBeInstanceOf(CreateTransactionUnexpectedError);
  });
});
