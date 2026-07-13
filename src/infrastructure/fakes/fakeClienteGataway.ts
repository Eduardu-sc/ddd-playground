import { EnderecoDto } from "../../domain/pedido/integration/cliente/enderecoDto.js";
import type { IClienteGateway } from "../../domain/pedido/integration/cliente/iclienteGateway.js";

export class FakeClientesGateway implements IClienteGateway {
  private static readonly clientes = new Map<number, Map<number, EnderecoDto>>([
    [
      1,
      new Map<number, EnderecoDto>([
        [
          1,
          new EnderecoDto(
            1,
            "01310-100",
            "Avenida Paulista",
            "1578",
            "Bela Vista",
            "São Paulo",
            "SP",
            "Brasil",
            "Conjunto 42",
          ),
        ],
        [
          2,
          new EnderecoDto(
            2,
            "74000-000",
            "Rua 10",
            "200",
            "Centro",
            "Goiânia",
            "GO",
            "Brasil",
            "",
          ),
        ],
      ]),
    ],
  ]);

  async obterEndereco(
    clienteId: number,
    enderecoId: number,
  ): Promise<EnderecoDto | null> {
    const enderecos = FakeClientesGateway.clientes.get(clienteId);

    if (!enderecos) {
      return null;
    }

    return enderecos.get(enderecoId) ?? null;
  }
}
