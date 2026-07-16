import { EnderecoEntrega } from "../value-object/endereco-entrega.js";
import { ItemPedido } from "./item-pedido.js";
import { AggregateRoot } from "../../common/base/aggregate-Root.js";
import { Guard } from "../../common/validations/guard.js";
import { StatusPedido } from "../enums/statusPedido.js";
import type { MetodoPagamento } from "../enums/metodo-pagamento.js";
import { Pagamento } from "./pagamento.js";
import type { MotivoCancelamento } from "../value-object/motivo-cancelamento.js";
import { StatusPagamento } from "../enums/pagamento.enum.js";
import { PedidoEntregueEvent } from "../events/pedido-entregue.event.js";
import { PedidoEnviadoEvent } from "../events/pedido-enviado.event.js";
import { PedidoCanceladoEvent } from "../events/pedido-cancelado.event.js";
import { PedidoCriadoEvent } from "../events/pedido-criado.event.js";
import { PedidoSeparadoEvent } from "../events/pedido-separado.event.js";

type ReconstituirPedidoProps = {
  id: number;
  numeroPedido: string;
  parceiroId: number;
  enderecoEntrega: EnderecoEntrega;
  statusPedido: StatusPedido;
  itens: ItemPedido[];
  dataCriacao: Date;
  dataAtualizacao: Date;
};

export class Pedido extends AggregateRoot {
  private motivoCancelamento: MotivoCancelamento | null = null;
  private pagamento: Pagamento | null = null;

  private constructor(
    id: number,
    public readonly numeroPedido: string,
    public readonly parceiroId: number,
    private enderecoEntrega: EnderecoEntrega,
    private statusPedido: StatusPedido,

    private readonly itens: ItemPedido[],
  ) {
    Guard.contraEmptyNumber(parceiroId, "Parceiro é obrigatório");
    Guard.contra(!enderecoEntrega, "Endereço de entrega é obrigatório");
    // tem que coloca o id aqui mais ele ainda esta null
    super(id);
  }

  static criar(parceiroId: number, enderecoEntrega: EnderecoEntrega): Pedido {
    // const id = Math.floor(Math.random() * 100000);
    // const numeroPedido = `PED-${id}`;
    const pedido = new Pedido(
      0,
      "",
      parceiroId,
      enderecoEntrega,

      StatusPedido.PENDENTE,
      [],
    );
    pedido.addDomainEvent(new PedidoCriadoEvent(pedido.id, pedido.parceiroId));
    return pedido;
  }
  static reconstituir(props: ReconstituirPedidoProps): Pedido {
    throw new Error("Not implemented");
  }

  marcarComoEntregue(): void {
    Guard.contra(
      this.statusPedido !== StatusPedido.ENVIADO,
      "Pedido so pode ser marcado como 'Entregue' quando ele for 'Enviado",
    );

    this.statusPedido = StatusPedido.ENTREGUE;
    this.marcaComoAlterado();
    this.addDomainEvent(new PedidoEntregueEvent(this.id, this.parceiroId));
  }

  marcarComoEnviado(): void {
    Guard.contra(this.pagamento == null, "pedido nao posui pagamento");
    Guard.contra(
      this.statusPedido !== StatusPedido.PENDENTE,
      "Somente pedidos pendentes podem ser enviado.",
    );
    Guard.contra(
      this.pagamento?.getStatusDoPagamento() !== StatusPagamento.APROVADO,
      "O pagamento deve estar aprovado para enviar o pedido.",
    );
    this.statusPedido = StatusPedido.ENVIADO;
    this.marcaComoAlterado();
    this.addDomainEvent(new PedidoEnviadoEvent(this.id, this.parceiroId));
  }
  marcarComoEmSeparado(): void {
    Guard.contra(this.pagamento == null, "pedido nao possui pagamento");
    Guard.contra(
      this.statusPedido !== StatusPedido.PENDENTE,
      "Somente pedidos pendentes podem ser separado.",
    );
    this.statusPedido = StatusPedido.EMSEPACAO;
    this.marcaComoAlterado();
    this.addDomainEvent(new PedidoSeparadoEvent(this.id, this.parceiroId));
  }

  cancelar(motivo: MotivoCancelamento): void {
    Guard.contra(
      this.statusPedido !== StatusPedido.PENDENTE,
      "Somente pedidos pendentes podem ser cancelados.",
    );

    this.statusPedido = StatusPedido.CANCELADO;
    this.motivoCancelamento = motivo;
    this.marcaComoAlterado();
    this.addDomainEvent(new PedidoCanceladoEvent(this.id, this.parceiroId));
  }
  iniciarPagamento(metodoPagamento: MetodoPagamento): Pagamento {
    Guard.contra(this.pagamento !== null, "O pedido já possui um pagamento.");

    Guard.contra(
      this.itens.length === 0,
      "O pedido deve possuir pelo menos um item.",
    );

    Guard.contra(
      this.statusPedido !== StatusPedido.PENDENTE,
      "Somente pedidos pendentes podem iniciar pagamento.",
    );

    const pagamento = new Pagamento(1, this.id, metodoPagamento, this.total());

    this.pagamento = pagamento;
    this.marcaComoAlterado();
    return pagamento;
  }
  get getEnderecoEntrega(): EnderecoEntrega {
    return this.enderecoEntrega;
  }
  atualizarEnderecoEntrega(novoEndereco: EnderecoEntrega) {
    Guard.contra(
      this.statusPedido !== StatusPedido.PENDENTE,
      "O endereço só pode ser alterado enquanto o pedido estiver pendente.",
    );
    this.enderecoEntrega = novoEndereco;
    this.marcaComoAlterado();
  }
  adicionarItem(
    produtoId: number,
    nomeProduto: string,
    valorUnitario: number,
    quantidade: number,
  ): void {
    Guard.contraEmptyNumber(produtoId, "Produto é obrigatório");
    Guard.contraEmpty(nomeProduto, "Nome do produto é obrigatório");
    Guard.contra(valorUnitario <= 0, "Valor unitário deve ser maior que zero");
    Guard.contra(quantidade <= 0, "Quantidade deve ser maior que zero");

    const item = new ItemPedido(
      produtoId,
      nomeProduto,
      quantidade,
      valorUnitario,
    );

    this.itens.push(item);
    this.marcaComoAlterado();
  }
  removerItem(itemId: number): void {
    Guard.contraEmptyNumber(itemId, "itemId invalido");
    Guard.contra(
      this.statusPedido !== StatusPedido.PENDENTE,
      "itens so pode ser removido caso o pedido esteja pendente",
    );

    const indice = this.itens.findIndex((item) => item.id === itemId);

    Guard.contra(indice === -1, "Item não encontrado");
    Guard.contra(
      this.itens.length === 1,
      "O pedido deve conter pelo menos um item.",
    );
    this.itens.splice(indice, 1);
    this.marcaComoAlterado();
  }

  getStatusPedido(): StatusPedido {
    return this.statusPedido;
  }

  getItens(): ItemPedido[] {
    return this.itens;
  }

  quantidadeItens(): number {
    return this.itens.length;
  }

  total(): number {
    return this.itens.reduce((total, item) => total + item.calcularTotal(), 0);
  }
  getPagamento(): Pagamento | null {
    return this.pagamento;
  }
}
