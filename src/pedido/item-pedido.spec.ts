import { describe, it, expect } from "vitest";
import { ItemPedido } from "./item-pedido.js";

describe("item-Pedido", () => {
  it("Deve retorna um erro caso valor do item seja negativo.", () => {
    expect(() => {
      new ItemPedido("paracetamol", 1, -10);
    }).toThrow("Valor unitario nao pode ser negativo!");
  });
  it("Deve remover pelo menos um item.", () => {
    const item = new ItemPedido("paracetamol", 1, 10);
    expect(() => {
      item.removerQuantidade(0);
    }).toThrow("deve-se remover pelo menos uma unidade!");
  });
  it("Nao Deve-se remover unidade a mais da quantidade do item.", () => {
    const item = new ItemPedido("paracetamol", 5, 10);
    expect(() => {
      item.removerQuantidade(6);
    }).toThrow("nao e possivel remover mais unidades do que existe no item");
  });
  it("Não pode zerar a quantidade", () => {
    const item = new ItemPedido("paracetamol", 5, 10);
    expect(() => {
      item.removerQuantidade(5);
    }).toThrow("quantidade nao pode ser valor zero remove o item");
  });
});
