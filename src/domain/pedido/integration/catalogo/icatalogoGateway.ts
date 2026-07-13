import type { ProdutoDto } from "./produtoDto.js";

export interface ICatalogoGateway {
  obterProdutoPorId(produtoId: number): Promise<ProdutoDto | null>;
}
