import { DomainException } from "./domain-exception.js";

export class Guard {
  static contraNull(valor: unknown, mensagem: string): void {
    if (valor === null || valor === undefined) {
      throw new DomainException(mensagem);
    }
  }
  static contraEmpty(valor: string, mensagem: string): void {
    if (!valor.trim()) {
      throw new DomainException(mensagem);
    }
  }
  static contraValorNegativo(valor: number, messagem: string): void {
    if (valor < 0) {
      throw new DomainException(messagem);
    }
  }
}
