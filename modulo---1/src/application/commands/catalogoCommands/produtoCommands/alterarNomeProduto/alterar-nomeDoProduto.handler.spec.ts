import { describe, expect, it, vi } from "vitest";
import type { Produto } from "../../../../../domain/catalogo/entities/produto.js";
import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import { AlterarNomeDoProdutoCommand } from "./alterar-nomeDoProduto.command.js";
import { AlterarNomeDoProdutoHandler } from "./alterar-nomeDoProduto.handler.js";

function criarRepository(
  produto: Produto | null,
): IProdutoRepository & { atualizar: ReturnType<typeof vi.fn> } {
  return {
    obterPorId: vi.fn().mockResolvedValue(produto),
    adicionar: vi.fn(),
    atualizar: vi.fn().mockResolvedValue(undefined),
  };
}

describe("AlterarNomeDoProdutoHandler", () => {
  it("altera o nome, persiste o produto e retorna o resultado", async () => {
    const produto = {
      id: 10,
      alterarNome: vi.fn(),
    } as unknown as Produto;
    const repository = criarRepository(produto);
    const handler = new AlterarNomeDoProdutoHandler(repository);
    const command = new AlterarNomeDoProdutoCommand(10, "Produto atualizado");

    const resultado = await handler.executar(command);

    expect(produto.alterarNome).toHaveBeenCalledWith("Produto atualizado");
    expect(repository.atualizar).toHaveBeenCalledWith(produto);
    expect(resultado).toEqual({
      produtoId: 10,
      nome: "Produto atualizado",
    });
  });

  it("lança exceção quando o produto não existe", async () => {
    const repository = criarRepository(null);
    const handler = new AlterarNomeDoProdutoHandler(repository);
    const command = new AlterarNomeDoProdutoCommand(10, "Produto atualizado");

    await expect(handler.executar(command)).rejects.toThrow(
      new DomainException("Produto não encontrado."),
    );
    expect(repository.atualizar).not.toHaveBeenCalled();
  });

  it("não persiste quando o domínio rejeita o novo nome", async () => {
    const produto = {
      id: 10,
      alterarNome: vi.fn(() => {
        throw new DomainException("Nome inválido.");
      }),
    } as unknown as Produto;
    const repository = criarRepository(produto);
    const handler = new AlterarNomeDoProdutoHandler(repository);
    const command = new AlterarNomeDoProdutoCommand(10, "Inválido");

    await expect(handler.executar(command)).rejects.toThrow("Nome inválido.");
    expect(repository.atualizar).not.toHaveBeenCalled();
  });
});
