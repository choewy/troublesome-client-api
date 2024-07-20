import { Transform } from 'class-transformer';

export const emptyStringToNull = (val: unknown) => {
  if (val === '') {
    return null;
  }

  return val;
};

export const EmptyStringToNull = () => Transform(({ value }) => emptyStringToNull(value));
