import { ValueObject } from "../../../common/base/value-object.js";
import { Guard } from "../../../common/validations/guard.js";

export class ProdutoSnapshot extends ValueObject {
  constructor(
    public readonly produtoId: number,
    public readonly nomeProduto: string,
    public readonly precoUnitario: number,
  ) {
    super();
    Guard.contraEmptyNumber(produtoId, "Produto invalido");
    Guard.contraNullWhiteSpace(nomeProduto, "nome do produto e obrigatorio");
    Guard.contra(precoUnitario <= 0, "preco unitario invalido");
  }
  protected getEqualityComponents(): readonly unknown[] {
    return [this.produtoId, this.nomeProduto, this.precoUnitario];
  }
}
