import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { ICategoriaRepository } from "../../../../abstrations/persistence/icategoria-repository.js";
import type { AtivarCategoriaCommand } from "./ativar-categoria.command.js";
import { AtivarCategoriaResultDto } from "./ativar-categoria.resultDto.js";

export class AtivarCategoriaHandler {
  constructor(private readonly _repositoryCategoria: ICategoriaRepository) {}

  async executar(
    command: AtivarCategoriaCommand,
  ): Promise<AtivarCategoriaResultDto> {
    const categoria = await this._repositoryCategoria.obterPorId(
      command.categoriaId,
    );

    if (categoria == null) {
      throw new DomainException("Categoria não encontrada.");
    }

    categoria.ativar();
    await this._repositoryCategoria.atualizar(categoria);

    return new AtivarCategoriaResultDto(
      categoria.id,
      categoria.getAtivo.toString(),
    );
  }
}
