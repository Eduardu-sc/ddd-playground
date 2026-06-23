import { DomainException } from "../common/domainException/domain-exception.js";
import { Guard } from "../common/validations/guard.js";
import type { DadosCliente } from "./entities/dados-Cliente.js";
import type { Cpf } from "./value-object/cpf.js";

import { StatusParceiro } from "./enums/status-parceiro.js";
import { StatusQualificacao } from "./enums/status-qualificacao.js";
import { PerfilParceiro } from "./enums/perfil-parceiro.js";

export class Parceiro {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    private status: StatusParceiro,
    private cpf: Cpf,
    private perfis: PerfilParceiro[],
    private statusQualificacao: StatusQualificacao,
    private dadosCliente?: DadosCliente,
  ) {
    Guard.contraEmpty(nome, "Nome e obrigadorio");
    Guard.contraNull(id, "Ide obrigatorio");
  }

  bloquear(): void {
    this.status = StatusParceiro.BLOQUEADO;
  }
  ativar(): void {
    this.status = StatusParceiro.ATIVO;
  }

  possuirPerfil(perfil: PerfilParceiro): boolean {
    return this.perfis.includes(perfil);
  }

  ehFornecedor(): boolean {
    return this.possuirPerfil(PerfilParceiro.FORNECEDOR);
  }

  ehCliente(): boolean {
    return this.possuirPerfil(PerfilParceiro.CLIENTE);
  }

  validarLimite(valorPedido: number): void {
    if (!this.ehCliente()) {
      throw new DomainException("Parceiro nao possui dados de cliente");
    }

    this.dadosCliente?.validarLimite(valorPedido);
  }

  podeComprar(): void {
    if (!this.ehCliente())
      throw new DomainException("Somente Cliente pode comprar");
    if (this.statusQualificacao === StatusQualificacao.NAOQUALIFICADO) {
      throw new DomainException("Parceiro nao qualificado");
    }
  }
}
