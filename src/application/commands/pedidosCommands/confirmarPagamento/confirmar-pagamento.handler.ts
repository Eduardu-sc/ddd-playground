import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { ConfirmarPagamentoCommand } from "./confirmar-pagamento.command.js";
import { ConfirmarPagamentoResultDto } from "./confirmar-pagamento.resultDto.js";

export class ConfirmarPagamentoHandler {
  constructor(private readonly _repositoryPedido: IPedidoRepository) {}

  async executar(
    command: ConfirmarPagamentoCommand,
  ): Promise<ConfirmarPagamentoResultDto> {
    const pedido = await this._repositoryPedido.obterPorId(command.pedidoId);

    if (pedido == null) {
      throw new DomainException("Pedido nao localizado");
    }

    const pagamento = pedido.getPagamento();

    if (pagamento == null) {
      throw new DomainException("Pagamento nao encontrado");
    }

    if (pagamento.id !== command.pagamentoId) {
      throw new DomainException("Pagamento nao pertence ao pedido");
    }

    pagamento.confirmar();
    await this._repositoryPedido.atualizar(pedido);

    return new ConfirmarPagamentoResultDto(
      pedido.id,
      pagamento.id,
      pedido.getStatusPedido().toString(),
      pagamento.getStatusDoPagamento(),
    );
  }
}
