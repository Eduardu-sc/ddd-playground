import type { IPedidoRepository } from "../../application/abstrations/persistence/ipedido-repository.js";
import type { Pedido } from "../../domain/pedido/entities/pedido.js";

export class FakePedidoRepository implements IPedidoRepository {
  private readonly pedidos = new Map<number, Pedido>();

  async obterPorId(id: number): Promise<Pedido | null> {
    return this.pedidos.get(id) ?? null;
  }

  async adicionar(pedido: Pedido): Promise<void> {
    this.pedidos.set(pedido.id, pedido);
  }

  async atualizar(pedido: Pedido): Promise<void> {
    if (!this.pedidos.has(pedido.id)) {
      throw new Error("Pedido não encontrado.");
    }

    this.pedidos.set(pedido.id, pedido);
  }

  async listarTodos(): Promise<readonly Pedido[]> {
    return [...this.pedidos.values()];
  }
}