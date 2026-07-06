export class AlterarCategoriaDoProdutoResultDto {
  constructor(
    public readonly produtoId: number,
    public readonly categoriaId: number,
  ) {}
}
