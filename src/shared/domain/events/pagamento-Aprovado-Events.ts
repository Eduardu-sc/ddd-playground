import { DomainEventBase } from "./domain-eventBase.js";

export class PagamentoAprovadoEvent extends DomainEventBase {
  constructor(
    public readonly pagamentoId: string,
    public readonly pedidoId: string,
    public readonly valor: number,
    public readonly dataPagamento: Date,
    public readonly codigoTransacao?: string,
  ) {
    super();
  }
}
