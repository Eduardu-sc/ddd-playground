import { error } from "node:console";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { AdicionarItemAoPedidoCommand } from "./adicionar-itemAoPedido.command.js";
import { AdicionarItemAoPedidoResultDto } from "./adicionar-itemAoPedido.resultDto.js";

export class AdicionarItemAoPedidoHandles {
  constructor(private readonly repositoryPedido: IPedidoRepository) {}

  async handle(
    command: AdicionarItemAoPedidoCommand,
  ): Promise<AdicionarItemAoPedidoResultDto> {
    const pedido = await this.repositoryPedido.obterPorId(command.pedidoId);
    if (pedido == null) {
      throw new Error("Pedido nao Encontrado");
    }
    pedido?.adicionarItem(
      command.pedidoId,
      command.nomeProduto,
      command.precoUnitario,
      command.quantidade,
    );

    await this.repositoryPedido.atualizar(pedido);

    return new AdicionarItemAoPedidoResultDto(
      pedido.id,
      pedido.total(),
      pedido.getStatusPedido.toString(),
    );
  }
}
