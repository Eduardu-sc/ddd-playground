import { Categoria } from "../../../../../domain/catalogo/entities/categoria.js";
import type { ICategoriaRepository } from "../../../../abstrations/persistence/icategoria-repository.js";
import type { CriarCategoriaCommand } from "./criar-categoria.command.js";
import { CriarCategoriaResultDto } from "./criar-categoria.resultDto.js";

export class CriarCategoriaHandler {
  constructor(private readonly _repositoryCategoria: ICategoriaRepository) {}

  async executar(
    command: CriarCategoriaCommand,
  ): Promise<CriarCategoriaResultDto> {
    const categoria = Categoria.criar(
      command.categoriaId,
      command.nome,
      command.descricao,
    );

    await this._repositoryCategoria.adicionar(categoria);

    return new CriarCategoriaResultDto(
      categoria.id,
      categoria.getNome,
      categoria.getAtivo.toString(),
      categoria.getDescricao,
    );
  }
}
