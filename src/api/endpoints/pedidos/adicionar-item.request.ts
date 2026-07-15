export class AdicionarItemRequest {
  constructor(
    public readonly produtoId: number,
    public readonly quantidade: number,
  ) {}
}
export class AdicionarItemParams {
  constructor(public readonly id: string) {}
}
