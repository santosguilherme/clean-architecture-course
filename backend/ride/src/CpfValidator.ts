const hasValidLength = (cpf: string) => {
  return cpf.length === 11;
};

const removeNonDigits = (cpf: string) => {
  return cpf.replace(/\D/g, "");
};

const areAllDigitsRepeated = (cpf: string) => {
  const [firstDigit] = cpf;
  return [...cpf].every((digit) => digit === firstDigit);
};

const getVerifyingDigits = (cpf: string) => {
  return cpf.slice(9);
};

const calculateVerifyingDigit = (cpf: string, factor: number) => {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) {
      total += parseInt(digit) * factor--;
    }
  }
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
};

export function validate(value: string) {
  const cpf = removeNonDigits(value);
  if (!hasValidLength(cpf) || areAllDigitsRepeated(cpf)) {
    return false;
  }
  const firstDigit = calculateVerifyingDigit(cpf, 10);
  const secondDigit = calculateVerifyingDigit(cpf, 11);
  return getVerifyingDigits(cpf) === `${firstDigit}${secondDigit}`;
}
