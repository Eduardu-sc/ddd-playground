export class CriarCategoriaCommand {
  constructor(
    public readonly categoriaId: number,
    public readonly nome: string,
    public readonly descricao?: string,
  ) {}
}
