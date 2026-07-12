import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { ICategoriaRepository } from "../../../../abstrations/persistence/icategoria-repository.js";
import type { AlterarNomeDaCategoriaCommand } from "./alterar-nome-da-categoria.command.js";
import { AlterarNomeDaCategoriaResultDto } from "./alterar-nome-da-categoria.resultDto.js";

export class AlterarNomeDaCategoriaHandler {
  constructor(private readonly _repositoryCategoria: ICategoriaRepository) {}

  async executar(
    command: AlterarNomeDaCategoriaCommand,
  ): Promise<AlterarNomeDaCategoriaResultDto> {
    const categoria = await this._repositoryCategoria.obterPorId(
      command.categoriaId,
    );

    if (categoria == null) {
      throw new DomainException("Categoria não encontrada.");
    }

    categoria.alterarNome(command.novoNome);
    await this._repositoryCategoria.atualizar(categoria);

    return new AlterarNomeDaCategoriaResultDto(categoria.id, categoria.getNome);
  }
}
