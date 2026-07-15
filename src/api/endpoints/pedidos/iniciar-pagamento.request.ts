export class IniciarPagamentoRequest {
  constructor(public readonly metodoPagamento: number) {}
}

export class IniciarPagamentoParams {
  constructor(public readonly id: number) {}
}
