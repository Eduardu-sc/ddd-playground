import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { IProdutoRepository } from "../../../../abstrations/persistence/iproduto-repository.js";
import type { AlterarNomeDoProdutoCommand } from "./alterar-nomeDoProduto.command.js";
import { AlterarNomeDoProdutoResultDto } from "./alterar-nomeDoProduto.resultDto.js";

export class AlterarNomeDoProdutoHandler {
  constructor(private readonly _produtoRepository: IProdutoRepository) {}

  async executar(
    command: AlterarNomeDoProdutoCommand,
  ): Promise<AlterarNomeDoProdutoResultDto> {
    const produto = await this._produtoRepository.obterPorId(command.produtoId);

    if (produto == null) {
      throw new DomainException("Produto não encontrado.");
    }

    produto.alterarNome(command.novoNome);
    await this._produtoRepository.atualizar(produto);

    return new AlterarNomeDoProdutoResultDto(produto.id, command.novoNome);
  }
}
