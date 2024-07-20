import { Transform } from 'class-transformer';

export const nullToEmptyString = (val: unknown) => {
  if (val === null) {
    return '';
  }

  return val;
};

export const NullToEmptyString = () => Transform(({ value }) => nullToEmptyString(value));
