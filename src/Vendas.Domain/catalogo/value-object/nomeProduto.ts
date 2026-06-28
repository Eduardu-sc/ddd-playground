import { DomainException } from "../../common/domainException/domain-exception.js";

export class NomeProduto {
  private constructor(private readonly nome: string) {
    if (this.nome.length === 0) {
      throw new DomainException("nome e obrigadorio");
    }
    if (this.nome.length < 10) {
      throw new DomainException("nome deve conter no minimo 10 caracteres");
    }
    if (this.nome.length > 25) {
      throw new DomainException("nome deve conter no maximo 25 carecteres");
    }
  }
  static criar(valor: string): NomeProduto {
    return new NomeProduto(valor);
  }
}
