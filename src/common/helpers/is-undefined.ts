export const toUndefined = <T = any>(val: T) => (val == null ? undefined : val);
export const toNull = <T = any>(val: T) => (!val ? null : val);
