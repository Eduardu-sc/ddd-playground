import type { IDomainEvent } from "../shared/domain/events/idomain-events.js";


export abstract class Entity {
  private readonly domainEvents: IDomainEvent[] = [];

  public getDomainEvents(): readonly IDomainEvent[] {
    return this.domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  public removeDomainEvent(domainEvent: IDomainEvent): void {
    const index = this.domainEvents.indexOf(domainEvent);

    if (index >= 0) {
      this.domainEvents.splice(index, 1);
    }
  }

  public clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }
}
