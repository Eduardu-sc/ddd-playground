import { ValueObject } from "../../common/base/value-object.js";
import { Guard } from "../../common/validations/guard.js";

export class EnderecoEntrega extends ValueObject {
  private constructor(
    private readonly cep: string,
    private readonly logradouro: string,
    private readonly bairro: string,
    private readonly complemento: string,
    private readonly uf: string,
    private readonly cidade: string,
    private readonly pais: string,
    private readonly numero: string,
  ) {
    super();
    Guard.contraNullWhiteSpace(cep, "cep Deve ser informado!");
    Guard.contraNullWhiteSpace(logradouro, "lograduro Deve ser informado!");
    Guard.contraNullWhiteSpace(bairro, "bairro Deve ser informado!");
    Guard.contraNullWhiteSpace(uf, "Uf Deve ser informado!");
    Guard.contraNullWhiteSpace(cidade, "cidade Deve ser informado!");
    Guard.contraNullWhiteSpace(pais, "pais Deve ser informado!");
    Guard.contraNullWhiteSpace(numero, "cep Deve ser informado!");
  }

  static criar(
    cep: string,
    logradouro: string,
    bairro: string,
    complemento: string,
    uf: string,
    cidade: string,
    pais: string,
    numero: string,
  ): EnderecoEntrega {
    return new EnderecoEntrega(
      cep,
      logradouro,
      bairro,
      complemento,
      uf,
      cidade,
      pais,
      numero,
    );
  }
  protected getEqualityComponents(): readonly unknown[] {
    return [
      this.cep,
      this.logradouro,
      this.bairro,
      this.complemento,
      this.uf,
      this.cidade,
      this.pais,
      this.numero,
    ];
  }
}
