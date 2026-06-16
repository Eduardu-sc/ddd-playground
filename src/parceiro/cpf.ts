import { DomainException } from "./domain-exception.js";

export class Cpf {
  constructor(private readonly valor: string) {
    if (valor.length !== 11) {
      throw new DomainException("Cpf Invalido");
    }
  }
  getvalor(): string {
    return this.valor;
  }
}
