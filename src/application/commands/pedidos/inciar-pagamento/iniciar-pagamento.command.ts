import type { MetodoPagamento } from "../../../../domain/pedido/enums/metodo-pagamento.js";

export class IniciarPagamentoCommand {
  constructor(
    public readonly pedidoId: number,
    public readonly metadoPagamento: MetodoPagamento,
  ) {}
}
