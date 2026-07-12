import type { Parceiro } from "../../../domain/parceiro/entities/parceiro.js";

export interface IRepositorParceiro {
  obterPorId(id: number): Promise<Parceiro | null>;
  adicionar(parceiro: Parceiro): Promise<void>;
  atualizar(parceiro: Parceiro): Promise<void>;
}
