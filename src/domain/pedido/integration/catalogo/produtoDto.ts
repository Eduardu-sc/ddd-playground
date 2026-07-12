export class ProdutoDto {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly preco: number,
  ) {}
}
