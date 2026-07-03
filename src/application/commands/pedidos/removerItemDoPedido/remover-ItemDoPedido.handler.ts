import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { RemoverItemDoPedidoCommand } from "./remover-ItemDoPedido.command.js";
import { RemoverItemDoPedidoResultDto } from "./remover-itemDoPedido.resultDto.js";

export class RemoverItemDoPedidoHandler {
  constructor(private readonly pedidoRepository: IPedidoRepository) {}

  async handle(
    command: RemoverItemDoPedidoCommand,
  ): Promise<RemoverItemDoPedidoResultDto> {
    const pedido = await this.pedidoRepository.obterPorId(command.pedidoId);

    if (pedido == null) {
      throw new Error("Perdido nao encontrado!");
    }
    pedido.removerItem(command.itemId);
    this.pedidoRepository.atualizar(pedido);

    return new RemoverItemDoPedidoResultDto(
      pedido.id,
      pedido.total(),
      pedido.getStatusPedido.toString(),
    );
  }
}
