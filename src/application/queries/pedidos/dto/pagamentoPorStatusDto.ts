export class PagamentoPorStatusDto {
  constructor(
    public readonly pagamentoId: number,
    public readonly clienteId: number,
    public readonly valorTotal: number,
    public readonly statuspagamento: string,
    public readonly metadoPagamento: string,
    public readonly codigoTransacao?: string,
    public readonly datapagamento?: Date,
  ) {}
}
