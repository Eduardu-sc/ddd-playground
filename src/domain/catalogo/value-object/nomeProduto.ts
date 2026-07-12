import { ValueObject } from "../../common/base/value-object.js";
import { DomainException } from "../../common/exceptions/domain-exception.js";
import { Guard } from "../../common/validations/guard.js";

export class NomeProduto extends ValueObject {
  private constructor(private readonly nome: string) {
    super();
    Guard.contraEmpty(this.nome, "nome e obrigadorio");

    Guard.contra(
      this.nome.length < 10,
      "nome deve conter no minimo 10 caracteres",
    );

    Guard.contra(
      this.nome.length > 25,
      "nome deve conter no maximo 25 carecteres",
    );
  }
  static criar(valor: string): NomeProduto {
    return new NomeProduto(valor);
  }
  protected getEqualityComponents(): readonly unknown[] {
    return [this.nome];
  }
}
