import { Produto } from "../../../../../domain/catalogo/entities/produto.js";
import { StatusCategoria } from "../../../../../domain/catalogo/enum/status-categoria.enum.js";
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
      throw new DomainException("Categoria não encontrada.");
    }

    Guard.contra(
      categoria.getAtivo === StatusCategoria.DESATIVADO,
      "Não é possível criar um produto em uma categoria desativada.",
    );

    const nome = NomeProduto.criar(command.nome);
    const produto = Produto.criar(nome, command.preco, command.categoriaId);

    await this._repositoryProduto.adicionar(produto);

    return new CriarProdutoResultDto(
      produto.id,
      command.nome.trim(),
      produto.getPreco,
      produto.getStatus.toString(),
    );
  }
}
