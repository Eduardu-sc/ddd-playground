import type { IDomainEvent } from "./idomain-events.js";

export abstract class DomainEventBase implements IDomainEvent {
  readonly dataOcorrencia: Date;

  constructor() {
    this.dataOcorrencia = new Date();
  }
}
