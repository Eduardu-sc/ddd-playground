import type { EnderecoEntrega } from "../../../../domain/pedido/value-object/endereco-entrega.js";

export class CriarPedidoCommand {
  constructor(
    public readonly clienteId: number,
    public readonly enderecoEntrega: EnderecoEntrega,
  ) {}
}
