export class RemoverItemDoPedidoCommand {
  constructor(
    public readonly pedidoId: number,
    public readonly itemId: number,
  ) {}
}
