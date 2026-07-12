export class DesativarCategoriaResultDto {
  constructor(
    public readonly categoriaId: number,
    public readonly status: string,
  ) {}
}
