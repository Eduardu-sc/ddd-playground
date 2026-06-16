import { Cpf } from "./parceiro/cpf.js";
import { Parceiro } from "./parceiro/parceiro.js";
import { StatusParceiro } from "./parceiro/status-parceiro.js";

const parceiro = new Parceiro(
  1,
  "hospitaal test",
  StatusParceiro.ATIVO,
  new Cpf("12345678912"),
);

console.log("antes de bloquear");
parceiro.bloquear();
console.log("depois de bloquear");
parceiro.ativar();
console.log("Depois de ativar");
parceiro.validarCompra();
console.log("Compra permetida");
