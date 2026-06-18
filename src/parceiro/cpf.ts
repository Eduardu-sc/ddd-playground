import { DomainException } from "./domain-exception.js";

export class Cpf {
  private constructor(private readonly valor: string) {
    if (valor.length !== 11) {
      throw new DomainException("Cpf Invalido");
    }
  }

  static criar(valor: string): Cpf {
    return new Cpf(valor);
  }
}
