import type { EnderecoEntrega } from "../../../../domain/pedido/value-object/endereco-entrega.js";

export class AtualizarEnderecoEntregaDoPedidoCommand {
  constructor(
    public readonly pedidoId: number,
    public readonly enderecoEntrega: EnderecoEntrega,
  ) {}
}
