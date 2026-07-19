import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pedidos = sqliteTable("pedidos", {
  // Pedido
  id: integer("id").primaryKey({ autoIncrement: true }),

  parceiroId: integer("parceiro_id").notNull(),

  statusPedido: text("status_pedido").notNull(),

  motivoCancelamento: integer("motivo_cancelamento"),

  dataCriacao: integer("data_criacao", {
    mode: "timestamp",
  }).notNull(),

  dataAtualizacao: integer("data_atualizacao", {
    mode: "timestamp",
  }),

  // Endereço de Entrega (Value Object)
  enderecoCep: text("endereco_cep").notNull(),

  enderecoLogradouro: text("endereco_logradouro").notNull(),

  enderecoNumero: text("endereco_numero").notNull(),

  enderecoComplemento: text("endereco_complemento"),

  enderecoBairro: text("endereco_bairro").notNull(),

  enderecoCidade: text("endereco_cidade").notNull(),

  enderecoUf: text("endereco_uf", { length: 2 }).notNull(),

  enderecoPais: text("endereco_pais").notNull(),
});
