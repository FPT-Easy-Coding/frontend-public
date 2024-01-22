export function isNumber(value) {
  return typeof value === "number";
}

export function isValidEmail(value) {
    const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return re.test(value);
}

// export const isValidPassword = (value) => {

// }

// export const isConfirmPasswordMatch = (value) => {

// }
