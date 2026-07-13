import { EnderecoEntrega } from "../../value-object/endereco-entrega.js";
import type { EnderecoDto } from "./enderecoDto.js";

export class ClienteAcl {
  public traduzirEndereco(dto: EnderecoDto) {
    return EnderecoEntrega.criar(
      dto.cep,
      dto.logradouro,
      dto.bairro,
      dto.complemento,
      dto.uf,
      dto.cidade,
      dto.pais,
      dto.numero,
    );
  }
}
