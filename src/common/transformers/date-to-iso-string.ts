import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export const dateToISOString = (val: unknown) => {
  if (val == null) {
    return val;
  }

  let datetime: DateTime = null;

  switch (true) {
    case val instanceof Date:
      datetime = DateTime.fromJSDate(val);
      break;

    case typeof val === 'string':
      datetime = DateTime.fromJSDate(new Date(val));

      if (datetime.isValid === false) {
        datetime = null;
      }
      break;
  }

  if (datetime === null) {
    return val;
  }

  return datetime.toISO({ includeOffset: false });
};

export const DateToISOString = () => Transform(({ value }) => dateToISOString(value));
