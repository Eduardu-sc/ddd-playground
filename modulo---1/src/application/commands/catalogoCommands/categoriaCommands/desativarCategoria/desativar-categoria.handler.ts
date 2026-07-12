import { DomainException } from "../../../../../domain/common/exceptions/domain-exception.js";
import type { ICategoriaRepository } from "../../../../abstrations/persistence/icategoria-repository.js";
import type { DesativarCategoriaCommand } from "./desativar-categoria.command.js";
import { DesativarCategoriaResultDto } from "./desativar-categoria.resultDto.js";

export class DesativarCategoriaHandler {
  constructor(private readonly _repositoryCategoria: ICategoriaRepository) {}

  async executar(
    command: DesativarCategoriaCommand,
  ): Promise<DesativarCategoriaResultDto> {
    const categoria = await this._repositoryCategoria.obterPorId(
      command.categoriaId,
    );

    if (categoria == null) {
      throw new DomainException("Categoria não encontrada.");
    }

    categoria.inativar();
    await this._repositoryCategoria.atualizar(categoria);

    return new DesativarCategoriaResultDto(
      categoria.id,
      categoria.getAtivo.toString(),
    );
  }
}
