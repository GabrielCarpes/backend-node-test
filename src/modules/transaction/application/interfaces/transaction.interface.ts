export interface CreateTransactionRequest {
  amount: number;
  timestamp: string;
}

export interface Stats {
  count: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
}