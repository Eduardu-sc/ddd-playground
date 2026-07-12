export class AjustarEstoqueCommand {
  constructor(
    public readonly produtoId: number,
    public readonly quantidade: number,
    public readonly motivo: string,
  ) {}
}
