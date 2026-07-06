import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import { Guard } from "../../../../../domain/common/validations/guard.js";
import type { ICategoriaRepository } from "../../../../abstrations/persistence/icategoria-repository.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import type { AlterarCategoriaDoProdutoCommand } from "./alterar-categoriaDoProduto.command.js";
import { AlterarCategoriaDoProdutoResultDto } from "./alterar-categoriaDoProduto.resultDto.js";

export class AlterarCategoriaDoProduto {
  constructor(
    private readonly _repositoryCategoria: ICategoriaRepository,
    private readonly _repositoryProduto: IProdutoRepository,
  ) {}
  async hadle(
    command: AlterarCategoriaDoProdutoCommand,
  ): Promise<AlterarCategoriaDoProdutoResultDto> {
    const categoria = await this._repositoryCategoria.obterPorId(
      command.novaCategoriaId,
    );
    if (categoria == null) {
      throw new DomainException("Categoria nao encontrada.");
    }
    Guard.contra(
      !categoria.getAtivo,
      "Nao e possivel alterar uma  categoria Desativada",
    );
    const produto = await this._repositoryProduto.obterPorId(command.produtoId);

    if (produto == null) {
      throw new DomainException("produto nao encontrada.");
    }

    produto.alterarCategoria(command.novaCategoriaId);
    await this._repositoryProduto.atualizar(produto);

    return new AlterarCategoriaDoProdutoResultDto(
      produto.id,
      produto.getCategoriaId,
    );
  }
}
