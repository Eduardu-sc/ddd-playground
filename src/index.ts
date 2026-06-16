import { Cpf } from "./parceiro/cpf.js";
import { DadosCliente } from "./parceiro/dados-Cliente.js";
import { Parceiro } from "./parceiro/parceiro.js";
import { StatusParceiro } from "./parceiro/status-parceiro.js";
import { StatusQualificacao } from "./parceiro/status-qualificacao.js";
import { PerfilParceiro } from "./parceiro/tipo-parceiro.js";

const parceiro = new Parceiro(
  1,
  " ",
  StatusParceiro.ATIVO,
  new Cpf("12345678912"),
  [PerfilParceiro.CLIENTE, PerfilParceiro.FORNECEDOR],
  StatusQualificacao.QUALIFICADO,
  new DadosCliente(1000),
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
