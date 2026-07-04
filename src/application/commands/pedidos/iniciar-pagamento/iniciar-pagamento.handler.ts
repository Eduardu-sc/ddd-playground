import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { IniciarPagamentoCommand } from "./iniciar-pagamento.command.js";
import { IniciarPagamentoResultDto } from "./iniciar-pagamento.resultDto.js";

export class IniciarPagamentoHandler {
  constructor(private readonly _repositoryPedido: IPedidoRepository) {}

  async handler(
    command: IniciarPagamentoCommand,
  ): Promise<IniciarPagamentoResultDto> {
    const pedido = await this._repositoryPedido.obterPorId(command.pedidoId);

    if (pedido == null) {
      throw new Error("pedido nao localizado!");
    }
    const pagamento = pedido.iniciarPagamento(command.metadoPagamento);
    await this._repositoryPedido.atualizar(pedido);

    return new IniciarPagamentoResultDto(
      pedido.id,
      pagamento.id,
      pedido.getStatusPedido().toString(),
      pagamento.getStatusDoPagamento(),
    );
  }
}
