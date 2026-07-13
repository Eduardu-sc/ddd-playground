export class AdicionarItemAoPedidoCommand {
  constructor(
    public readonly pedidoId: number,
    public readonly produtoId: number,
    public readonly quantidade: number,
  ) {}
}
