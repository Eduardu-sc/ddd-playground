import type { ProdutoDto } from "./produtoDto.js";

export class CatalogoAcl {
  public traduzirProduto(dto: ProdutoDto): [string, number] {
    return [dto.nome, dto.preco];
  }
}
