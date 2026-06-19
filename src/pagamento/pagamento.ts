import { PagamentoAprovadoEvent } from "../shared/domain/events/pagamento-Aprovado-Events.js";
import { PagamentoRejeitadaEvent } from "../shared/domain/events/pagamento-Rejeitado-Events.js";
import { Entity } from "./entity.js";
import { StatusPagamento } from "./status-pagamento.js";

export class Pagamento extends Entity {
  constructor(
    public readonly id: number,
    public readonly pedidoId: number,
    private statusPagamento: StatusPagamento,
    private valor: number,
    private dataPagamento?: Date,
    private codigoTransacao?: string,
  ) {
    super();
  }
  confirmar(): void {
    this.statusPagamento = StatusPagamento.APROVADO;

    this.addDomainEvent(
      new PagamentoAprovadoEvent(
        this.id.toString(),
        this.pedidoId.toString(),
        this.valor,
        new Date(),
        this.codigoTransacao,
      ),
    );
  }
  rejeitado(): void {
    this.statusPagamento = StatusPagamento.REJEITADO;
    this.addDomainEvent(
      new PagamentoRejeitadaEvent(
        this.id.toString(),
        this.pedidoId.toString(),
        this.valor,
        new Date(),
        this.codigoTransacao,
      ),
    );
  }
}
