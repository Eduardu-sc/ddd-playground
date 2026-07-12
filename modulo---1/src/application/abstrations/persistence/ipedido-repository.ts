import type { Pedido } from "../../../domain/pedido/entities/pedido.js";

export interface IPedidoRepository {
  obterPorId(id: number): Promise<Pedido | null>;
  adicionar(pedido: Pedido): Promise<void>;
  atualizar(pedido: Pedido): Promise<void>;
}
