import type { IDomainEvent } from "../../Vendas.Domain/common/events/idomain-events.js";

export abstract class Entity {
  protected constructor(
    public readonly id: number,
    public readonly dataCriacao: Date = new Date(),
    public readonly dataAtualizacao: Date = new Date(),
  ) {}

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
