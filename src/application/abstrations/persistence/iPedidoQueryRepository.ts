import type { PagamentoPorStatusDto } from "../../queries/pedidos/dto/pagamentoPorStatusDto.js";
import type { PedidoCompletoDto } from "../../queries/pedidos/dto/pedidoCompletoDto.js";
import type { PedidoResumoDto } from "../../queries/pedidos/dto/pedidoResumoDto.js";

export interface IPedidoQueryRepository {
  listarResumo(): Promise<readonly PedidoResumoDto[]>;
  listarResumoPorCliente(
    clienteId: number,
  ): Promise<readonly PedidoResumoDto[]>;
  listarPagamentoPorStatus(): Promise<readonly PagamentoPorStatusDto[]>;
  obterPedidoCompletoPorId(pedidoId: number): Promise<PedidoCompletoDto | null>;
}
