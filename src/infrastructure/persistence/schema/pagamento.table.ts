import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pedidos } from "./pedido.table.js";

export const pagamentos = sqliteTable("pagamentos", {
  id: integer("id").primaryKey(),

  pedidoId: integer("pedido_id")
    .notNull()
    .references(() => pedidos.id),

  metodoPagamento: integer("metodo_pagamento").notNull(),

  valor: real("valor").notNull(),

  statusPagamento: text("status_pagamento").notNull(),

  dataPagamento: integer("data_pagamento", {
    mode: "timestamp",
  }),

  codigoTransacao: text("codigo_transacao"),
});
