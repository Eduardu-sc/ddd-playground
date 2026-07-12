export class CriarProdutoResultDto {
  constructor(
    public readonly produtoId: number,
    public readonly nome: string,
    public readonly preco: number,
    public readonly status: string,
  ) {}
}
