import { describe, it, expect } from "vitest";
import { Cpf } from "../value-object/cpf.js";

describe("Cpf", () => {
  it("Deve lancar um erro quando o cpf for diferente 11 digitos", () => {
    expect(() => {
      Cpf.criar("1234563");
    }).toThrow("CPF deve possuir 11 digitos");
  });
});
