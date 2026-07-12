import type { EnderecoDto } from "./EnderecoDto.js";

export interface IClienteGateway {
  obterEndereco(
    clienteId: number,
    enderecoId: number,
  ): Promise<EnderecoDto | null>;
}
