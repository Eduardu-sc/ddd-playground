import { DomainException } from "../../../../domain/common/exceptions/domain-exception.js";
import { Pedido } from "../../../../domain/pedido/entities/pedido.js";
import type { ClienteAcl } from "../../../../domain/pedido/integration/cliente/cliente-acl.js";
import type { IClienteGateway } from "../../../../domain/pedido/integration/cliente/iclienteGateway.js";
import type { IPedidoRepository } from "../../../abstrations/persistence/ipedido-repository.js";
import { CriarPedidoCommand } from "./criar-pedido.command.js";
import { CriarPedidoResultDto } from "./criar-pedido.resultDTO.js";

export class CriarPedidoCommandHandler {
  constructor(
    private readonly _pedidoRepository: IPedidoRepository,
    private readonly _clienteGateway: IClienteGateway,
    private readonly _clienteAcl: ClienteAcl,
  ) {}
  async handle(command: CriarPedidoCommand): Promise<CriarPedidoResultDto> {
    //buscar endereco diretamente  no BC Cliente (upstream)
    const enderecoDto = await this._clienteGateway.obterEndereco(
      command.clienteId,
      command.enderecoId,
    );

    if (enderecoDto == null) {
      throw new DomainException("endereco nao encontrado!");
    }
    //ACL traduz  para modelo interno (snapshot)
    const enderecoEntrega = this._clienteAcl.traduzirEndereco(enderecoDto);
    //cria o aggregate
    const pedido = Pedido.criar(command.clienteId, enderecoEntrega);
    //persiste
    await this._pedidoRepository.adicionar(pedido);
    //retorna o resultado
    return new CriarPedidoResultDto(
      pedido.id,
      pedido.numeroPedido,
      pedido.dataCriacao,
      pedido.total(),
      pedido.getStatusPedido(),
    );
  }
}
