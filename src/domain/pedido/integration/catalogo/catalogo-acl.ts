import { DomainException } from "../../../common/exceptions/domain-exception.js";
import { Guard } from "../../../common/validations/guard.js";
import type { ICatalogoGateway } from "./icatalogoGateway.js";
import { ProdutoSnapshot } from "./produto-snapshot.js";

export class CatalogoAcl {
  constructor(private readonly _gateway: ICatalogoGateway) {
    Guard.contraNull(_gateway, "gateway e obrigatorio");
  }
  async obterProdutoSnapshot(produtoId: number): Promise<ProdutoSnapshot> {
    const dto = await this._gateway.obterProdutoPorId(produtoId);
    if (dto == null) {
      throw new DomainException("produto nao encontrado do catalogo ");
    }
    return new ProdutoSnapshot(dto.id, dto.nome, dto.preco);
  }
  async validarEstoque(produtoId: number, quantidade: number): Promise<void> {
    const possuiEstoque = await this._gateway.possuirEstoqueDisponivel(
      produtoId,
      quantidade,
    );
    if (!possuiEstoque) {
      throw new DomainException("Estoque insuficiente para produto");
    }
  }
}
