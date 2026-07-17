CREATE TABLE `itens_pedido` (
	`id` integer PRIMARY KEY NOT NULL,
	`pedido_id` integer NOT NULL,
	`produto_id` integer NOT NULL,
	`nome` text NOT NULL,
	`quantidade` integer NOT NULL,
	`valor_unitario` real NOT NULL,
	FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`) ON UPDATE no action ON DELETE no action
);
