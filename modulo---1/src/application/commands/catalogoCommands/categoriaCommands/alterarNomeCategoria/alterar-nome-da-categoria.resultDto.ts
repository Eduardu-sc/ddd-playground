export class AlterarNomeDaCategoriaResultDto {
  constructor(
    public readonly categoriaId: number,
    public readonly nome: string,
  ) {}
}
