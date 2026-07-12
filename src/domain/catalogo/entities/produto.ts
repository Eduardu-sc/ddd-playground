import { Entity } from "../../common/base/entity.js";
import { DomainException } from "../../common/exceptions/domain-exception.js";
import { Guard } from "../../common/validations/guard.js";
import { StatusProduto } from "../enum/status-produto.enum.js";
import { EstoqueAjustadoEvent } from "../events/estoqueAjustado.events.js";
import { NomeProduto } from "../value-object/nomeProduto.js";

export class Produto extends Entity {
  private constructor(
    id: number,
    private nome: NomeProduto,
    private preco: number,
    private statusProduto: StatusProduto,

    private categoriaId: number,
    private estoque: number = 0,
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

  static criar(
    nome: NomeProduto,
    preco: number,
    categoriaId: number,
    estoqueInicial: number,
  ): Produto {
    const idNovo = Math.random();

    return new Produto(
      idNovo,
      nome,
      preco,
      StatusProduto.ATIVO,
      categoriaId,
      estoqueInicial,
    );
  }
  ajustarEstoque(quantidade: number, motivo: string): void {
    Guard.contra(
      this.estoque + quantidade < 0,
      "O estoque não pode ficar negativo.",
    );
    this.estoque += quantidade;
    this.dataAtualizacao;
    this.addDomainEvent(new EstoqueAjustadoEvent(this.id, quantidade, motivo));
  }
  alterarNome(nome: string): void {
    this.nome = NomeProduto.criar(nome);
  }
  alterarCategoria(novaCategoriaId: number): void {
    Guard.contraEmptyNumber(
      novaCategoriaId,
      "codigo da novaCategoriaId deve ser informada",
    );
    this.categoriaId = novaCategoriaId;
  }

  alterarPreco(preco: number): void {
    Guard.contraEmptyNumber(preco, "Preço deve ser informado.");
    Guard.contra(preco <= 0, "Preço deve ser maior que zero.");

    this.preco = preco;
  }

  ativar(): void {
    this.statusProduto = StatusProduto.ATIVO;
  }

  desativar(): void {
    this.statusProduto = StatusProduto.DESATIVAR;
  }

  validarVenda(): void {
    if (this.statusProduto === StatusProduto.DESATIVAR) {
      throw new DomainException("Produto desativado não pode ser vendido.");
    }
  }
  get getPreco(): number {
    return this.preco;
  }
  get getStatus(): StatusProduto {
    return this.statusProduto;
  }
  get getCategoriaId(): number {
    return this.categoriaId;
  }
}
