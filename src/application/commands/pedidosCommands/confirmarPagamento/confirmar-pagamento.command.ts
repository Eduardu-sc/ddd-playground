export class ConfirmarPagamentoCommand {
  constructor(
    public readonly pedidoId: number,
    public readonly pagamentoId: number,
  ) {}
}
