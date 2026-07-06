import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import { Pedido } from "../../../../domain/pedido/entities/pedido.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import { CriarPedidoCommand } from "./criar-pedido.command.js";
import { CriarPedidoResultDto } from "./criar-pedido.resultDTO.js";

export class CriarPedidoCommandHandler {
  constructor(private readonly _pedidoRepository: IPedidoRepository) {}
  async handle(command: CriarPedidoCommand): Promise<CriarPedidoResultDto> {
    const pedido = Pedido.criar(command.clienteId, command.enderecoEntrega);

    if (pedido == null) throw new DomainException("Pedido nao encontrado!");

    await this._pedidoRepository.adicionar(pedido);

    return new CriarPedidoResultDto(
      pedido.id,
      pedido.numeroPedido,
      pedido.dataCriacao,
      pedido.total(),
      pedido.getStatusPedido(),
    );
  }
}
