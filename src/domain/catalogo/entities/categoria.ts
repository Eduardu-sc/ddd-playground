import { Entity } from "../../common/base/entity.js";
import { Guard } from "../../common/validations/guard.js";

export class Categoria extends Entity {
  constructor(
    public id: number,
    private nome: string,
    private ativo: boolean,
    private descricao?: string,
  ) {
    super(id);
    Guard.contraNullWhiteSpace(this.nome, "nome e obrigatorio");
    Guard.contra(this.nome.length < 3, "nome deve ter minimo 3 carecteres");
    this.ativo = true;
  }
  alterarNome(novoNome: string): void {
    Guard.contraNullWhiteSpace(novoNome, "nome e obrigatorio");
    Guard.contra(novoNome.length < 3, "nome deve ter minimo 3 carecteres");
    this.nome = novoNome.trim();
  }

  ativar(): void {
    Guard.contra(this.ativo === true, "Categoria esta ativa");
    this.ativo = true;
  }
  getAtivo(): boolean {
    return this.ativo;
  }
  inativar(): void {
    Guard.contra(this.ativo === false, "Categoria esta desativada");
    this.ativo = false;
  }
}
