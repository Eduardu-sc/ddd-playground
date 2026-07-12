import { Pagamento } from "./domain/pedido/entities/pagamento.js";
import { MetodoPagamento } from "./domain/pedido/enums/metodo-pagamento.js";
import { StatusPagamento } from "./domain/pedido/enums/pagamento.enum.js";
import { DadosCliente } from "./domain/parceiro/entities/dados-Cliente.js";
import { Cpf } from "./domain/parceiro/value-object/cpf.js";

import { Parceiro } from "./domain/parceiro/entities/parceiro.js";
import { StatusParceiro } from "./domain/parceiro/enums/status-parceiro.js";
import { StatusQualificacao } from "./domain/parceiro/enums/status-qualificacao.js";
import { PerfilParceiro } from "./domain/parceiro/enums/perfil-parceiro.js";
import { EnderecoEntrega } from "./domain/pedido/value-object/endereco-entrega.js";
import { ItemPedido } from "./domain/pedido/entities/item-pedido.js";
import { Pedido } from "./domain/pedido/entities/pedido.js";

const parceiro = new Parceiro(
  1,
  "PLAY HOSPITALAR",
  StatusParceiro.ATIVO,
  Cpf.criar("12345671812"),
  [PerfilParceiro.CLIENTE, PerfilParceiro.FORNECEDOR],
  StatusQualificacao.QUALIFICADO,
  new DadosCliente(10000),
);

console.log(parceiro);
console.log("antes de bloquear");
parceiro.bloquear();
console.log("depois de bloquear");
parceiro.ativar();
parceiro.validarLimite(5000);
console.log("tem limite");
parceiro.podeComprar();
console.log("Depois de ativar");
console.log("Operacao Autorida/Permetida");

const enderecoEntrega = EnderecoEntrega.criar(
  "12345678",
  "rua mg18 qd 31 lote 15",
  "madre germana 1",
  "",
  "GO",
  "aparecida de goiania",
  "Brasil",
);

const pedido = new Pedido(1001, parceiro.id, enderecoEntrega, []);

pedido.adicionarItem(new ItemPedido("parecetamol", 10, 10.5));
pedido.adicionarItem(new ItemPedido("DIPIRONA", 8, 10.5));
console.log(pedido.total());
console.log(pedido);

const pagamento1 = new Pagamento(
  1,
  pedido.id,
  pedido.id,
  MetodoPagamento.DINHEIRO,
  1000,
);
console.log("Criando o pagamento", pagamento1);
pagamento1.confirmar();
console.log("Confirmando o pagamento", pagamento1);

pagamento1.rejeitado();
console.log("Rejeitando o pagamento", pagamento1);
console.log(pagamento1.getDomainEvents());
