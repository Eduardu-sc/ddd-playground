import { eq } from "drizzle-orm";
import type { IPedidoRepository } from "../../../application/abstrations/persistence/ipedido-repository.js";
import type { Pedido } from "../../../domain/pedido/entities/pedido.js";
import { AppDatabase } from "../config/database.js";
import { pedidos } from "../schema/pedido.table.js";

export class PedidoRepository implements IPedidoRepository {
  private readonly db = AppDatabase.db;
  async adicionar(pedido: Pedido): Promise<void> {
    const endereco = pedido.getEnderecoEntrega;
    await this.db.insert(pedidos).values({
      numeroPedido: pedido.numeroPedido,
      parceiroId: pedido.parceiroId,
      statusPedido: pedido.getStatusPedido(),
      dataCriacao: pedido.dataCriacao,
      dataAtualizacao: pedido.getDataAtualizacao,
      enderecoCep: endereco.cep,
      enderecoLogradouro: endereco.logradouro,
      enderecoNumero: endereco.numero,
      enderecoComplemento: endereco.complemento,
      enderecoBairro: endereco.bairro,
      enderecoCidade: endereco.cidade,
      enderecoUf: endereco.uf,
      enderecoPais: endereco.pais,
    });
  }
  async atualizar(pedido: Pedido): Promise<void> {
    const endereco = pedido.getEnderecoEntrega;

    await this.db
      .update(pedidos)
      .set({
        numeroPedido: pedido.numeroPedido,
        parceiroId: pedido.parceiroId,
        statusPedido: pedido.getStatusPedido(),
        dataAtualizacao: pedido.getDataAtualizacao,

        enderecoCep: endereco.cep,
        enderecoLogradouro: endereco.logradouro,
        enderecoNumero: endereco.numero,
        enderecoComplemento:
          endereco.complemento === "" ? null : endereco.complemento,
        enderecoBairro: endereco.bairro,
        enderecoCidade: endereco.cidade,
        enderecoUf: endereco.uf,
        enderecoPais: endereco.pais,
      })
      .where(eq(pedidos.id, pedido.id));
  }
  async listarTodos(): Promise<readonly Pedido[]> {
    return;
  }
  async obterPorId(id: number): Promise<Pedido | null> {
    return;
  }
}
