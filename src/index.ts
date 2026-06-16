import { Cpf } from "./parceiro/cpf.js";
import { DadosCliente } from "./parceiro/dados-Cliente.js";
import { Parceiro } from "./parceiro/parceiro.js";
import { StatusParceiro } from "./parceiro/status-parceiro.js";
import { StatusQualificacao } from "./parceiro/status-qualificacao.js";
import { PerfilParceiro } from "./parceiro/tipo-parceiro.js";
import { ItemPedido } from "./pedido/item-pedido.js";
import { Pedido } from "./pedido/pedido.js";

const parceiro = new Parceiro(
  1,
  "PLAY HOSPITALAR",
  StatusParceiro.ATIVO,
  new Cpf("12345678912"),
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

const pedido = new Pedido(1001, parceiro.id, []);

pedido.adicionarItem(new ItemPedido("parecetamol", 10, 10.5));
pedido.adicionarItem(new ItemPedido("DIPIRONA", 8, 10.5));
console.log(pedido.total());
console.log(pedido);
