import type { ICatalogoGateway } from "../../domain/pedido/integration/catalogo/icatalogoGateway.js";
import { ProdutoDto } from "../../domain/pedido/integration/catalogo/produtoDto.js";

export class FakeCatalogoGateway implements ICatalogoGateway {
  private static readonly produtos = new Map<number, ProdutoDto>([
    [1, new ProdutoDto(1, "Notebook Gamer RTX 4060", 8500)],
    [2, new ProdutoDto(2, "Mouse Sem Fio Logitech MX Master", 450)],
    [3, new ProdutoDto(3, "Teclado Mecânico Keychron K8", 680)],
    [4, new ProdutoDto(4, "Monitor Ultrawide 34 Polegadas", 3200)],
  ]);

  async obterProdutoPorId(produtoId: number): Promise<ProdutoDto | null> {
    return FakeCatalogoGateway.produtos.get(produtoId) ?? null;
  }

  async possuirEstoqueDisponivel(
    produtoId: number,
    quantidade: number,
  ): Promise<boolean> {
    return FakeCatalogoGateway.produtos.has(produtoId) && quantidade > 0;
  }
}
