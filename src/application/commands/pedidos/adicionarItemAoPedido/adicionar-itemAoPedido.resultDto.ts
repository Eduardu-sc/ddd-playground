export class AdicionarItemAoPedidoResultDto {
  constructor(
    public readonly pedidoId: number,
    public readonly valorTotal: number,
    public readonly Status: string,
  ) {}
}
