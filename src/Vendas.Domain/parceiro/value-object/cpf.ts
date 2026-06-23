import { DomainException } from "../../common/domainException/domain-exception.js";

export class Cpf {
  private constructor(private readonly valor: string) {
    if (valor.length !== 11) {
      throw new DomainException("CPF deve possuir 11 digitos");
    }
  }

  static criar(valor: string): Cpf {
    return new Cpf(valor);
  }
}
