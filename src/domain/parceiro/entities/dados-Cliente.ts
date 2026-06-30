import { DomainException } from "../../common/exceptions/domain-exception.js";
import { Guard } from "../../common/validations/guard.js";

export class DadosCliente {
  constructor(public readonly limiteCredito: number) {
    Guard.contraValorNegativo(limiteCredito, "Valor nao pode ser negativo");
  }

  validarLimite(valorPedido: number): void {
    if (valorPedido > this.limiteCredito) {
      throw new DomainException("Limite de credito excedido");
    }
  }
}
