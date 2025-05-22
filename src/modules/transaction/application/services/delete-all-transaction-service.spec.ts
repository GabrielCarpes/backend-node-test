import { Test, TestingModule } from "@nestjs/testing";
import { transactionMock } from "./../../../../../test/factories/transaction.factory";
import { DeleteAllTransactionService } from "./delete-all-transaction.service";
import { DeleteAllTransactionUseCase } from "../useCases/delete-all-transactio-usecase";
import { DeleteTransactionUnexpectedError } from "../errors/delete-transaction-unexpected-error";

const transactionMocked = transactionMock({});

let deleteAllTransactionService: DeleteAllTransactionService;

let spyDeleteAllTransactionUseCaseExecute: jest.SpyInstance<
  Promise<void>,
  []
>;

describe('DeleteAllTransactionService', () => {
  beforeEach(async () => {
    const deleteAllTransactionUseCaseMocked = {
      provide: DeleteAllTransactionUseCase,
      useValue: {
        execute: jest.fn(() => transactionMocked),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        deleteAllTransactionUseCaseMocked
      ],
    }).compile();

    const deleteAllTransactionUseCase =
      module.get<DeleteAllTransactionUseCase>(DeleteAllTransactionUseCase);

    deleteAllTransactionService = new DeleteAllTransactionService(
      deleteAllTransactionUseCase
    );

    spyDeleteAllTransactionUseCaseExecute = jest.spyOn(deleteAllTransactionUseCase, 'execute');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be able to deleteAll a transaction", async () => {

    await deleteAllTransactionService.execute();

    expect(spyDeleteAllTransactionUseCaseExecute).toHaveBeenCalledTimes(1);
    expect(deleteAllTransactionService.execute()).not.toBeInstanceOf(DeleteTransactionUnexpectedError);
  });
});
