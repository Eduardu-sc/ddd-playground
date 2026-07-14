import { AdicionarItemAoPedidoHandler } from "../../application/commands/pedidosCommands/adicionarItemAoPedido/adicionar-itemAoPedido.handles.js";
import { CriarPedidoCommandHandler } from "../../application/commands/pedidosCommands/criarPedido/criar-pedido.handler.js";
import { CatalogoAcl } from "../../domain/pedido/integration/catalogo/catalogo-acl.js";
import { ClienteAcl } from "../../domain/pedido/integration/cliente/cliente-acl.js";
import { FakeCatalogoGateway } from "./fake-catalogo-gateway.js";
import { FakePedidoRepository } from "./fake-pedido-repository.js";
import { FakeClientesGateway } from "./fakeClienteGataway.js";

export function criarContainer() {
  // -----------------------------
  // Repositories
  // -----------------------------

  const pedidoRepository = new FakePedidoRepository();

  // -----------------------------
  // Gateways
  // -----------------------------

  const catalogoGateway = new FakeCatalogoGateway();
  const clientesGateway = new FakeClientesGateway();

  // -----------------------------
  // ACLs
  // -----------------------------

  const catalogoAcl = new CatalogoAcl();
  const clientesAcl = new ClienteAcl();

  // -----------------------------
  // Command Handlers
  // -----------------------------

  const criarPedidoHandler = new CriarPedidoCommandHandler(
    pedidoRepository,
    clientesGateway,
    clientesAcl,
  );

  const adicionarItemHandler = new AdicionarItemAoPedidoHandler(
    pedidoRepository,
    catalogoGateway,
    catalogoAcl,
  );

  return {
    repositories: {
      pedidoRepository,
    },

    gateways: {
      catalogoGateway,
      clientesGateway,
    },

    acls: {
      catalogoAcl,
      clientesAcl,
    },

    handlers: {
      criarPedidoHandler,
      adicionarItemHandler,
    },
  };
}
