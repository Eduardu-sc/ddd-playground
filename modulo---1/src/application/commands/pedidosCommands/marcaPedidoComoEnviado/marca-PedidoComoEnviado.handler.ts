import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { MarcaPedidoComoEnviadoCommand } from "./marca-PedidoComoEnviado.command.js";
import { MarcaPedidoComoEnviadoResultDto } from "./marca-PedidoComoEnviado.resultDto.js";

export class MarcaPedidoComoEnviado {
  constructor(private readonly _repositoryPedido: IPedidoRepository) {}
  async executar(
    command: MarcaPedidoComoEnviadoCommand,
  ): Promise<MarcaPedidoComoEnviadoResultDto> {
    const pedido = await this._repositoryPedido.obterPorId(command.pedidoId);

    if (pedido == null) throw new DomainException("Pedido nao encontrado!");

    pedido.marcarComoEnviado();

    await this._repositoryPedido.atualizar(pedido);
    return new MarcaPedidoComoEnviadoResultDto(
      pedido.id,
      pedido.getStatusPedido().toString(),
    );
  }
}
