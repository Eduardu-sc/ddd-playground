export class CriarCategoriaResultDto {
  constructor(
    public readonly categoriaId: number,
    public readonly nome: string,
    public readonly status: string,
    public readonly descricao?: string,
  ) {}
}
