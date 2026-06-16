import { DomainException } from "./domain-exception.js";
import { Guard } from "./guard.js";

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
