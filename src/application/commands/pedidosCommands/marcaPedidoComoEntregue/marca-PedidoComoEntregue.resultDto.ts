export class MarcaPedidoComoEntregueResultDto {
  constructor(
    public readonly pedidoId: number,
    public readonly statusPedido: String,
  ) {}
}
