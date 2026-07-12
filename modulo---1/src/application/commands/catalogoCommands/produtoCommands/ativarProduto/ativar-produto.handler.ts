import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import type { AtivarProdutoCommand } from "./ativar-produto.command.js";
import { AtivarProdutoResultDto } from "./ativar-produto.resultDto.js";

export class AtivarProdutoHandler {
  constructor(private readonly _repositoryProduto: IProdutoRepository) {}

  async executar(
    command: AtivarProdutoCommand,
  ): Promise<AtivarProdutoResultDto> {
    const produto = await this._repositoryProduto.obterPorId(command.produtoId);

    if (produto == null) {
      throw new DomainException("Produto não encontrado.");
    }

    produto.ativar();

    await this._repositoryProduto.atualizar(produto);
    return new AtivarProdutoResultDto(produto.id, produto.getStatus.toString());
  }
}
