export class EnderecoDto {
  constructor(
    public readonly cep: string,
    public readonly logradouro: string,
    public readonly bairro: string,
    public readonly complemento: string,
    public readonly uf: string,
    public readonly cidade: string,
    public readonly pais: string,
    public readonly numero: string,
  ) {}
}
