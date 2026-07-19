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
    public readonly pedidoId: number,
    private metodoPagamento: MetodoPagamento,
    private valor: number,
  ) {
    super(id);

    Guard.contraEmptyNumber(pedidoId, "Pedido deve ser informado.");
    Guard.contra(valor <= 0, "Valor do pagamento deve ser maior que zero.");

    Guard.contra(
      !Object.values(MetodoPagamento).includes(metodoPagamento),
      "Método de pagamento inválido.",
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

  getMetodoPagamento(): MetodoPagamento {
    return this.metodoPagamento;
  }

  getValor(): number {
    return this.valor;
  }

  getStatusPagamento(): StatusPagamento {
    return this.statusPagamento;
  }

  getDataPagamento(): Date | null {
    return this.dataPagamento;
  }

  getCodigoTransacao(): string {
    return this.codigoTransacao;
  }

  confirmar(): void {
    Guard.contra(
      this.statusPagamento !== StatusPagamento.PENDENTE,
      "Pagamento já processado.",
    );

    this.statusPagamento = StatusPagamento.APROVADO;
    this.gerarCodigoTransacao();
    this.dataPagamento = new Date();

    this.addDomainEvent(
      new PagamentoAprovadoEvent(
        this.id.toString(),
        this.pedidoId.toString(),
        this.valor,
        this.dataPagamento,
        this.codigoTransacao,
      ),
    );
  }

  rejeitado(): void {
    Guard.contra(
      this.statusPagamento !== StatusPagamento.PENDENTE,
      "Pagamento já processado.",
    );

    this.statusPagamento = StatusPagamento.REJEITADO;
    this.gerarCodigoTransacao();
    this.dataPagamento = new Date();

    this.addDomainEvent(
      new PagamentoRejeitadaEvent(
        this.id.toString(),
        this.pedidoId.toString(),
        this.valor,
        this.dataPagamento,
        this.codigoTransacao,
      ),
    );
  }

  private gerarCodigoTransacao(): void {
    this.codigoTransacao = Math.random()
      .toString(36)
      .substring(2, 12)
      .toUpperCase();
  }
}
