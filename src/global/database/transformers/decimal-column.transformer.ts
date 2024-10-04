import Decimal from 'decimal.js';
import { FindOperator, ValueTransformer } from 'typeorm';

export class DecimalColumnTransformer implements ValueTransformer {
  constructor(private readonly precision?: number) {}

  to(value: Decimal | FindOperator<Decimal> | null): string | FindOperator<Decimal> | null {
    if (value == null) {
      return null;
    }

    if (value instanceof FindOperator) {
      return value;
    }

    return value.toFixed(this.precision);
  }

  from(value: number | string | null): Decimal | null {
    if (value == null) {
      return null;
    }

    return new Decimal(value);
  }
}
