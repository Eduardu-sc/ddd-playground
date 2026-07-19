export class ItemResumoDto {
  constructor(
    public readonly produtoId: number,
    public readonly nomePeduto: string,
    public readonly precoUnitario: number,
    public readonly quantidade: number,
    public readonly valorTotal: number,
  ) {}
}
