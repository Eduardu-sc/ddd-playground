CREATE TABLE `pagamentos` (
	`id` integer PRIMARY KEY NOT NULL,
	`pedido_id` integer NOT NULL,
	`metodo_pagamento` integer NOT NULL,
	`valor` real NOT NULL,
	`status_pagamento` text NOT NULL,
	`data_pagamento` integer,
	`codigo_transacao` text,
	FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`) ON UPDATE no action ON DELETE no action
);
