import { Transaction } from "@modules/transaction/application/entities/transaction";
import { Stats } from "@modules/transaction/application/interfaces/transaction.interface";

export const calculateRecentStats = (transactions: Transaction[]): Stats => {
  const now = Date.now();
  const SIXTY_SECONDS = 60 * 1000;

  const recentTransactions = transactions.filter(transaction => {
    const transactionTime = new Date(transaction.getTimestamp).getTime();
    return !isNaN(transactionTime) && (now - transactionTime) <= SIXTY_SECONDS;
  });

  const amounts = recentTransactions.map(transaction => transaction.getAmount);

  const count = amounts?.length;
  const sum = parseFloat(amounts.reduce((acc, val) => acc + val, 0).toFixed(2));
  const avg = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
  const min = count > 0 ? parseFloat(Math.min(...amounts).toFixed(2)) : 0;
  const max = count > 0 ? parseFloat(Math.max(...amounts).toFixed(2)) : 0;

  return { count, sum, avg, min, max };
}
