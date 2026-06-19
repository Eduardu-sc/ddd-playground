import { Pagamento } from "./pagamento/pagamento.js";
import { StatusPagamento } from "./pagamento/status-pagamento.js";
import { Cpf } from "./parceiro/cpf.js";
import { DadosCliente } from "./parceiro/dados-Cliente.js";
import { Parceiro } from "./parceiro/parceiro.js";
import { StatusParceiro } from "./parceiro/status-parceiro.js";
import { StatusQualificacao } from "./parceiro/status-qualificacao.js";
import { PerfilParceiro } from "./parceiro/tipo-parceiro.js";
import { EnderecoEntraga } from "./pedido/endereco-entrega.js";
import { ItemPedido } from "./pedido/item-pedido.js";
import { Pedido } from "./pedido/pedido.js";

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

const enderecoEntrega = EnderecoEntraga.criar(
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

const pagamento = new Pagamento(1, 1001, StatusPagamento.PENDENTE, 500);
pagamento.confirmar();

const pagamento1 = new Pagamento(3, 1002, StatusPagamento.PENDENTE, 700);

pagamento1.rejeitado();

console.log(pagamento.getDomainEvents());
console.log(pagamento1.getDomainEvents());
