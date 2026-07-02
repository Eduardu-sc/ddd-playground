import { EnderecoEntrega } from "./value-object/endereco-entrega.js";
import { ItemPedido } from "./entities/item-pedido.js";
import { AggregateRoot } from "../common/base/aggregate-Root.js";
import { Guard } from "../common/validations/guard.js";
import { StatusPedido } from "./enums/statusPedido.js";

export class Pedido extends AggregateRoot {
  private constructor(
    public readonly id: number,
    public readonly numeroPedido: string,
    public readonly parceiroId: number,
    private readonly enderecoEntrega: EnderecoEntrega,
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
  getStatusPedido(): StatusPedido {
    return this.statusPedido;
  }
  removerItem(itemId: number): void {
    const indice = this.itens.findIndex((item) => item.id === itemId);

    Guard.contra(indice === -1, "Item não encontrado");

    this.itens.splice(indice, 1);
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
