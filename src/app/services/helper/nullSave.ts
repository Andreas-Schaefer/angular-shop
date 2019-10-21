export function isNull(object) {
  return object === 'undefined' || object === null;
}

export function isNotNull(object) {
  return typeof object !== 'undefined' && object !== null;
}

export function lengthOf(object: any[]) {
  return isNull(object) ? 0 : object.length;
}

export function isEmpty(object: any[]) {
  return lengthOf(object) === 0;
}

export function isNotEmpty(object: any[]) {
  return lengthOf(object) > 0;
}
