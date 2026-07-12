import { ValueObject } from "../../common/base/value-object.js";
import { Guard } from "../../common/validations/guard.js";

export class MotivoCancelamento extends ValueObject {
  private constructor(
    public readonly codigo: number,
    public readonly descricao: string,
  ) {
    super();
  }

  static readonly CLIENTE_DESISTIU = new MotivoCancelamento(
    1,
    "Cliente desistiu da compra",
  );

  static readonly FALTA_ESTOQUE = new MotivoCancelamento(2, "Falta de estoque");

  static readonly PAGAMENTO_NAO_APROVADO = new MotivoCancelamento(
    3,
    "Pagamento não aprovado",
  );

  static readonly ERRO_CADASTRO = new MotivoCancelamento(4, "Erro de cadastro");

  static readonly PRODUTO_DANIFICADO = new MotivoCancelamento(
    5,
    "Produto danificado",
  );

  static readonly PEDIDO_DUPLICADO = new MotivoCancelamento(
    6,
    "Pedido duplicado",
  );

  static readonly SOLICITACAO_COMERCIAL = new MotivoCancelamento(
    7,
    "Solicitação comercial",
  );

  static readonly OUTROS = new MotivoCancelamento(99, "Outros");

  static listar(): readonly MotivoCancelamento[] {
    return [
      this.CLIENTE_DESISTIU,
      this.FALTA_ESTOQUE,
      this.PAGAMENTO_NAO_APROVADO,
      this.ERRO_CADASTRO,
      this.PRODUTO_DANIFICADO,
      this.PEDIDO_DUPLICADO,
      this.SOLICITACAO_COMERCIAL,
      this.OUTROS,
    ];
  }

  static porCodigo(codigo: number): MotivoCancelamento {
    const motivo = this.listar().find((m) => m.codigo === codigo);

    Guard.contra(!motivo, "Motivo de cancelamento inválido.");

    return motivo!;
  }

  toString(): string {
    return this.descricao;
  }
  protected getEqualityComponents(): readonly unknown[] {
    return [this.codigo];
  }
}
