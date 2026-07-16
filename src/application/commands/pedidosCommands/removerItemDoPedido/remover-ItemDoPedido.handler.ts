import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { RemoverItemDoPedidoCommand } from "./remover-ItemDoPedido.command.js";
import { RemoverItemDoPedidoResultDto } from "./remover-itemDoPedido.resultDto.js";

export class RemoverItemDoPedidoHandler {
  constructor(private readonly _pedidoRepository: IPedidoRepository) {}

  async executar(
    command: RemoverItemDoPedidoCommand,
  ): Promise<RemoverItemDoPedidoResultDto> {
    const pedido = await this._pedidoRepository.obterPorId(command.pedidoId);

    if (pedido == null) {
      throw new DomainException("Perdido nao encontrado!");
    }
    pedido.removerItem(command.itemId);
    await this._pedidoRepository.atualizar(pedido);

    return new RemoverItemDoPedidoResultDto(
      pedido.id,
      pedido.total(),
      pedido.getStatusPedido().toString(),
    );
  }
}
