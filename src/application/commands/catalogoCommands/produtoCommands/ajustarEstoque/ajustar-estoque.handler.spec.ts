import { describe, expect, it, vi } from "vitest";
import type { Produto } from "../../../../../domain/catalogo/entities/produto.js";
import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import { AjustarEstoqueCommand } from "./ajustar-estoque.command.js";
import { AjustarEstoqueHandler } from "./ajustar-estoque.handler.js";

function criarRepository(
  produto: Produto | null,
): IProdutoRepository & { atualizar: ReturnType<typeof vi.fn> } {
  return {
    obterPorId: vi.fn().mockResolvedValue(produto),
    adicionar: vi.fn(),
    atualizar: vi.fn().mockResolvedValue(undefined),
  };
}

describe("AjustarEstoqueHandler", () => {
  it("ajusta o estoque, persiste o produto e retorna o resultado", async () => {
    const produto = {
      id: 10,
      ajustarEstoque: vi.fn(),
    } as unknown as Produto;
    const repository = criarRepository(produto);
    const handler = new AjustarEstoqueHandler(repository);
    const command = new AjustarEstoqueCommand(10, 5, "Entrada de mercadoria");

    const resultado = await handler.executar(command);

    expect(produto.ajustarEstoque).toHaveBeenCalledWith(
      5,
      "Entrada de mercadoria",
    );
    expect(repository.atualizar).toHaveBeenCalledWith(produto);
    expect(resultado).toEqual({
      produtoId: 10,
      quantidade: 5,
      motivo: "Entrada de mercadoria",
    });
  });

  it("lança exceção quando o produto não existe", async () => {
    const repository = criarRepository(null);
    const handler = new AjustarEstoqueHandler(repository);
    const command = new AjustarEstoqueCommand(10, 5, "Entrada de mercadoria");

    await expect(handler.executar(command)).rejects.toThrow(
      "Produto não encontrado.",
    );
    expect(repository.atualizar).not.toHaveBeenCalled();
  });

  it("não persiste quando o domínio rejeita o ajuste", async () => {
    const produto = {
      id: 10,
      ajustarEstoque: vi.fn(() => {
        throw new DomainException("O estoque não pode ficar negativo.");
      }),
    } as unknown as Produto;
    const repository = criarRepository(produto);
    const handler = new AjustarEstoqueHandler(repository);
    const command = new AjustarEstoqueCommand(10, -20, "Saída de mercadoria");

    await expect(handler.executar(command)).rejects.toThrow(
      "O estoque não pode ficar negativo.",
    );
    expect(repository.atualizar).not.toHaveBeenCalled();
  });
});
