import { describe, it, expect } from "vitest";
import { Pedido } from "./pedido.js";
import { EnderecoEntraga } from "./endereco-entrega.js";
import { ItemPedido } from "./item-pedido.js";

describe("Pedido", () => {
  it("Dedeve criar um pedido valido", () => {
    const enderecoEntrega = EnderecoEntraga.criar(
      "12345678",
      "rua mg18 qd 31 lote 15",
      "madre germana 1",
      "",
      "GO",
      "aparecida de goiania",
      "Brasil",
    );

    const pedido = new Pedido(1, 1, enderecoEntrega, []);
    expect(pedido).toBeDefined();
  });

  it("Deve calcular corretamente o total.", () => {
    const enderecoEntrega = EnderecoEntraga.criar(
      "12345678",
      "rua mg18 qd 31 lote 15",
      "madre germana 1",
      "",
      "GO",
      "aparecida de goiania",
      "Brasil",
    );

    const pedido = new Pedido(1, 1, enderecoEntrega, []);
    pedido.adicionarItem(new ItemPedido("paracetamol", 10, 1));
    pedido.adicionarItem(new ItemPedido("paracetamol", 5, 5));

    expect(pedido.total()).toBe(35);
  });
});
