import { Guard } from "../../common/validations/guard.js";

export class EnderecoEntrega {
  private constructor(
    private readonly cep: string,
    private readonly lograduro: string,
    private readonly bairro: string,
    private readonly complemento: string,
    private readonly uf: string,
    private readonly cidade: string,
    private readonly pais: string,
  ) {
    Guard.contraNullWhiteSpace(cep, "cep Deve ser informado!");
    Guard.contraNullWhiteSpace(lograduro, "lograduro Deve ser informado!");
    Guard.contraNullWhiteSpace(bairro, "bairro Deve ser informado!");
    Guard.contraNullWhiteSpace(uf, "Uf Deve ser informado!");
    Guard.contraNullWhiteSpace(cidade, "cidade Deve ser informado!");
    Guard.contraNullWhiteSpace(pais, "pais Deve ser informado!");
  }

  static criar(
    cep: string,
    lograduro: string,
    bairro: string,
    complemento: string,
    uf: string,
    cidade: string,
    pais: string,
  ): EnderecoEntrega {
    return new EnderecoEntrega(
      cep,
      lograduro,
      bairro,
      complemento,
      uf,
      cidade,
      pais,
    );
  }
}
