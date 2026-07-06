import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import { AtualizarEnderecoEntregaDoPedidoResultDto } from "./atualizar-EnderecoDeEntragaDoPedido.resultDto.js";
import type { AtualizarEnderecoEntregaDoPedidoCommand } from "./atualizar-EnderecoDeEntregaDoPedido.command.js";

export class AtualizaEnderecoEntregaDoPedidoHandler {
  constructor(private readonly _pedidoRepository: IPedidoRepository) {}
  async handle(
    command: AtualizarEnderecoEntregaDoPedidoCommand,
  ): Promise<AtualizarEnderecoEntregaDoPedidoResultDto> {
    const pedido = await this._pedidoRepository.obterPorId(command.pedidoId);

    if (pedido == null) {
      throw new DomainException("Pedido nao encontrado!");
    }
    pedido.atualizarEnderecoEntrega(command.enderecoEntrega);

    await this._pedidoRepository.atualizar(pedido);

    return new AtualizarEnderecoEntregaDoPedidoResultDto(
      pedido.id,
      pedido.getEnderecoEntrega.toString(),
      pedido.getStatusPedido.toString(),
    );
  }
}
