CREATE TABLE `pedidos` (
	`id` integer PRIMARY KEY NOT NULL,
	`numero_pedido` text NOT NULL,
	`parceiro_id` integer NOT NULL,
	`status_pedido` text NOT NULL,
	`data_criacao` integer NOT NULL,
	`data_atualizacao` integer
);
