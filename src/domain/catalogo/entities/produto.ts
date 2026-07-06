import { Entity } from "../../common/base/entity.js";
import { DomainException } from "../../common/exceptions/domain-exception.js";
import { Guard } from "../../common/validations/guard.js";
import { StatusProduto } from "../enum/status-produto.enum.js";
import { NomeProduto } from "../value-object/nomeProduto.js";

export class Produto extends Entity {
  private constructor(
    id: number,
    private nome: NomeProduto,
    private preco: number,
    private statusProduto: StatusProduto,
    private categoriaId: number,
  ) {
    super(id);

    Guard.contraEmptyNumber(this.preco, "Preço deve ser informado.");
    Guard.contra(this.preco <= 0, "Preço deve ser maior que zero.");

    Guard.contra(
      !Object.values(StatusProduto).includes(this.statusProduto),
      "Status do produto informado é inválido.",
    );

    Guard.contraEmptyNumber(this.categoriaId, "Categoria deve ser informada.");
  }

  static criar(nome: NomeProduto, preco: number, categoriaId: number): Produto {
    const idNovo = Math.random();

    return new Produto(idNovo, nome, preco, StatusProduto.ATIVO, categoriaId);
  }

  alterarNome(nome: string): void {
    this.nome = NomeProduto.criar(nome);
  }

  alterarPreco(preco: number): void {
    Guard.contraEmptyNumber(preco, "Preço deve ser informado.");
    Guard.contra(preco <= 0, "Preço deve ser maior que zero.");

    this.preco = preco;
  }

  ativar(): void {
    this.statusProduto = StatusProduto.ATIVO;
  }

  bloquear(): void {
    this.statusProduto = StatusProduto.BLOQUEADO;
  }

  validarVenda(): void {
    if (this.statusProduto === StatusProduto.BLOQUEADO) {
      throw new DomainException("Produto bloqueado não pode ser vendido.");
    }
  }
}
