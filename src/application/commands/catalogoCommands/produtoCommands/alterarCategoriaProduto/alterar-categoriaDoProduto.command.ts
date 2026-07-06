export class AlterarCategoriaDoProdutoCommand {
  constructor(
    public readonly produtoId: number,
    public readonly novaCategoriaId: number,
  ) {}
}
