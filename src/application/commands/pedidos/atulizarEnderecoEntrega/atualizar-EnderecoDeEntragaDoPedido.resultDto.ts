export class AtualizarEnderecoEntregaDoPedidoResultDto {
  constructor(
    public readonly pedidoId: number,
    public readonly enderecoEntrega: string,
    public readonly Status: string,
  ) {}
}
