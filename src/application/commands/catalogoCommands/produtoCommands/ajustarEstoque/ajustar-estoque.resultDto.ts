export class AjustarEstoqueResultDto {
  constructor(
    public readonly produtoId: number,
    public readonly quantidade: number,
    public readonly motivo: string,
  ) {}
}
