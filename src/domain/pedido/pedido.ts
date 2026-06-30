import type { EnderecoEntrega } from "./value-object/endereco-entrega.js";
import type { ItemPedido } from "./entities/item-pedido.js";
import { Entity } from "../common/base/entity.js";
import { AggregateRoot } from "../common/base/aggregate-Root.js";
import { Guard } from "../common/validations/guard.js";

export class Pedido extends AggregateRoot {
  private constructor(
    public readonly id: number,
    public readonly parceiroId: number,
    private readonly enderecoEntrega: EnderecoEntrega,
    private itens: ItemPedido[],
  ) {
    Guard.contraEmptyNumber(id, "id e obrigadorio");
    super(id);
  }
  static criar(clienteId: number, endereco: EnderecoEntrega): Pedido {
    const idNovo = Math.random();
    return new Pedido(idNovo, clienteId, endereco, []);
  }

  adicionarItem(item: ItemPedido): void {
    this.itens.push(item);
  }
  total(): number {
    return this.itens.reduce((soma, item) => soma + item.calcularTotal(), 0);
  }
}
