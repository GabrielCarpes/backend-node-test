export class Transaction {
  private amount: number;
  private timestamp: string;

  constructor({
    amount,
    timestamp,
  }) {
    this.amount  = amount,
    this.timestamp = timestamp
  };

  public get getAmount(): number {
    return this.amount;
  }

  public get getTimestamp(): string {
    return this.timestamp;
  }
}
