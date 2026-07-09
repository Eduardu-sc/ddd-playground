import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import type { DesativarProdutoCommand } from "./desativar-produto.command.js";

export class DesativarProdutoHandler {
  constructor(private readonly _repositoryProduto: IProdutoRepository) {}
  async executar(command: DesativarProdutoCommand) {
    const produto = await this._repositoryProduto.obterPorId(command.produtoId);
    if (produto == null) throw new DomainException("produto nao localizado");
    produto.desativar();
    await this._repositoryProduto.atualizar(produto);
  }
}
