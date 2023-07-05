export default class Cpf {
  value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error("Invalid cpf");
    }
    this.value = value;
  }

  private hasValidLength(cpf: string) {
    return cpf.length === 11;
  }

  private removeNonDigits(cpf: string) {
    return cpf.replace(/\D/g, "");
  }

  private areAllDigitsRepeated(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every((digit) => digit === firstDigit);
  }

  private getVerifyingDigits(cpf: string) {
    return cpf.slice(9);
  }

  private calculateVerifyingDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) {
        total += parseInt(digit) * factor--;
      }
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private validate(value: string) {
    const cpf = this.removeNonDigits(value);
    if (!this.hasValidLength(cpf) || this.areAllDigitsRepeated(cpf)) {
      return false;
    }
    const firstDigit = this.calculateVerifyingDigit(cpf, 10);
    const secondDigit = this.calculateVerifyingDigit(cpf, 11);
    return this.getVerifyingDigits(cpf) === `${firstDigit}${secondDigit}`;
  }
}
