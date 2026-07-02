import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import { AtualizarEnderecoEntregaDoPedidoResultDto } from "./atualizarEnderecoDeEntragaDoPedido.resultDto.js";
import type { AtualizarEnderecoEntregaDoPedidoCommand } from "./atualizarEnderecoDeEntregaDoPedido.command.js";

export class AtualizaEnderecoEntregaDoPedidoHandler {
  constructor(private pedidoRepository: IPedidoRepository) {}
  async handle(
    command: AtualizarEnderecoEntregaDoPedidoCommand,
  ): Promise<AtualizarEnderecoEntregaDoPedidoResultDto> {
    const pedido = await this.pedidoRepository.obterPorId(command.pedidoId);

    if (pedido == null) {
      throw new Error("Pedido nao encontrado!");
    }
    pedido.atualizarEnderecoEntrega(command.enderecoEntrega);

    await this.pedidoRepository.atualizar(pedido);

    return new AtualizarEnderecoEntregaDoPedidoResultDto(
      pedido.id,
      pedido.getEnderecoEntrega.toString(),
      pedido.getStatusPedido.toString(),
    );
  }
}
