import { describe, it, expect } from "vitest";
import { Parceiro } from "./parceiro.js";
import { StatusParceiro } from "./status-parceiro.js";
import { Cpf } from "./cpf.js";
import { PerfilParceiro } from "./tipo-parceiro.js";
import { DadosCliente } from "./dados-Cliente.js";
import { StatusQualificacao } from "./status-qualificacao.js";

describe("Parceiro", () => {
  it("deve permitir comprar quando for cliente qualificado e com limite", () => {
    const parceiro = new Parceiro(
      1,
      "Eduardo santana da cruz",
      StatusParceiro.ATIVO,
      Cpf.criar("12345678912"),
      [PerfilParceiro.REPRESENTANTE],
      StatusQualificacao.QUALIFICADO,
      new DadosCliente(10000),
    );
    expect(() => {
      parceiro.podeComprar();
    }).not.toThrow("somente cliente pode comprar");
  });
});
