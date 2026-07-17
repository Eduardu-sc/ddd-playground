import { describe, it, expect } from "vitest";
import { Pedido } from "../entities/pedido.js";
import { EnderecoEntraga } from "../value-object/endereco-entrega.js";

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
    pedido.adicionarItem(1, "paracetamol", 1, 10);
    pedido.adicionarItem(2, "paracetamol", 5, 5);

    expect(pedido.total()).toBe(35);
  });
});
