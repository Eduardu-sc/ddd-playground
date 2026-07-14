import { ValueObject } from "../../common/base/value-object.js";
import { Guard } from "../../common/validations/guard.js";

export class EnderecoEntrega extends ValueObject {
  private constructor(
    public readonly cep: string,
    public readonly logradouro: string,
    public readonly bairro: string,
    public readonly complemento: string,
    public readonly uf: string,
    public readonly cidade: string,
    public readonly pais: string,
    public readonly numero: string,
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
