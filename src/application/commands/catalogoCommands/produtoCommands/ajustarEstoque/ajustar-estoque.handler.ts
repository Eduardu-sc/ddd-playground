import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import type { AjustarEstoqueCommand } from "./ajustar-estoque.command.js";
import { AjustarEstoqueResultDto } from "./ajustar-estoque.resultDto.js";

export class AjustarEstoqueHandler {
  constructor(private readonly _repositoryProduto: IProdutoRepository) {}

  async executar(
    command: AjustarEstoqueCommand,
  ): Promise<AjustarEstoqueResultDto> {
    const produto = await this._repositoryProduto.obterPorId(command.produtoId);

    if (produto == null) {
      throw new DomainException("Produto não encontrado.");
    }

    produto.ajustarEstoque(command.quantidade, command.motivo);
    await this._repositoryProduto.atualizar(produto);

    return new AjustarEstoqueResultDto(
      produto.id,
      command.quantidade,
      command.motivo,
    );
  }
}
