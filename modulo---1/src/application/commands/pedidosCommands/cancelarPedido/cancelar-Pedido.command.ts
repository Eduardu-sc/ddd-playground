import type { MotivoCancelamento } from "../../../../domain/pedido/value-object/motivo-cancelamento.js";

export class CancelarPedidoCommand {
  constructor(
    public readonly pedidoId: number,
    public readonly codigoMotivo: number,
  ) {}
}
