import { DomainEventBase } from "../../common/events/domain-eventBase.js";

export class EstoqueAjustadoEvent extends DomainEventBase {
  constructor(
    public readonly produtoId: number,
    public readonly quantidade: number,
    public readonly motivo: string,
  ) {
    super();
  }
}
