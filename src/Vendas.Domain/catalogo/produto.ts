import { Entity } from "../../shared/domain/entity.js";
import { Guard } from "../common/validations/guard.js";
import { StatusProduto } from "./enum/status-produto.enum.js";
import { NomeProduto } from "./value-object/nomeProduto.js";

export class Produto extends Entity {
  private constructor(
    id: number,
    private nome: NomeProduto,
    private preco: number,
    private statusProduto: StatusProduto,
  ) {
    super(id);
    Guard.contraEmptyNumber(this.preco, "Preco dever ser um numero ");

    Guard.contra(
      Object.values(StatusProduto).includes(
        this.statusProduto as StatusProduto,
      ),
      "status pagamento foi informado incorreto",
    );
  }

  static criar(nome: NomeProduto, preco: number): Produto {
    const idNovo = Math.random();
    const produto = new Produto(idNovo, nome, preco, StatusProduto.ATIVO);

    return produto;
  }
  alterarNome(nome: string): void {
    
    this.nome = NomeProduto.criar(nome);
  }
  alterarPreco(preco: number): void {
    Guard.contraEmptyNumber(preco, "paramentro preco deve ser numero");
    Guard.contra(preco > 0, "paramentro preco deve ser maior que 0");
    this.preco = preco;
  }
  ativar(): void {
    this.statusProduto = StatusProduto.ATIVO;
  }
  bloquear(): void {
    this.statusProduto = StatusProduto.BLOQUEADO;
  }
}
