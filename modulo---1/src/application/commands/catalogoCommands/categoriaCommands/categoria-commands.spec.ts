import { describe, expect, it, vi } from "vitest";
import { Categoria } from "../../../../domain/catalogo/entities/categoria.js";
import { StatusCategoria } from "../../../../domain/catalogo/enum/status-categoria.enum.js";
import type { ICategoriaRepository } from "../../../abstrations/persistence/icategoria-repository.js";
import { AlterarNomeDaCategoriaCommand } from "./alterarNomeCategoria/alterar-nome-da-categoria.command.js";
import { AlterarNomeDaCategoriaHandler } from "./alterarNomeCategoria/alterar-nome-da-categoria.handler.js";
import { AtivarCategoriaCommand } from "./ativarCategoria/ativar-categoria.command.js";
import { AtivarCategoriaHandler } from "./ativarCategoria/ativar-categoria.handler.js";
import { CriarCategoriaCommand } from "./criarCategoria/criar-categoria.command.js";
import { CriarCategoriaHandler } from "./criarCategoria/criar-categoria.handler.js";
import { DesativarCategoriaCommand } from "./desativarCategoria/desativar-categoria.command.js";
import { DesativarCategoriaHandler } from "./desativarCategoria/desativar-categoria.handler.js";

function criarRepository(categoria: Categoria | null): ICategoriaRepository & {
  adicionar: ReturnType<typeof vi.fn>;
  atualizar: ReturnType<typeof vi.fn>;
} {
  return {
    obterPorId: vi.fn().mockResolvedValue(categoria),
    adicionar: vi.fn().mockResolvedValue(undefined),
    atualizar: vi.fn().mockResolvedValue(undefined),
  };
}

describe("CriarCategoriaHandler", () => {
  it("cria, persiste e retorna a categoria", async () => {
    const repository = criarRepository(null);
    const handler = new CriarCategoriaHandler(repository);
    const command = new CriarCategoriaCommand(
      1,
      "Eletrônicos",
      "Produtos eletrônicos",
    );

    const resultado = await handler.executar(command);

    expect(repository.adicionar).toHaveBeenCalledOnce();
    expect(repository.adicionar).toHaveBeenCalledWith(expect.any(Categoria));
    expect(resultado).toEqual({
      categoriaId: 1,
      nome: "Eletrônicos",
      status: StatusCategoria.ATIVO,
      descricao: "Produtos eletrônicos",
    });
  });

  it("não persiste quando o domínio rejeita a categoria", async () => {
    const repository = criarRepository(null);
    const handler = new CriarCategoriaHandler(repository);
    const command = new CriarCategoriaCommand(1, " ");

    await expect(handler.executar(command)).rejects.toThrow();
    expect(repository.adicionar).not.toHaveBeenCalled();
  });
});

describe("AtivarCategoriaHandler", () => {
  it("ativa, persiste e retorna a categoria", async () => {
    const categoria = Categoria.criar(1, "Eletrônicos");
    categoria.inativar();
    const repository = criarRepository(categoria);
    const handler = new AtivarCategoriaHandler(repository);

    const resultado = await handler.executar(new AtivarCategoriaCommand(1));

    expect(repository.atualizar).toHaveBeenCalledWith(categoria);
    expect(resultado).toEqual({
      categoriaId: 1,
      status: StatusCategoria.ATIVO,
    });
  });

  it("rejeita uma categoria inexistente", async () => {
    const repository = criarRepository(null);
    const handler = new AtivarCategoriaHandler(repository);

    await expect(
      handler.executar(new AtivarCategoriaCommand(1)),
    ).rejects.toThrow("Categoria não encontrada.");
    expect(repository.atualizar).not.toHaveBeenCalled();
  });

  it("não persiste quando o domínio rejeita a ativação", async () => {
    const categoria = Categoria.criar(1, "Eletrônicos");
    const repository = criarRepository(categoria);
    const handler = new AtivarCategoriaHandler(repository);

    await expect(
      handler.executar(new AtivarCategoriaCommand(1)),
    ).rejects.toThrow();
    expect(repository.atualizar).not.toHaveBeenCalled();
  });
});

describe("DesativarCategoriaHandler", () => {
  it("desativa, persiste e retorna a categoria", async () => {
    const categoria = Categoria.criar(1, "Eletrônicos");
    const repository = criarRepository(categoria);
    const handler = new DesativarCategoriaHandler(repository);

    const resultado = await handler.executar(new DesativarCategoriaCommand(1));

    expect(repository.atualizar).toHaveBeenCalledWith(categoria);
    expect(resultado).toEqual({
      categoriaId: 1,
      status: StatusCategoria.DESATIVADO,
    });
  });

  it("rejeita uma categoria inexistente", async () => {
    const repository = criarRepository(null);
    const handler = new DesativarCategoriaHandler(repository);

    await expect(
      handler.executar(new DesativarCategoriaCommand(1)),
    ).rejects.toThrow("Categoria não encontrada.");
    expect(repository.atualizar).not.toHaveBeenCalled();
  });
});

describe("AlterarNomeDaCategoriaHandler", () => {
  it("altera, persiste e retorna o novo nome", async () => {
    const categoria = Categoria.criar(1, "Eletrônicos");
    const repository = criarRepository(categoria);
    const handler = new AlterarNomeDaCategoriaHandler(repository);

    const resultado = await handler.executar(
      new AlterarNomeDaCategoriaCommand(1, "Eletrodomésticos"),
    );

    expect(repository.atualizar).toHaveBeenCalledWith(categoria);
    expect(resultado).toEqual({
      categoriaId: 1,
      nome: "Eletrodomésticos",
    });
  });

  it("rejeita uma categoria inexistente", async () => {
    const repository = criarRepository(null);
    const handler = new AlterarNomeDaCategoriaHandler(repository);

    await expect(
      handler.executar(new AlterarNomeDaCategoriaCommand(1, "Novo nome")),
    ).rejects.toThrow("Categoria não encontrada.");
    expect(repository.atualizar).not.toHaveBeenCalled();
  });

  it("não persiste quando o domínio rejeita o nome", async () => {
    const categoria = Categoria.criar(1, "Eletrônicos");
    const repository = criarRepository(categoria);
    const handler = new AlterarNomeDaCategoriaHandler(repository);

    await expect(
      handler.executar(new AlterarNomeDaCategoriaCommand(1, " ")),
    ).rejects.toThrow();
    expect(repository.atualizar).not.toHaveBeenCalled();
  });
});
