import { DomainException } from "../domainException/domain-exception.js";

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
  static contraEmptyNumber(valor: number, mensagem: string): void {
    if (valor !== undefined && !Number.isFinite(valor)) {
      throw new DomainException(mensagem);
    }
  }
  static contraNullWhiteSpace(valor: string, mensagem: string): void {
    if (valor === null || valor === undefined || !valor.trim()) {
      throw new DomainException(mensagem);
    }
  }
  static contraValorNegativo(valor: number, mensagem: string): void {
    if (valor < 0) {
      throw new DomainException(mensagem);
    }
  }
  static contra(valor: boolean, mensagem: string): void {
    if (valor) {
      throw new DomainException(mensagem);
    }
  }
}
