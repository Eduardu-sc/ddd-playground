import { Entity } from "../../common/base/entity.js";
import { Guard } from "../../common/validations/guard.js";

export class ItemPedido extends Entity {
  private descontoAplicado = 0;

  constructor(
    public readonly id: number,
    public readonly nome: string,
    public quantidade: number,
    public valorUnitario: number,
  ) {
    super(id);
    Guard.contraEmpty(nome, "Produto é obrigatório");
    Guard.contra(quantidade <= 0, "Quantidade deve ser maior que zero");
    Guard.contraValorNegativo(
      valorUnitario,
      "Valor unitário não pode ser negativo",
    );
  }

  getQuantidade(): number {
    return this.quantidade;
  }

  getValorUnitario(): number {
    return this.valorUnitario;
  }

  getDescontoAplicado(): number {
    return this.descontoAplicado;
  }

  adicionarQuantidade(unidade: number): void {
    Guard.contra(unidade <= 0, "Deve adicionar pelo menos uma unidade");

    this.quantidade += unidade;
  }

  removerQuantidade(unidade: number): void {
    Guard.contra(unidade <= 0, "Deve remover pelo menos uma unidade");

    Guard.contra(
      unidade > this.quantidade,
      "Não é possível remover mais unidades do que existem no item",
    );

    const novaQuantidade = this.quantidade - unidade;

    Guard.contra(
      novaQuantidade === 0,
      "Quantidade não pode ficar zerada. Remova o item do pedido.",
    );

    this.quantidade = novaQuantidade;
  }

  aplicarDesconto(desconto: number): void {
    Guard.contra(desconto < 0, "Desconto não pode ser negativo");

    Guard.contra(
      desconto > this.subtotal(),
      "Desconto não pode ser maior que o subtotal do item",
    );

    this.descontoAplicado = desconto;
  }

  subtotal(): number {
    return this.quantidade * this.valorUnitario;
  }

  calcularTotal(): number {
    return this.subtotal() - this.descontoAplicado;
  }
}
