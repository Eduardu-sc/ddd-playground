import { eq } from "drizzle-orm";
import type { IPedidoRepository } from "../../../application/abstrations/persistence/ipedido-repository.js";
import { Pedido } from "../../../domain/pedido/entities/pedido.js";
import { StatusPedido } from "../../../domain/pedido/enums/statusPedido.js";
import { EnderecoEntrega } from "../../../domain/pedido/value-object/endereco-entrega.js";
import { AppDatabase } from "../config/database.js";
import { pedidos } from "../schema/pedido.table.js";
import { itensPedido } from "../schema/item-pedido.table.js";
import { ItemPedido } from "../../../domain/pedido/entities/item-pedido.js";
import { pagamentos } from "../schema/pagamento.table.js";
import { Pagamento } from "../../../domain/pedido/entities/pagamento.js";

import { MetodoPagamento } from "../../../domain/pedido/enums/metodo-pagamento.js";
import { StatusPagamento } from "../../../domain/pedido/enums/pagamento.enum.js";

export class PedidoRepository implements IPedidoRepository {
  private readonly db = AppDatabase.db;

  async adicionar(pedido: Pedido): Promise<void> {
    const endereco = pedido.getEnderecoEntrega;
    const [registro] = await this.db
      .insert(pedidos)
      .values({
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
      })
      .returning({ id: pedidos.id });

    if (!registro) {
      throw new Error("Erro ao gerar o ID.");
    }
    pedido.definirId(registro.id);
  }
  async atualizar(pedido: Pedido): Promise<void> {
    const endereco = pedido.getEnderecoEntrega;

    await this.db
      .update(pedidos)
      .set({
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

    // Remove os itens antigos
    await this.db
      .delete(itensPedido)
      .where(eq(itensPedido.pedidoId, pedido.id));

    if (pedido.getItens().length > 0) {
      await this.db.insert(itensPedido).values(
        pedido.getItens().map((item) => ({
          pedidoId: pedido.id,
          produtoId: item.produtoId,
          nome: item.nome,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
        })),
      );
    }
  }
  async listarTodos(): Promise<readonly Pedido[]> {
    const registros = await this.db.select().from(pedidos);

    return Promise.all(
      registros.map(async (registro) => {
        const itens = await this.db
          .select()
          .from(itensPedido)
          .where(eq(itensPedido.pedidoId, registro.id));

        const enderecoEntrega = EnderecoEntrega.criar(
          registro.enderecoCep,
          registro.enderecoLogradouro,
          registro.enderecoBairro,
          registro.enderecoComplemento ?? "",
          registro.enderecoUf,
          registro.enderecoCidade,
          registro.enderecoPais,
          registro.enderecoNumero,
        );

        const itensRestaurados = itens.map((item) =>
          ItemPedido.restaurar(
            item.id,
            item.produtoId,
            item.nome,
            item.quantidade,
            item.valorUnitario,
          ),
        );

        return Pedido.restaurar(
          registro.id,
          registro.parceiroId,
          enderecoEntrega,
          registro.statusPedido as StatusPedido,
          itensRestaurados,
          null,
          null,
        );
      }),
    );
  }

  async obterPorId(id: number): Promise<Pedido | null> {
    const [registro] = await this.db
      .select()
      .from(pedidos)
      .where(eq(pedidos.id, id));

    if (!registro) {
      return null;
    }

    const itens = await this.db
      .select()
      .from(itensPedido)
      .where(eq(itensPedido.pedidoId, registro.id));

    const [pagamento] = await this.db
      .select()
      .from(pagamentos)
      .where(eq(pagamentos.pedidoId, registro.id));

    const enderecoEntrega = EnderecoEntrega.criar(
      registro.enderecoCep,
      registro.enderecoLogradouro,
      registro.enderecoBairro,
      registro.enderecoComplemento ?? "",
      registro.enderecoUf,
      registro.enderecoCidade,
      registro.enderecoPais,
      registro.enderecoNumero,
    );

    const itemRestaurados = itens.map((item) =>
      ItemPedido.restaurar(
        item.id,
        item.produtoId,
        item.nome,
        item.quantidade,
        item.valorUnitario,
      ),
    );

    const pagamentoRestaurado = pagamento
      ? Pagamento.restaurar(
          pagamento.id,
          pagamento.pedidoId,
          pagamento.metodoPagamento as MetodoPagamento,
          pagamento.valor,
          pagamento.statusPagamento as StatusPagamento,
          pagamento.dataPagamento,
          pagamento.codigoTransacao ?? "",
        )
      : null;

    return Pedido.restaurar(
      registro.id,
      registro.parceiroId,
      enderecoEntrega,
      registro.statusPedido as StatusPedido,
      itemRestaurados,
      pagamentoRestaurado,
      null,
    );
  }
}
