import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import { MotivoCancelamento } from "../../../../domain/pedido/value-object/motivo-cancelamento.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { CancelarPedidoCommand } from "./cancelar-Pedido.command.js";
import { CancelarPedidoResultDto } from "./concelar-pedido.resultDto.js";

export class CancelarPedidoHandler {
  constructor(private readonly _repositoryPedido: IPedidoRepository) {}

  async executar(
    command: CancelarPedidoCommand,
  ): Promise<CancelarPedidoResultDto> {
    const pedido = await this._repositoryPedido.obterPorId(command.pedidoId);

    if (pedido == null) {
      throw new DomainException("Pedido nao encontrado");
    }
    const motivo = MotivoCancelamento.porCodigo(command.codigoMotivo);
    pedido.cancelar(motivo);

    await this._repositoryPedido.atualizar(pedido);
    return new CancelarPedidoResultDto(
      pedido.id,
      pedido.getStatusPedido().toString(),
    );
  }
}
