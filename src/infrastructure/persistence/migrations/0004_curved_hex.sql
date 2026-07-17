PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_itens_pedido` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pedido_id` integer NOT NULL,
	`produto_id` integer NOT NULL,
	`nome` text NOT NULL,
	`quantidade` integer NOT NULL,
	`valor_unitario` real NOT NULL,
	FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_itens_pedido`("id", "pedido_id", "produto_id", "nome", "quantidade", "valor_unitario") SELECT "id", "pedido_id", "produto_id", "nome", "quantidade", "valor_unitario" FROM `itens_pedido`;--> statement-breakpoint
DROP TABLE `itens_pedido`;--> statement-breakpoint
ALTER TABLE `__new_itens_pedido` RENAME TO `itens_pedido`;--> statement-breakpoint
PRAGMA foreign_keys=ON;