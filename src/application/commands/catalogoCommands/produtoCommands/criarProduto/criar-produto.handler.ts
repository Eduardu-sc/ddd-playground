import { Produto } from "../../../../../domain/catalogo/entities/produto.js";
import { NomeProduto } from "../../../../../domain/catalogo/value-object/nomeProduto.js";
import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import { Guard } from "../../../../../domain/common/validations/guard.js";
import type { ICategoriaRepository } from "../../../../abstrations/persistence/icategoria-repository.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import type { CriarProdutoCommand } from "./criar-produto.command.js";
import { CriarProdutoResultDto } from "./criar-produto.resultDto.js";

export class CriarProdutoHandler {
  constructor(
    private readonly _repositoryProduto: IProdutoRepository,
    private readonly _repositoryCategoria: ICategoriaRepository,
  ) {}
  async executar(command: CriarProdutoCommand): Promise<CriarProdutoResultDto> {
    const categoria = await this._repositoryCategoria.obterPorId(
      command.categoriaId,
    );
    if (categoria == null) {
      throw new DomainException("Categoria nao encontrada.");
    }
    Guard.contra(
      !categoria.getAtivo,
      "Nao e possivel criar um produto em categoria Desativada",
    );
    const nome = NomeProduto.criar(command.nome);

    const produto = Produto.criar(nome, command.preco, command.categoriaId);
    await this._repositoryProduto.atualizar(produto);
    return new CriarProdutoResultDto(
      produto.id,
      command.nome,
      produto.getPreco,
      produto.getStatus.toString(),
    );
  }
}
