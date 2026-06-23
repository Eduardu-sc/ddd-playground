import { Guard } from "../../common/validations/guard.js";

export class ItemPedido {
  private descontoAplicado: number = 0;
  constructor(
    public readonly produto: string,
    public quantidade: number,
    public valorUnitario: number,
  ) {
    Guard.contraValorNegativo(
      valorUnitario,
      "Valor unitario nao pode ser negativo!",
    );
    Guard.contraEmpty(produto, "o produto nao pode ser vazio");
    
  }
  calcularTotal(): number {
    return this.quantidade * this.valorUnitario - this.descontoAplicado;
  }

  removerQuantidade(unidade: number): void {
    Guard.contra(unidade <= 0, "deve-se remover pelo menos uma unidade!");
    Guard.contra(
      unidade > this.quantidade,
      "nao e possivel remover mais unidades do que existe no item",
    );
    const validaQuantidade = this.quantidade - unidade;
    Guard.contra(
      validaQuantidade === 0,
      "quantidade nao pode ser valor zero remove o item",
    );
    this.quantidade -= unidade;
  }

  aplicarDesconto(desconto: number): void {
    Guard.contra(desconto < 0, "Desconto nao pode ser negativo");
    Guard.contra(
      desconto > this.quantidade * this.valorUnitario,
      "Desconto nao pode exceder valor total do item",
    );
    this.descontoAplicado = desconto;
    this.calcularTotal();
  }
}
