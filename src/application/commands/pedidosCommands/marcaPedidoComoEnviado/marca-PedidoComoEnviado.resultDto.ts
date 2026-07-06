export class MarcaPedidoComoEnviadoResultDto {
  constructor(
    public readonly pedidoId: number,
    public readonly statusPedido: String,
  ) {}
}
