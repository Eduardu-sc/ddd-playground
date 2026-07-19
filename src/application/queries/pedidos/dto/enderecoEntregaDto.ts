export class EnderecoEntregaDto {
  constructor(
    public readonly cep: number,
    public readonly logradouro: string,
    public readonly numero: string,
    public readonly complemento: string,
    public readonly bairro: string,
    public readonly cidade: string,
    public readonly estado: string,
    public readonly pais: string,
  ) {}
}
