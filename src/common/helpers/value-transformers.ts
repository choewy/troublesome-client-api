export const toUndefined = <T = any>(val: T): T | undefined => (val == null ? undefined : val);
export const toNull = <T = any>(val: T): T | null => (!val ? null : val);
export const toBoolean = <T = any>(val: T): boolean | null => (typeof val === 'boolean' ? val : null);
export const toNumber = <T = any>(val: T): number | null => (typeof val === 'number' ? val : null);
