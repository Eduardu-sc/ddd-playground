import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { MarcaPedidoComoEntregueCommand } from "./marca-PedidoComoEntregue.command.js";
import { MarcaPedidoComoEntregueResultDto } from "./marca-PedidoComEntregue.resultDto.js";

export class MarcaPedidoComoEntregueHandler {
  constructor(private readonly _repositoryPedido: IPedidoRepository) {}
  async executar(
    command: MarcaPedidoComoEntregueCommand,
  ): Promise<MarcaPedidoComoEntregueResultDto> {
    const pedido = await this._repositoryPedido.obterPorId(command.pedidoId);
    if (pedido == null) {
      throw new DomainException(" Pedido nao encontrado!");
    }
    pedido.marcarComoEntregue();

    await this._repositoryPedido.atualizar(pedido);

    return new MarcaPedidoComoEntregueResultDto(
      pedido.id,
      pedido.getStatusPedido().toString(),
    );
  }
}
