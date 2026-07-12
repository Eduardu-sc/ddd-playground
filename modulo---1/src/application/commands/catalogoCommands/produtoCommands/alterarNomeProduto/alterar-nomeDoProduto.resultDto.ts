export class AlterarNomeDoProdutoResultDto {
  constructor(
    public readonly produtoId: number,
    public readonly nome: string,
  ) {}
}
