import type { EnderecoEntregaDto } from "./enderecoEntregaDto.js";
import type { ItemResumoDto } from "./itemResumoDto.js";
import type { PagamentoDto } from "./pagamentoDto.js";

export class PedidoCompletoDto {
  constructor(
    public readonly id: number,
    public readonly clienteId: number,
    public readonly valorTotal: number,
    public readonly statusPedido: string,
    public readonly dataCadastro: Date,
    public readonly dataAtualizacao: Date | null,
    public readonly endereco: EnderecoEntregaDto | null,
    public readonly itens: ItemResumoDto[] | null,
    public readonly pagamento: PagamentoDto | null,
  ) {}
}
