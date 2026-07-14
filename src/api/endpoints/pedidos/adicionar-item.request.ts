export class AdicionarItemRequest {
  constructor(
    public readonly produtoId: number,
    public readonly quantidade: number,
  ) {}
}
