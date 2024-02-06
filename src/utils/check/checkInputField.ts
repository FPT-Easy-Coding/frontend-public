export function isNumber(value: any) {
  return typeof value === "number";
}

export function isValidEmail(value: string) {
    const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return re.test(value);
}