export class Stats {
  private count: number;
  private sum: number;
  private avg: number;
  private min: number;
  private max: number;

  constructor({
    count, sum, avg, min, max
  }) {
    this.count  = count,
    this.sum = sum,
    this.avg = avg,
    this.min = min,
    this.max = max
  };

  public get getCount(): number {
    return this.count;
  }

  public get getSum(): number {
    return this.sum;
  }

  public get getAvg(): number {
    return this.avg;
  }

  public get getMin(): number {
    return this.min;
  }

  public get getMax(): number {
    return this.max;
  }
}
