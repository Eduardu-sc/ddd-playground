import type { Categoria } from "../../../domain/catalogo/entities/categoria.js";

export interface ICategoriaRepository {
  obterPorId(id: number): Promise<Categoria | null>;
  adicionar(categoria: Categoria): Promise<void>;
  atualizar(categoria: Categoria): Promise<void>;
}
