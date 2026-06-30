import { describe, it, expect } from "vitest";
import { Parceiro } from "../parceiro.js";
import { StatusParceiro } from "../enums/status-parceiro.js";

import { PerfilParceiro } from "../enums/perfil-parceiro.js";

import { StatusQualificacao } from "../enums/status-qualificacao.js";

import { Cpf } from "../value-object/cpf.js";
import { DadosCliente } from "../entities/dados-Cliente.js";

describe("Parceiro", () => {
  it("deve permitir comprar quando for cliente qualificado e com limite", () => {
    const parceiro = new Parceiro(
      1,
      "Eduardo santana da cruz",
      StatusParceiro.ATIVO,
      Cpf.criar("12345678912"),
      [PerfilParceiro.CLIENTE],
      StatusQualificacao.QUALIFICADO,
      new DadosCliente(10000),
    );
    expect(() => {
      parceiro.podeComprar();
    }).not.toThrow("somente cliente pode comprar");
  });
});
