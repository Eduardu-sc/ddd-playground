import { Entity } from "../../../shared/domain/entity.js";
import { MetodoPagamento } from "../enums/metodo-pagamento.js";
import { StatusPagamento } from "../enums/pagamento.enum.js";
import { Guard } from "../../common/validations/guard.js";

import { PagamentoRejeitadaEvent } from "../events/pagamento-rejeitado.event.js";
import { PagamentoAprovadoEvent } from "../events/pagamento-aprovado.event.js";

export class Pagamento extends Entity {
  private dataPagamento: Date | null;
  private codigoTransacao: string;
  private statusPagamento: StatusPagamento;
  constructor(
    id: number,
    private idPagamento: number,
    public pedidoId: number,
    private statusMetadoPagamento: MetodoPagamento,
    private valor: number,
  ) {
    super(id);

    Guard.contraEmptyNumber(pedidoId, "pedido nao pode ser um valor vasio");
    Guard.contra(valor <= 0, "pedido nao pode ser Negativo ou zero");
    Guard.contra(
      !Object.values(MetodoPagamento).includes(
        statusMetadoPagamento as MetodoPagamento,
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
