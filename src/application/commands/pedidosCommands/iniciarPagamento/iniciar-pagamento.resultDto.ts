export class IniciarPagamentoResultDto {
  constructor(
    public readonly pedidoId: number,
    public readonly pagamentoId: number,
    public readonly statusPedido: string,
    public readonly statusPagamento: string,
  ) {}
}
