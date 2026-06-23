import { Pagamento } from "./Vendas.Domain/pedido/entities/pagamento.js";
import { MetodoPagamento } from "./Vendas.Domain/pedido/enums/metodo-pagamento.js";
import { StatusPagamento } from "./Vendas.Domain/pedido/enums/pagamento.enum.js";
import { DadosCliente } from "./Vendas.Domain/parceiro/entities/dados-Cliente.js";
import { Cpf } from "./Vendas.Domain/parceiro/value-object/cpf.js";

import { Parceiro } from "./Vendas.Domain/parceiro/parceiro.js";
import { StatusParceiro } from "./Vendas.Domain/parceiro/enums/status-parceiro.js";
import { StatusQualificacao } from "./Vendas.Domain/parceiro/enums/status-qualificacao.js";
import { PerfilParceiro } from "./Vendas.Domain/parceiro/enums/perfil-parceiro.js";
import { EnderecoEntrega } from "./Vendas.Domain/pedido/value-object/endereco-entrega.js";
import { ItemPedido } from "./Vendas.Domain/pedido/entities/item-pedido.js";
import { Pedido } from "./Vendas.Domain/pedido/pedido.js";

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
//// pagamento1.confirmar();
//// console.log("Confirmando o pagamento", pagamento1);

pagamento1.rejeitado();
console.log("Rejeitando o pagamento", pagamento1);
//// console.log(pagamento.getDomainEvents());
//// console.log(pagamento1.getDomainEvents());
