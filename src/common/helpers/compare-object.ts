import { instanceToPlain } from 'class-transformer';

export const compareObjectValues = (target: object, origin: object) => {
  let isSame = true;

  const targetObject = instanceToPlain(target, { enableCircularCheck: true, enableImplicitConversion: true });
  const originObject = instanceToPlain(origin, { enableCircularCheck: true, enableImplicitConversion: true });

  for (const key of Object.keys(targetObject)) {
    const targetValue = targetObject[key];
    const originValue = originObject[key];

    if (targetValue === originValue || originValue === undefined) {
      continue;
    }

    if (targetValue === null || originValue === null) {
      isSame = false;
      break;
    }

    if (typeof targetValue === 'object' && typeof originValue === 'object') {
      isSame = compareObjectValues(targetValue, originValue);

      if (isSame === true) {
        continue;
      }
    }

    isSame = false;
  }

  return isSame;
};
