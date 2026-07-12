import { DomainEventBase } from "../../common/events/domain-eventBase.js";


export class PedidoCanceladoEvent extends DomainEventBase {
  constructor(
    public readonly pedidoId: number,
    public readonly parceiroId: number,
  ) {
    super();
  }
}
