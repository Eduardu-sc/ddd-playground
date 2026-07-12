export class CriarPedidoResultDto {
  constructor(
    public readonly pedidoId: number,
    public readonly numeroPedido: string,
    public readonly dataCriacao: Date,
    public readonly valorTotal: number,
    public readonly status: string,
  ) {}
}
