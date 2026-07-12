import { DomainEventBase } from "../../common/events/domain-eventBase.js";

export class PedidoCriadoEvent extends DomainEventBase {
  constructor(
    public readonly pedidoId: number,
    public readonly paceiroId: number,
  ) {
    super();
  }
}
