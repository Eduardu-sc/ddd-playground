import { describe, expect, it } from "vitest";
import { DadosCliente } from "./dados-Cliente.js";

describe("DadosCliente", () => {
  it("Deve Lançar erro quando o limite for negativo", () => {
    expect(() => {
      new DadosCliente(-1000);
    }).toThrow();
  });
});
