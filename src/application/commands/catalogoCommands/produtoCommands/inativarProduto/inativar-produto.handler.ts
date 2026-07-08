import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import type { BloquearProdutoCommand } from "./inativar-Produto.Command.js";

export class BloquearProdutoHandler {
  constructor(private readonly _repositoryProduto: IProdutoRepository) {}
  async handle(command: BloquearProdutoCommand) {
    const produto = await this._repositoryProduto.obterPorId(command.produtoId);
    if (produto == null) throw new DomainException("produto nao localizado");
    produto.bloquear;
    await this._repositoryProduto.atualizar(produto);
  }
}
