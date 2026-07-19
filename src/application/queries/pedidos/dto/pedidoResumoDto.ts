export class PedidoResumoDto {
  constructor(
    public readonly Id: number,
    public readonly clienteId: number,
    public readonly valorTotal: number,
    public readonly statusPedido: string,
    public readonly dataCadastro: Date,
    public readonly totalItens: number,
    public readonly totalPagamento: number,
  ) {}
}
