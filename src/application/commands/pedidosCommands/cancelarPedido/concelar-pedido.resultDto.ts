export class CancelarPedidoResultDto {
  constructor(
    public readonly pedidoId: number,
    public readonly status: string,
  ) {}
}
