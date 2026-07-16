import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const pedidos = sqliteTable("pedidos", {
  id: integer("id").primaryKey(),

  numeroPedido: text("numero_pedido").notNull(),

  parceiroId: integer("parceiro_id").notNull(),

  statusPedido: text("status_pedido").notNull(),

  dataCriacao: integer("data_criacao", {
    mode: "timestamp",
  }).notNull(),

  dataAtualizacao: integer("data_atualizacao", {
    mode: "timestamp",
  }),
});
