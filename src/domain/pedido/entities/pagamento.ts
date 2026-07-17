import { MetodoPagamento } from "../enums/metodo-pagamento.js";
import { StatusPagamento } from "../enums/pagamento.enum.js";
import { Guard } from "../../common/validations/guard.js";

import { PagamentoRejeitadaEvent } from "../events/pagamento-rejeitado.event.js";
import { PagamentoAprovadoEvent } from "../events/pagamento-aprovado.event.js";
import { Entity } from "../../common/base/entity.js";

export class Pagamento extends Entity {
  private dataPagamento: Date | null;
  private codigoTransacao: string;
  private statusPagamento: StatusPagamento;
  constructor(
    id: number,
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

  static restaurar(
    id: number,
    pedidoId: number,
    metodoPagamento: MetodoPagamento,
    valor: number,
    statusPagamento: StatusPagamento,
    dataPagamento: Date | null,
    codigoTransacao: string,
  ): Pagamento {
    const pagamento = new Pagamento(id, pedidoId, metodoPagamento, valor);

    pagamento.statusPagamento = statusPagamento;
    pagamento.dataPagamento = dataPagamento;
    pagamento.codigoTransacao = codigoTransacao;

    return pagamento;
  }
  getStatusDoPagamento(): StatusPagamento {
    return this.statusPagamento;
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
        this.id.toString(),
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
        this.id.toString(),
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
