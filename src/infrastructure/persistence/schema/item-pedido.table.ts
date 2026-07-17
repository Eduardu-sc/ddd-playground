import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pedidos } from "./pedido.table.js";

export const itensPedido = sqliteTable("itens_pedido", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  pedidoId: integer("pedido_id")
    .notNull()
    .references(() => pedidos.id),

  produtoId: integer("produto_id").notNull(),

  nome: text("nome").notNull(),

  quantidade: integer("quantidade").notNull(),

  valorUnitario: real("valor_unitario").notNull(),
});
