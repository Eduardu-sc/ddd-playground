export class PagamentoDto {
  constructor(
    public readonly pagamentoId: number,
    public readonly metadoPagamento: string,
    public readonly statusPagamento: string,
    public readonly valor: number,
    public readonly codigoTransacao?: string,
    public readonly datapagamento?: Date,
  ) {}
}
