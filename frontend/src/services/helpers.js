export function toOptionalFloat(value) {
  if (value === "" || value === undefined) return undefined;
  return parseFloat(value);
}

export function toOptionalBool(value) {
  if (value === "" || value === undefined) return undefined;
  return value === true;
}
