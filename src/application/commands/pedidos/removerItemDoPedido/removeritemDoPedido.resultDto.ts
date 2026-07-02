export class RemoverItemDoPedidoResultDto {
  constructor(
    public readonly pedidoId: number,
    public readonly valorTotal: number,
    public readonly pedidoStatus: string,
  ) {}
}
