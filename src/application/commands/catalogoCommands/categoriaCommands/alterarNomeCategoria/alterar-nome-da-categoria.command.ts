export class AlterarNomeDaCategoriaCommand {
  constructor(
    public readonly categoriaId: number,
    public readonly novoNome: string,
  ) {}
}
