PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_pedidos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`numero_pedido` text NOT NULL,
	`parceiro_id` integer NOT NULL,
	`status_pedido` text NOT NULL,
	`data_criacao` integer NOT NULL,
	`data_atualizacao` integer,
	`endereco_cep` text NOT NULL,
	`endereco_logradouro` text NOT NULL,
	`endereco_numero` text NOT NULL,
	`endereco_complemento` text,
	`endereco_bairro` text NOT NULL,
	`endereco_cidade` text NOT NULL,
	`endereco_uf` text(2) NOT NULL,
	`endereco_pais` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_pedidos`("id", "numero_pedido", "parceiro_id", "status_pedido", "data_criacao", "data_atualizacao", "endereco_cep", "endereco_logradouro", "endereco_numero", "endereco_complemento", "endereco_bairro", "endereco_cidade", "endereco_uf", "endereco_pais") SELECT "id", "numero_pedido", "parceiro_id", "status_pedido", "data_criacao", "data_atualizacao", "endereco_cep", "endereco_logradouro", "endereco_numero", "endereco_complemento", "endereco_bairro", "endereco_cidade", "endereco_uf", "endereco_pais" FROM `pedidos`;--> statement-breakpoint
DROP TABLE `pedidos`;--> statement-breakpoint
ALTER TABLE `__new_pedidos` RENAME TO `pedidos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;