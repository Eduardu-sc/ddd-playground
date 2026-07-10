export class AlterarNomeDoProdutoCommand {
  constructor(
    public readonly produtoId: number,
    public readonly novoNome: string,
  ) {}
}
