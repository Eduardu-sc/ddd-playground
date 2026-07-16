import { AdicionarItemAoPedidoHandler } from "../../application/commands/pedidosCommands/adicionarItemAoPedido/adicionar-itemAoPedido.handles.js";
import { AtualizaEnderecoEntregaDoPedidoHandler } from "../../application/commands/pedidosCommands/atulizarEnderecoEntrega/atualizar-EnderecoDeEntregaDoPedido.handler.js";
import { CancelarPedidoHandler } from "../../application/commands/pedidosCommands/cancelarPedido/cancelar-Pedido.handler.js";
import { ConfirmarPagamentoHandler } from "../../application/commands/pedidosCommands/confirmarPagamento/confirmar-pagamento.handler.js";
import { CriarPedidoCommandHandler } from "../../application/commands/pedidosCommands/criarPedido/criar-pedido.handler.js";
import { IniciarPagamentoHandler } from "../../application/commands/pedidosCommands/iniciarPagamento/iniciar-pagamento.handler.js";
import { MarcaPedidoEmSeparacaoHandler } from "../../application/commands/pedidosCommands/marcaPedidoComoEmSeparado/marcaPedidoComoEmSeparado.handler.js";
import { MarcaPedidoComoEntregueHandler } from "../../application/commands/pedidosCommands/marcaPedidoComoEntregue/marca-PedidoComoEntregue.handler.js";
import { MarcaPedidoComoEnviado } from "../../application/commands/pedidosCommands/marcaPedidoComoEnviado/marca-PedidoComoEnviado.handler.js";
import { RemoverItemDoPedidoHandler } from "../../application/commands/pedidosCommands/removerItemDoPedido/remover-ItemDoPedido.handler.js";
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
  const iniciarPagamentoHandler = new IniciarPagamentoHandler(pedidoRepository);
  const confirmarPagamentoHandler = new ConfirmarPagamentoHandler(
    pedidoRepository,
  );
  const atualizarEnderecoEntregaHandler =
    new AtualizaEnderecoEntregaDoPedidoHandler(pedidoRepository);
  const removerItemHandler = new RemoverItemDoPedidoHandler(pedidoRepository);
  const cancelarPedidoHandler = new CancelarPedidoHandler(pedidoRepository);
  const marcarPedidoEmSeparacaoHandler = new MarcaPedidoEmSeparacaoHandler(
    pedidoRepository,
  );
  const marcarPedidoComoEnviadoHandler = new MarcaPedidoComoEnviado(
    pedidoRepository,
  );
  const marcarPedidoComoEntregueHandler = new MarcaPedidoComoEntregueHandler(
    pedidoRepository,
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
      iniciarPagamentoHandler,
      confirmarPagamentoHandler,
      atualizarEnderecoEntregaHandler,
      removerItemHandler,
      cancelarPedidoHandler,
      marcarPedidoEmSeparacaoHandler,
      marcarPedidoComoEnviadoHandler,
      marcarPedidoComoEntregueHandler,
    },
  };
}
