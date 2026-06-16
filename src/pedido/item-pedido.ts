export class ItemPedido {
  constructor(
    public readonly produto: string,
    public readonly quantidade: number,
    public readonly valorUnitario: number,
  ) {}
  total(): number {
    return this.quantidade * this.valorUnitario;
  }
}
