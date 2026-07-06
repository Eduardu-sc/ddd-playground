export class AdicionarItemAoPedidoCommand {
  constructor(
    public readonly pedidoId: number,
    public readonly produtoId: number,
    public readonly nomeProduto: string,
    public readonly precoUnitario: number,
    public readonly quantidade: number,
  ) {}
}
