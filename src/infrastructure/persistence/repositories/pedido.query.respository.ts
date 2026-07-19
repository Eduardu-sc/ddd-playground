import { eq, sum } from "drizzle-orm";
import type { PagamentoPorStatusDto } from "../../../application/queries/pedidos/dto/pagamentoPorStatusDto.js";
import type { PedidoCompletoDto } from "../../../application/queries/pedidos/dto/pedidoCompletoDto.js";
import { PedidoResumoDto } from "../../../application/queries/pedidos/dto/pedidoResumoDto.js";
import { AppDatabase } from "../config/database.js";
import { pedidos } from "../schema/pedido.table.js";
import type { IPedidoQueryRepository } from "./../../../application/abstrations/persistence/iPedidoQueryRepository.js";

export class PedidoQueryRepository implements IPedidoQueryRepository {
  private readonly db = AppDatabase.db;
  listarPagamentoPorStatus(): Promise<readonly PagamentoPorStatusDto[]> {}

  async listarResumo(): Promise<readonly PedidoResumoDto[]> {
    const registros = await this.db.select().from(pedidos);

    const listaPedidos = registros.map(
      (p) =>
        new PedidoResumoDto(
          p.id,
          p.parceiroId,
          0,
          p.statusPedido,
          p.dataCriacao,
          0,
          0,
        ),
    );
    return listaPedidos;
  }
  obterPedidoCompletoPorId(
    pedidoId: number,
  ): Promise<PedidoCompletoDto | null> {}
  listarResumoPorCliente(
    clienteId: number,
  ): Promise<readonly PedidoResumoDto[]> {}
}
