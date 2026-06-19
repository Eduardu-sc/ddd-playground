import type { EnderecoEntraga } from "./endereco-entrega.js";
import type { ItemPedido } from "./item-pedido.js";

export class Pedido {
  constructor(
    public readonly id: number,
    public readonly parceiroId: number,
    private readonly enderecoEntrega: EnderecoEntraga,
    private itens: ItemPedido[],
  ) {}
  adicionarItem(item: ItemPedido): void {
    this.itens.push(item);
  }
  total(): number {
    return this.itens.reduce((soma, item) => soma + item.calcularTotal(), 0);
  }
}
