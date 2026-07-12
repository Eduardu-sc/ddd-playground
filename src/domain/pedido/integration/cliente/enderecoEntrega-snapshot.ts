import { ValueObject } from "../../../common/base/value-object.js";
import { Guard } from "../../../common/validations/guard.js";

export class EnderecoEntregaSnapshot extends ValueObject {
  constructor(
    private readonly cep: string,
    private readonly logradouro: string,
    private readonly bairro: string,
    private readonly complemento: string,
    private readonly uf: string,
    private readonly cidade: string,
    private readonly pais: string,
  ) {
    super();
    Guard.contraNullWhiteSpace(cep, "CEP é obrigatório");
    Guard.contraNullWhiteSpace(logradouro, "Logradouro é obrigatório");
    Guard.contraNullWhiteSpace(bairro, "Bairro é obrigatório");
    Guard.contraNullWhiteSpace(cidade, "Cidade é obrigatória");
    Guard.contraNullWhiteSpace(uf, "Estado é obrigatório");
    Guard.contraNullWhiteSpace(pais, "País é obrigatório");
  }
  protected getEqualityComponents(): readonly unknown[] {
    return [
      this.cep,
      this.logradouro,
      this.bairro,
      this.cidade,
      this.uf,
      this.pais,
      this.complemento
    ];
  }
}
