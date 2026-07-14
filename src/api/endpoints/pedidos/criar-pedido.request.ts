export class CriarPedidoRequest {
  constructor(
    public readonly clienteId: number,
    public readonly enderecoId: number,
  ) {}
}
