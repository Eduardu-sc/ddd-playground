CREATE TABLE `pedidos` (
	`id` integer PRIMARY KEY NOT NULL,
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
