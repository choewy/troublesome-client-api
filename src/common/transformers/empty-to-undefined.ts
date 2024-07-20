import { Transform } from 'class-transformer';

export const emptyToUndefined = (val: unknown) => {
  if (val == null) {
    return undefined;
  }

  return val;
};

export const EmptyToUndefined = () => Transform(({ value }) => emptyToUndefined(value));
