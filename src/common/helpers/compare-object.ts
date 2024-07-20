import { instanceToPlain } from 'class-transformer';

export const compareObjectValues = (target: object, origin: object) => {
  const targetObject = instanceToPlain(target, { enableCircularCheck: true, enableImplicitConversion: true });
  const originObject = instanceToPlain(origin, { enableCircularCheck: true, enableImplicitConversion: true });

  let isSame = true;

  for (const key of Object.keys(targetObject)) {
    const targetValue = targetObject[key];
    const originValue = originObject[key];

    if (targetValue === originValue || originValue === undefined) {
      continue;
    }

    if (typeof targetValue === 'object' && typeof originValue === 'object' && targetValue !== null && originValue !== null) {
      if (compareObjectValues(targetValue, originValue)) {
        continue;
      }
    }

    isSame = false;
    break;
  }

  return isSame;
};
