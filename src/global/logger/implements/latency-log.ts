import { DateTime } from 'luxon';

export class LatencyLog {
  start: DateTime;
  end: DateTime;
  milliseconds: number;

  constructor() {
    this.start = DateTime.local();
  }

  public finish() {
    this.end = DateTime.local();
    this.milliseconds = this.end.diff(this.start, 'milliseconds').get('milliseconds');

    return this;
  }
}
