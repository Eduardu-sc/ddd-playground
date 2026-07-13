import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import type { AdicionarItemAoPedidoCommand } from "./adicionar-itemAoPedido.command.js";
import { AdicionarItemAoPedidoResultDto } from "./adicionar-itemAoPedido.resultDto.js";
import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import type { ICatalogoGateway } from "../../../../domain/pedido/integration/catalogo/icatalogoGateway.js";
import type { CatalogoAcl } from "../../../../domain/pedido/integration/catalogo/catalogo-acl.js";

export class AdicionarItemAoPedidoHandler {
  constructor(
    private readonly repositoryPedido: IPedidoRepository,
    private readonly _catalogoGateway: ICatalogoGateway,
    private readonly _catalogoAcl: CatalogoAcl,
  ) {}

  async executar(
    command: AdicionarItemAoPedidoCommand,
  ): Promise<AdicionarItemAoPedidoResultDto> {
    //
    const pedido = await this.repositoryPedido.obterPorId(command.pedidoId);
    if (pedido == null) {
      throw new DomainException("Pedido nao Encontrado");
    }
    // Buscar produto diretamente no BC Catálogo (Upstream)
    const produtoDto = await this._catalogoGateway.obterProdutoPorId(
      command.produtoId,
    );
    if (produtoDto == null) {
      throw new DomainException("produto nao Encontrado");
    }
    //ACL traduz  para modelo interno (snapshot)
    const [nomeProduto, precoUnitario] =
      this._catalogoAcl.traduzirProduto(produtoDto);
    //cria o aggregate
    pedido.adicionarItem(
      command.produtoId,
      nomeProduto,
      precoUnitario,
      command.quantidade,
    );
    //persiste
    await this.repositoryPedido.atualizar(pedido);
    //retorna o resultado
    return new AdicionarItemAoPedidoResultDto(
      pedido.id,
      pedido.total(),
      pedido.getStatusPedido.toString(),
    );
  }
}
