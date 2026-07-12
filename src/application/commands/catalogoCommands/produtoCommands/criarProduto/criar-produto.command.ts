export class CriarProdutoCommand {
  constructor(
    public readonly nome: string,
    public readonly preco: number,
    public readonly categoriaId: number,
  ) {}
}
