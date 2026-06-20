import { Guard } from "../parceiro/guard.js";
import { PagamentoAprovadoEvent } from "../shared/domain/events/pagamento-Aprovado-Events.js";
import { PagamentoRejeitadaEvent } from "../shared/domain/events/pagamento-Rejeitado-Events.js";
import { Entity } from "./entity.js";
import { MetadoPagamento } from "./status-metado-pagamento.js";
import { StatusPagamento } from "./status-pagamento.js";

export class Pagamento extends Entity {
  private constructor(
    public id: number,
    public pedidoId: number,
    private statusPagamento: StatusPagamento,
    private statusMetadoPagamento: MetadoPagamento,
    private valor: number,
    private dataPagamento?: Date | null,
    private codigoTransacao?: string,
  ) {
    super();
  }

  static criar(
    pedidoId: number,
    metadorPagamento: MetadoPagamento,
    valor: number,
  ): Pagamento {
    Guard.contraEmptyNumber(pedidoId, "pedido nao pode ser um valor vasio");
    Guard.contra(valor <= 0, "pedido nao pode ser Negativo ou zero");
    Guard.contra(
      !Object.values(MetadoPagamento).includes(
        metadorPagamento as MetadoPagamento,
      ),
      "Metado de pagamento deve ser valido",
    );
    return new Pagamento(
      1,
      pedidoId,
      StatusPagamento.PENDENTE,
      metadorPagamento,
      valor,
      null,
      "",
    );
  }
 static confirmar(): void {
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
