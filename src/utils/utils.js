export function envIsTrue(value) {
  return value === true || value === 'TRUE' || value === 'true' || !!parseInt(value, 10);
}

export function envIsFalse(value) {
  return !envIsTrue(value);
}
