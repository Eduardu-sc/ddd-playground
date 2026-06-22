import { Guard } from "../parceiro/guard.js";
import { PagamentoAprovadoEvent } from "../shared/domain/events/pagamento-Aprovado-Events.js";
import { PagamentoRejeitadaEvent } from "../shared/domain/events/pagamento-Rejeitado-Events.js";
import { Entity } from "./entity.js";
import { MetadoPagamento } from "./status-metado-pagamento.js";
import { StatusPagamento } from "./status-pagamento.js";

export class Pagamento extends Entity {
  private dataPagamento: Date | null;
  private codigoTransacao: string;
  private statusPagamento: StatusPagamento;
  constructor(
    private idPagamento: number,
    public pedidoId: number,
    private statusMetadoPagamento: MetadoPagamento,
    private valor: number,
  ) {
    super();

    Guard.contraEmptyNumber(pedidoId, "pedido nao pode ser um valor vasio");
    Guard.contra(valor <= 0, "pedido nao pode ser Negativo ou zero");
    Guard.contra(
      !Object.values(MetadoPagamento).includes(
        statusMetadoPagamento as MetadoPagamento,
      ),
      "Metado de pagamento deve ser valido",
    );

    this.statusPagamento = StatusPagamento.PENDENTE;
    this.dataPagamento = null;
    this.codigoTransacao = "";
  }

  confirmar(): void {
    Guard.contra(
      this.statusPagamento !== StatusPagamento.PENDENTE,
      "Pagamento ja processado",
    );
    this.statusPagamento = StatusPagamento.APROVADO;
    this.transacao();
    this.dataPagamento = new Date();
    this.addDomainEvent(
      new PagamentoAprovadoEvent(
        this.idPagamento.toString(),
        this.pedidoId.toString(),
        this.valor,
        new Date(),
        this.codigoTransacao,
      ),
    );
  }
  rejeitado(): void {
    Guard.contra(
      this.statusPagamento !== StatusPagamento.PENDENTE,
      "Pagamento ja processado",
    );
    this.statusPagamento = StatusPagamento.REJEITADO;
    this.transacao();
    this.dataPagamento = new Date();
    this.addDomainEvent(
      new PagamentoRejeitadaEvent(
        this.idPagamento.toString(),
        this.pedidoId.toString(),
        this.valor,
        new Date(),
        this.codigoTransacao,
      ),
    );
  }
  private transacao(): void {
    this.codigoTransacao = Math.random()
      .toString(36)
      .substring(2, 12)
      .toUpperCase();
  }
}
