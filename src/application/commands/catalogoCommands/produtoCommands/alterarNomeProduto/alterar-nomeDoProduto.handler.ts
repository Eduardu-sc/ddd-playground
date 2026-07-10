import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import type { AlterarNomeDoProdutoCommand } from "./alterar-nomeDoProduto.command.js";

export class AlterarNomeDoProdutoHandler {
  constructor(private _produtoRepository: IProdutoRepository) {}
  async execute(command: AlterarNomeDoProdutoCommand) {
    const produto = await this._produtoRepository.obterPorId(command.produtoId);
    if (produto == null) {
      throw new DomainException("produto nao localizado");
    }

    produto.alterarNome(command.novoNome);
    await this._produtoRepository.atualizar(produto);
  }
}
