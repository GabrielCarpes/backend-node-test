import { Transaction } from "@modules/transaction/application/entities/transaction";


interface TransactionMockProps {
  amount?: number;
  timestamp?: string;
}

export const transactionMock = ({
  amount = 100.00,
  timestamp = "2024-02-20T12:34:56.789Z",
}: TransactionMockProps): Transaction => {
  return new Transaction({
    amount: amount,
    timestamp: timestamp,
  });
}
