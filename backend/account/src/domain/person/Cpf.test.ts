import Cpf from "./Cpf";

test.each(["83432616074", "74587887803", "87175659520"])(
  "validates the cpf %s",
  (value: string) => {
    const cpf = new Cpf(value);
    expect(cpf.value).toBe(value);
  }
);

test.each(["83432616076", "99999999999", "834326160", ""])(
  "throws an error for the invalid cpf %s",
  (cpf: string) => {
    expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
  }
);
