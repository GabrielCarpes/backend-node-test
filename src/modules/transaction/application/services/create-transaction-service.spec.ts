import { Test, TestingModule } from "@nestjs/testing";
import { CreateTransactionService } from "./create-transaction.service";
import { CreateTransactionUseCase } from "../useCases/create-transactio-usecase";
import { CreateTransactionUnexpectedError } from "../errors/create-transaction-unexpected-error";
import { transactionMock } from "./../../../../../test/factories/transaction.factory";
import { CreateTransactionRequest } from "../interfaces/transaction.interface";
import { InvalidFormatTimestampTransactionError } from "../errors/invalid-timestamp-format-error";
import { InvalidTimestampTransactionError } from "../errors/invalid-timestamp-error";

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

  it("should create a transaction successfully", async () => {
    const props: CreateTransactionRequest = {
      amount: 120.00,
      timestamp: "2024-02-20T12:34:56.789Z"
    };
  
    await expect(createTransactionService.execute(props)).resolves.toBeUndefined();
  
    expect(spyCreateTransactionUseCaseExecute).toHaveBeenCalledTimes(1);
    expect(spyCreateTransactionUseCaseExecute).toHaveBeenCalledWith(props);
  });
  
  it("should throw CreateTransactionUnexpectedError if use case throws unexpected error", async () => {
    spyCreateTransactionUseCaseExecute.mockImplementationOnce(() => {
      throw new CreateTransactionUnexpectedError();
    });
  
    const props: CreateTransactionRequest = {
      amount: 200.00,
      timestamp: "2023-01-01T00:00:00.000Z"
    };
  
    await expect(createTransactionService.execute(props)).rejects.toThrow(CreateTransactionUnexpectedError);
  });
  

  it("should throw InvalidFormatTimestampTransactionError if timestamp is not ISO 8601", async () => {
    const props: CreateTransactionRequest = {
      amount: 99.99,
      timestamp: "invalid-date-format",
    };

    spyCreateTransactionUseCaseExecute.mockImplementationOnce(() => {
      throw new InvalidFormatTimestampTransactionError();
    });

    await expect(createTransactionService.execute(props)).rejects.toThrow(InvalidFormatTimestampTransactionError);
  });

  it("should throw InvalidTimestampTransactionError if timestamp is in the future", async () => {
    const props: CreateTransactionRequest = {
      amount: 150.00,
      timestamp: new Date(Date.now() + 60000).toISOString(),
    };

    spyCreateTransactionUseCaseExecute.mockImplementationOnce(() => {
      throw new InvalidTimestampTransactionError();
    });

    await expect(createTransactionService.execute(props)).rejects.toThrow(InvalidTimestampTransactionError);
  });
});
