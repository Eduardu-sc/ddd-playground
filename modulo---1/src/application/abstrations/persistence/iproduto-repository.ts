import type { Produto } from "../../../domain/catalogo/entities/produto.js";

export interface IProdutoRepository {
  obterPorId(id: number): Promise<Produto | null>;
  adicionar(pedido: Produto): Promise<void>;
  atualizar(pedido: Produto): Promise<void>;
}
