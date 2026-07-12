import { Entity } from "../../common/base/entity.js";
import { Guard } from "../../common/validations/guard.js";
import { StatusCategoria } from "../enum/status-categoria.enum.js";

export class Categoria extends Entity {
  private constructor(
    id: number,
    private nome: string,
    private ativo: StatusCategoria,
    private descricao?: string,
  ) {
    super(id);

    this.nome = nome.trim();

    Guard.contraNullWhiteSpace(this.nome, "Nome é obrigatório");
    Guard.contra(this.nome.length < 3, "Nome deve ter no mínimo 3 caracteres");
  }

  static criar(id: number, nome: string, descricao?: string): Categoria {
    return new Categoria(id, nome, StatusCategoria.ATIVO, descricao);
  }

  alterarNome(novoNome: string): void {
    novoNome = novoNome.trim();

    Guard.contraNullWhiteSpace(novoNome, "Nome é obrigatório");
    Guard.contra(novoNome.length < 3, "Nome deve ter no mínimo 3 caracteres");

    this.nome = novoNome;
  }

  ativar(): void {
    Guard.contra(
      this.ativo === StatusCategoria.ATIVO,
      "Categoria já está ativa",
    );

    this.ativo = StatusCategoria.ATIVO;
  }

  inativar(): void {
    Guard.contra(
      this.ativo === StatusCategoria.DESATIVADO,
      "Categoria já está desativada",
    );

    this.ativo = StatusCategoria.DESATIVADO;
  }

  get getNome(): string {
    return this.nome;
  }

  get getAtivo(): StatusCategoria {
    return this.ativo;
  }

  get getDescricao(): string | undefined {
    return this.descricao;
  }
}
