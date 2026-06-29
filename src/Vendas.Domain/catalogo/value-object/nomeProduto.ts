import { DomainException } from "../../common/domainException/domain-exception.js";
import { Guard } from "../../common/validations/guard.js";

export class NomeProduto {
  private constructor(private readonly nome: string) {
    Guard.contraEmpty(this.nome,'nome e obrigadorio')
  
    Guard.contra(this.nome.length < 10,'nome deve conter no minimo 10 caracteres')
   
     Guard.contra(this.nome.length > 25,'nome deve conter no maximo 25 carecteres')
   
  }
  static criar(valor: string): NomeProduto {
    return new NomeProduto(valor);
  }
}
