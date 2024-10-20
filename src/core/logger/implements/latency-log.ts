import { DateTime } from 'luxon';

export class LatencyLog {
  startedAt = DateTime.local();
  finishedAt: DateTime = null;
  milliseconds: number;

  public finish() {
    this.finishedAt = DateTime.local();
    this.milliseconds = this.finishedAt.diff(this.startedAt, 'milliseconds').get('milliseconds');

    return this;
  }
}
