import type { Cpf } from "./cpf.js";
import { DomainException } from "./domain-exception.js";
import { StatusParceiro } from "./status-parceiro.js";

export class Parceiro {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    private status: StatusParceiro,
    private cpf: Cpf,
  ) {}
  bloquear(): void {
    this.status = StatusParceiro.BLOQUEADO;
  }
  ativar(): void {
    this.status = StatusParceiro.ATIVO;
  }
  validarCompra(): void {
    if (this.status === StatusParceiro.BLOQUEADO) {
      throw new DomainException("parceiro nao pode comprar");
    }
  }
}
