import { Pedido } from "../../../../domain/pedido/pedido.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { CriarPedidoCommand } from "./criar-pedido.command.js";
import { CriarPedidoResultDto } from "./criar-pedido.resultDTO.js";

export class CriarPedidoCommandHandler {
  constructor(private readonly pedidoRepository: IPedidoRepository) {}
  async handle(command: CriarPedidoCommand): Promise<CriarPedidoResultDto> {
    const pedido = Pedido.criar(command.clienteId, command.enderecoEntrega);

    await this.pedidoRepository.adicionar(pedido);

    return new CriarPedidoResultDto(
      pedido.id,
      pedido.numeroPedido,
      pedido.dataCriacao,
      pedido.total(),
      pedido.getStatusPedido(),
    );
  }
}
