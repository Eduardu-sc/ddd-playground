import { DomainException } from "../../../../../modulo---1/src/domain/common/exceptions/domain-exception.js";

import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import { MarcaPedidoComoSeparadoResultDto } from "./marcaPedidoComoEmSeparado.resultDto.js";
import type { MarcaPedidoEmSeparacaoCommand } from "./marcaPedidoComoEmSeparado.command.js";

export class MarcaPedidoEmSeparacaoHandler {
  constructor(private readonly _repositoryPedido: IPedidoRepository) {}
  async executar(
    command: MarcaPedidoEmSeparacaoCommand,
  ): Promise<MarcaPedidoComoSeparadoResultDto> {
    const pedido = await this._repositoryPedido.obterPorId(command.pedidoId);
    if (pedido == null) {
      throw new DomainException("pedido nao localizado");
    }

    pedido.marcarComoEmSeparado;
    await this._repositoryPedido.atualizar(pedido);

    return new MarcaPedidoComoSeparadoResultDto(
      pedido.id,
      pedido.getStatusPedido().toString(),
    );
  }
}
