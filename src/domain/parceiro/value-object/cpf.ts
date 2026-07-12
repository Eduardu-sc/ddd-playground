import { ValueObject } from "../../common/base/value-object.js";
import { DomainException } from "../../common/exceptions/domain-exception.js";

export class Cpf extends ValueObject {
  private constructor(private readonly valor: string) {
    super();
    if (valor.length !== 11) {
      throw new DomainException("CPF deve possuir 11 digitos");
    }
  }

  static criar(valor: string): Cpf {
    return new Cpf(valor);
  }
  protected getEqualityComponents(): readonly unknown[] {
    return [this.valor];
  }
}
