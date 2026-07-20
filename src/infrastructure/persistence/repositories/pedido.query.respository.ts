import { eq } from "drizzle-orm";
import { EnderecoEntregaDto } from "../../../application/queries/pedidos/dto/enderecoEntregaDto.js";
import { ItemResumoDto } from "../../../application/queries/pedidos/dto/itemResumoDto.js";
import { PagamentoDto } from "../../../application/queries/pedidos/dto/pagamentoDto.js";
import { PagamentoPorStatusDto } from "../../../application/queries/pedidos/dto/pagamentoPorStatusDto.js";
import { PedidoCompletoDto } from "../../../application/queries/pedidos/dto/pedidoCompletoDto.js";
import { PedidoResumoDto } from "../../../application/queries/pedidos/dto/pedidoResumoDto.js";
import { AppDatabase } from "../config/database.js";
import { itensPedido } from "../schema/item-pedido.table.js";
import { pagamentos } from "../schema/pagamento.table.js";
import { pedidos } from "../schema/pedido.table.js";
import type { IPedidoQueryRepository } from "./../../../application/abstrations/persistence/iPedidoQueryRepository.js";

export class PedidoQueryRepository implements IPedidoQueryRepository {
  private readonly db = AppDatabase.db;

  async listarPagamentoPorStatus(): Promise<readonly PagamentoPorStatusDto[]> {
    const registros = await this.db
      .select()
      .from(pagamentos)
      .innerJoin(pedidos, eq(pagamentos.pedidoId, pedidos.id));

    return registros.map(
      ({ pagamentos: pagamento, pedidos: pedido }) =>
        new PagamentoPorStatusDto(
          pagamento.id,
          pedido.parceiroId,
          pagamento.valor,
          pagamento.statusPagamento,
          String(pagamento.metodoPagamento),
          pagamento.codigoTransacao ?? undefined,
          pagamento.dataPagamento ?? undefined,
        ),
    );
  }

  async listarResumo(): Promise<readonly PedidoResumoDto[]> {
    const registros = await this.db.select().from(pedidos);
    const itens = await this.db.select().from(itensPedido);
    const listaPagamentos = await this.db.select().from(pagamentos);

    const listaPedidos = registros.map(
      (p) => {
        const itensDoPedido = itens.filter((item) => item.pedidoId === p.id);
        const pagamentosDoPedido = listaPagamentos.filter(
          (pagamento) => pagamento.pedidoId === p.id,
        );

        return new PedidoResumoDto(
          p.id,
          p.parceiroId,
          this.calcularValorTotalItens(itensDoPedido),
          p.statusPedido,
          p.dataCriacao,
          this.calcularTotalItens(itensDoPedido),
          this.calcularTotalPagamento(pagamentosDoPedido),
        );
      },
    );
    return listaPedidos;
  }

  async obterPedidoCompletoPorId(
    pedidoId: number,
  ): Promise<PedidoCompletoDto | null> {
    const [pedido] = await this.db
      .select()
      .from(pedidos)
      .where(eq(pedidos.id, pedidoId));

    if (!pedido) {
      return null;
    }

    const itens = await this.db
      .select()
      .from(itensPedido)
      .where(eq(itensPedido.pedidoId, pedidoId));

    const [pagamento] = await this.db
      .select()
      .from(pagamentos)
      .where(eq(pagamentos.pedidoId, pedidoId));

    const itensDto = itens.map(
      (item) =>
        new ItemResumoDto(
          item.produtoId,
          item.nome,
          item.valorUnitario,
          item.quantidade,
          item.valorUnitario * item.quantidade,
        ),
    );

    return new PedidoCompletoDto(
      pedido.id,
      pedido.parceiroId,
      this.calcularValorTotalItens(itens),
      pedido.statusPedido,
      pedido.dataCriacao,
      pedido.dataAtualizacao,
      new EnderecoEntregaDto(
        Number(pedido.enderecoCep),
        pedido.enderecoLogradouro,
        pedido.enderecoNumero,
        pedido.enderecoComplemento ?? "",
        pedido.enderecoBairro,
        pedido.enderecoCidade,
        pedido.enderecoUf,
        pedido.enderecoPais,
      ),
      itensDto,
      pagamento
        ? new PagamentoDto(
            pagamento.id,
            String(pagamento.metodoPagamento),
            pagamento.statusPagamento,
            pagamento.valor,
            pagamento.codigoTransacao ?? undefined,
            pagamento.dataPagamento ?? undefined,
          )
        : null,
    );
  }

  async listarResumoPorCliente(
    clienteId: number,
  ): Promise<readonly PedidoResumoDto[]> {
    const registros = await this.db
      .select()
      .from(pedidos)
      .where(eq(pedidos.parceiroId, clienteId));

    const itens = await this.db.select().from(itensPedido);
    const listaPagamentos = await this.db.select().from(pagamentos);

    return registros.map((p) => {
      const itensDoPedido = itens.filter((item) => item.pedidoId === p.id);
      const pagamentosDoPedido = listaPagamentos.filter(
        (pagamento) => pagamento.pedidoId === p.id,
      );

      return new PedidoResumoDto(
        p.id,
        p.parceiroId,
        this.calcularValorTotalItens(itensDoPedido),
        p.statusPedido,
        p.dataCriacao,
        this.calcularTotalItens(itensDoPedido),
        this.calcularTotalPagamento(pagamentosDoPedido),
      );
    });
  }

  private calcularValorTotalItens(
    itens: readonly (typeof itensPedido.$inferSelect)[],
  ): number {
    return itens.reduce(
      (total, item) => total + item.valorUnitario * item.quantidade,
      0,
    );
  }

  private calcularTotalItens(
    itens: readonly (typeof itensPedido.$inferSelect)[],
  ): number {
    return itens.reduce((total, item) => total + item.quantidade, 0);
  }

  private calcularTotalPagamento(
    pagamentosDoPedido: readonly (typeof pagamentos.$inferSelect)[],
  ): number {
    return pagamentosDoPedido.reduce(
      (total, pagamento) => total + pagamento.valor,
      0,
    );
  }
}
