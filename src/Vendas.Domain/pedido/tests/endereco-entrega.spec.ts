import { describe, it, expect } from "vitest";
import { EnderecoEntrega } from "../value-object/endereco-entrega.js";

describe("enderecoEntrega", () => {
  it("Deve criar um endereco valido", () => {
    const endereco = EnderecoEntrega.criar(
      "123456",
      "Rua A",
      "Centro",
      "",
      "GO",
      "Goiânia",
      "Brasil",
    );

    expect(endereco).toBeDefined();
  });

  it("Deve lançar erro quando cep for vazio", () => {
    expect(() => {
      EnderecoEntrega.criar(
        "",
        "Rua A",
        "Centro",
        "",
        "GO",
        "Goiânia",
        "Brasil",
      );
    }).toThrow("cep Deve ser informado!");
  });

  it("Deve lançar erro quando lograduro for vazio", () => {
    expect(() => {
      EnderecoEntrega.criar(
        "123456",
        "",
        "Centro",
        "",
        "GO",
        "Goiânia",
        "Brasil",
      );
    }).toThrow("lograduro Deve ser informado!");
  });
  it("Deve lançar erro quando bairro for vazio", () => {
    expect(() => {
      EnderecoEntrega.criar(
        "123456",
        "Rua A",
        "",
        "",
        "GO",
        "Goiânia",
        "Brasil",
      );
    }).toThrow("bairro Deve ser informado!");
  });
  it("Deve lançar erro quando UF for vazio", () => {
    expect(() => {
      EnderecoEntrega.criar(
        "123456",
        "Rua A",
        "Centro",
        "",
        "",
        "Goiânia",
        "Brasil",
      );
    }).toThrow("Uf Deve ser informado!");
  });

  it("Deve lançar erro quando cidade for vazio", () => {
    expect(() => {
      EnderecoEntrega.criar(
        "123456",
        "Rua A",
        "Centro",
        "",
        "GO",
        "",
        "Brasil",
      );
    }).toThrow("cidade Deve ser informado!");
  });
  it("Deve lançar erro quando pais for vazio", () => {
    expect(() => {
      EnderecoEntrega.criar(
        "123456",
        "Rua A",
        "Centro",
        "",
        "GO",
        "Goiânia",
        "",
      );
    }).toThrow("pais Deve ser informado!");
  });
});
