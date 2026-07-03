import { EnderecoEntrega } from "./value-object/endereco-entrega.js";
import { ItemPedido } from "./entities/item-pedido.js";
import { AggregateRoot } from "../common/base/aggregate-Root.js";
import { Guard } from "../common/validations/guard.js";
import { StatusPedido } from "./enums/statusPedido.js";
import type { MetodoPagamento } from "./enums/metodo-pagamento.js";
import { Pagamento } from "./entities/pagamento.js";

export class Pedido extends AggregateRoot {
  private pagamento: Pagamento | null = null;
  private constructor(
    public readonly id: number,
    public readonly numeroPedido: string,
    public readonly parceiroId: number,
    private enderecoEntrega: EnderecoEntrega,
    private readonly statusPedido: StatusPedido,
    private readonly itens: ItemPedido[],
  ) {
    Guard.contraEmptyNumber(id, "Id é obrigatório");
    Guard.contraEmptyNumber(parceiroId, "Parceiro é obrigatório");
    Guard.contra(!enderecoEntrega, "Endereço de entrega é obrigatório");

    super(id);
  }

  static criar(parceiroId: number, enderecoEntrega: EnderecoEntrega): Pedido {
    const id = Math.floor(Math.random() * 100000);
    const numeroPedido = `PED-${id}`;
    return new Pedido(
      id,
      numeroPedido,
      parceiroId,
      enderecoEntrega,
      StatusPedido.PENDENTE,
      [],
    );
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

    return pagamento;
  }
  getEnderecoEntrega(): EnderecoEntrega {
    return this.enderecoEntrega;
  }
  atualizarEnderecoEntrega(novoEndereco: EnderecoEntrega) {
    Guard.contra(
      this.statusPedido !== StatusPedido.PENDENTE,
      "O endereço só pode ser alterado enquanto o pedido estiver pendente.",
    );
    this.enderecoEntrega = novoEndereco;
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
  }

  getStatusPedido(): StatusPedido {
    return this.statusPedido;
  }

  getItens(): readonly ItemPedido[] {
    return this.itens;
  }

  quantidadeItens(): number {
    return this.itens.length;
  }

  total(): number {
    return this.itens.reduce((total, item) => total + item.calcularTotal(), 0);
  }
}
