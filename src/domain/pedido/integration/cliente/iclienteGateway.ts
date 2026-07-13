import type { EnderecoDto } from "./enderecoDto.js";



export interface IClienteGateway {
  obterEndereco(
    clienteId: number,
    enderecoId: number,
  ): Promise<EnderecoDto | null>;
}
