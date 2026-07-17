import { Router, type Request, type Response } from "express";
import type { criarContainer } from "../../../infrastructure/fakes/fake-infrastructure-extensions.js";
import { CriarPedidoCommand } from "../../../application/commands/pedidosCommands/criarPedido/criar-pedido.command.js";
import { DomainException } from "../../../domain/common/exceptions/domain-exception.js";
import { AdicionarItemAoPedidoCommand } from "../../../application/commands/pedidosCommands/adicionarItemAoPedido/adicionar-itemAoPedido.command.js";
import { AtualizarEnderecoEntregaDoPedidoCommand } from "../../../application/commands/pedidosCommands/atulizarEnderecoEntrega/atualizar-EnderecoDeEntregaDoPedido.command.js";
import { CancelarPedidoCommand } from "../../../application/commands/pedidosCommands/cancelarPedido/cancelar-Pedido.command.js";
import { ConfirmarPagamentoCommand } from "../../../application/commands/pedidosCommands/confirmarPagamento/confirmar-pagamento.command.js";
import { MarcaPedidoEmSeparacaoCommand } from "../../../application/commands/pedidosCommands/marcaPedidoComoEmSeparado/marcaPedidoComoEmSeparado.command.js";
import { MarcaPedidoComoEntregueCommand } from "../../../application/commands/pedidosCommands/marcaPedidoComoEntregue/marca-PedidoComoEntregue.command.js";
import { MarcaPedidoComoEnviadoCommand } from "../../../application/commands/pedidosCommands/marcaPedidoComoEnviado/marca-PedidoComoEnviado.command.js";
import { RemoverItemDoPedidoCommand } from "../../../application/commands/pedidosCommands/removerItemDoPedido/remover-ItemDoPedido.command.js";
import { EnderecoEntrega } from "../../../domain/pedido/value-object/endereco-entrega.js";
import type { CriarPedidoRequest } from "./criar-pedido.request.js";
import type {
  AdicionarItemParams,
  AdicionarItemRequest,
} from "./adicionar-item.request.js";
import type {
  IniciarPagamentoParams,
  IniciarPagamentoRequest,
} from "./iniciar-pagamento.request.js";
import { IniciarPagamentoCommand } from "../../../application/commands/pedidosCommands/iniciarPagamento/iniciar-pagamento.command.js";
import { MetodoPagamento } from "../../../domain/pedido/enums/metodo-pagamento.js";
import type {
  ConfirmarPagamentoParams,
  ConfirmarPagamentoRequest,
} from "./confirmar-pagamento.request.js";
import type { PedidoIdParams } from "./alterar-status-pedido.request.js";
import type {
  AtualizarEnderecoEntregaParams,
  AtualizarEnderecoEntregaRequest,
} from "./atualizar-endereco-entrega.request.js";
import type { CancelarPedidoRequest } from "./cancelar-pedido.request.js";
import type { RemoverItemParams } from "./remover-item.request.js";

export function pedidoRouter(container: ReturnType<typeof criarContainer>) {
  const router = Router();

  router.get("/fake-ids", (req, res) => {
    res.json({
      clientes: [
        {
          clienteId: 1,
          enderecos: [
            {
              enderecoId: 1,
              descricao: "Avenida Paulista, 1578 - Bela Vista, São Paulo",
            },
            {
              enderecoId: 2,
              descricao: "Rua 10, 200 - Centro, Goiânia",
            },
          ],
        },
      ],

      produtos: [
        {
          produtoId: 1,
          descricao: "Notebook Gamer RTX 4060 - R$ 8.500,00",
        },
        {
          produtoId: 2,
          descricao: "Mouse Sem Fio Logitech MX Master - R$ 450,00",
        },
        {
          produtoId: 3,
          descricao: "Teclado Mecânico Keychron K8 - R$ 680,00",
        },
        {
          produtoId: 4,
          descricao: "Monitor Ultrawide 34 Polegadas - R$ 3.200,00",
        },
      ],
    });
  });

  router.get("/", async (req, res) => {
    const pedidos = await container.repositories.pedidoRepository.listarTodos();
    const resultado = pedidos.map((p) => ({
      id: p.id,
      numeroPedido: p.numeroPedido,
      clienteId: p.parceiroId,
      valorTotal: p.total(),
      status: p.getStatusPedido().toString(),
      dataCriacao: p.dataCriacao,
      totalItens: p.getItens().length,
    }));
    return res.status(200).json(resultado);
  });

  router.get("/:id", async (req, res) => {
    const pedidoId = Number(req.params.id);

    const pedido =
      await container.repositories.pedidoRepository.obterPorId(pedidoId);

    if (!pedido) {
      return res.sendStatus(404);
    }

    const resultado = {
      id: pedido.id,
      numeroPedido: pedido.numeroPedido,
      clienteId: pedido.parceiroId,
      valorTotal: pedido.total(),
      status: pedido.getStatusPedido().toString(),
      dataCriacao: pedido.dataCriacao,
      dataAtualizacao: pedido.getDataAtualizacao,

      endereco: {
        logradouro: pedido.getEnderecoEntrega.logradouro,
        numero: pedido.getEnderecoEntrega.numero,
        bairro: pedido.getEnderecoEntrega.bairro,
        cidade: pedido.getEnderecoEntrega.cidade,
        uf: pedido.getEnderecoEntrega.uf,
        cep: pedido.getEnderecoEntrega.cep,
        pais: pedido.getEnderecoEntrega.pais,
        complemento: pedido.getEnderecoEntrega.complemento,
      },

      itens: pedido.getItens().map((i) => ({
        produtoId: i.produtoId,
        nomeProduto: i.nome,
        precoUnitario: i.valorUnitario,
        quantidade: i.quantidade,
        valorTotal: i.calcularTotal(),
      })),

      pagamento: pedido.getPagamento(),
    };
    return res.status(200).json(resultado);
  });

  router.post("/", async (req: Request<{}, {}, CriarPedidoRequest>, res) => {
    try {
      const command = new CriarPedidoCommand(
        req.body.clienteId,
        req.body.enderecoId,
      );

      const resultado =
        await container.handlers.criarPedidoHandler.executar(command);

      return res
        .status(201)
        .location(`/pedidos/${resultado.pedidoId}`)
        .json(resultado);
    } catch (error) {
      if (error instanceof DomainException) {
        return res.status(422).json({
          erro: error.message,
        });
      }
      if (error instanceof Error) {
        return res.status(404).json({
          erro: error.message,
        });
      }
      return res.status(500).json({
        erro: "erro interno",
      });
    }
  });

  router.post(
    "/:id/itens",
    async (
      req: Request<AdicionarItemParams, {}, AdicionarItemRequest>,
      res: Response,
    ) => {
      try {
        const command = new AdicionarItemAoPedidoCommand(
          Number(req.params.id),
          req.body.produtoId,
          req.body.quantidade,
        );

        const resultado =
          await container.handlers.adicionarItemHandler.executar(command);
        return res
          .status(201)
          .location(`/pedidos/${resultado.pedidoId}`)
          .json(resultado);
      } catch (error) {
        if (error instanceof DomainException) {
          return res.status(422).json({
            erro: error.message,
          });
        }
        if (error instanceof Error) {
          return res.status(404).json({
            erro: error.message,
          });
        }
        return res.status(500).json({
          erro: "erro interno",
        });
      }
    },
  );

  router.post(
    "/:id/pagamento",
    async (
      req: Request<IniciarPagamentoParams, {}, IniciarPagamentoRequest>,
      res,
    ) => {
      try {
        console.log(req.params.id);
        const metado = req.body.metodoPagamento as MetodoPagamento;
        const command = new IniciarPagamentoCommand(
          Number(req.params.id),
          metado,
        );

        const resultado =
          await container.handlers.iniciarPagamentoHandler.executar(command);
        return res.status(200).json(resultado);
      } catch (error) {
        if (error instanceof DomainException) {
          return res.status(422).json({
            erro: error.message,
          });
        }
        if (error instanceof Error) {
          return res.status(404).json({
            erro: error.message,
          });
        }
        return res.status(500).json({
          erro: "erro interno",
        });
      }
    },
  );
  router.post(
    "/:id/pagamento/confirmar",
    async (
      req: Request<ConfirmarPagamentoParams, {}, ConfirmarPagamentoRequest>,
      res: Response,
    ) => {
      try {
        const command = new ConfirmarPagamentoCommand(
          Number(req.params.id),
          req.body.pagamentoId,
        );

        const resultado =
          await container.handlers.confirmarPagamentoHandler.executar(command);

        return res.status(200).json(resultado);
      } catch (error) {
        if (error instanceof DomainException) {
          return res.status(422).json({
            erro: error.message,
          });
        }
        if (error instanceof Error) {
          return res.status(404).json({
            erro: error.message,
          });
        }
        return res.status(500).json({
          erro: "erro interno",
        });
      }
    },
  );

  router.patch(
    "/:id/endereco-entrega",
    async (
      req: Request<
        AtualizarEnderecoEntregaParams,
        {},
        AtualizarEnderecoEntregaRequest
      >,
      res: Response,
    ) => {
      try {
        const enderecoEntrega = EnderecoEntrega.criar(
          req.body.cep,
          req.body.logradouro,
          req.body.bairro,
          req.body.complemento,
          req.body.uf,
          req.body.cidade,
          req.body.pais,
          req.body.numero,
        );
        const command = new AtualizarEnderecoEntregaDoPedidoCommand(
          Number(req.params.id),
          enderecoEntrega,
        );

        const resultado =
          await container.handlers.atualizarEnderecoEntregaHandler.executar(
            command,
          );

        return res.status(200).json(resultado);
      } catch (error) {
        if (error instanceof DomainException) {
          return res.status(422).json({
            erro: error.message,
          });
        }
        if (error instanceof Error) {
          return res.status(404).json({
            erro: error.message,
          });
        }
        return res.status(500).json({
          erro: "erro interno",
        });
      }
    },
  );

  router.delete(
    "/:id/itens/:itemId",
    async (req: Request<RemoverItemParams>, res: Response) => {
      try {
        const command = new RemoverItemDoPedidoCommand(
          Number(req.params.id),
          Number(req.params.itemId),
        );

        const resultado =
          await container.handlers.removerItemHandler.executar(command);

        return res.status(200).json(resultado);
      } catch (error) {
        if (error instanceof DomainException) {
          return res.status(422).json({
            erro: error.message,
          });
        }
        if (error instanceof Error) {
          return res.status(404).json({
            erro: error.message,
          });
        }
        return res.status(500).json({
          erro: "erro interno",
        });
      }
    },
  );

  router.post(
    "/:id/cancelar",
    async (
      req: Request<PedidoIdParams, {}, CancelarPedidoRequest>,
      res: Response,
    ) => {
      try {
        const command = new CancelarPedidoCommand(
          Number(req.params.id),
          Number(req.body.codigoMotivo),
        );

        const resultado =
          await container.handlers.cancelarPedidoHandler.executar(command);

        return res.status(200).json(resultado);
      } catch (error) {
        if (error instanceof DomainException) {
          return res.status(422).json({
            erro: error.message,
          });
        }
        if (error instanceof Error) {
          return res.status(404).json({
            erro: error.message,
          });
        }
        return res.status(500).json({
          erro: "erro interno",
        });
      }
    },
  );

  router.post("/:id/separar", async (req: Request<PedidoIdParams>, res) => {
    try {
      const command = new MarcaPedidoEmSeparacaoCommand(Number(req.params.id));

      const resultado =
        await container.handlers.marcarPedidoEmSeparacaoHandler.executar(
          command,
        );

      return res.status(200).json(resultado);
    } catch (error) {
      if (error instanceof DomainException) {
        return res.status(422).json({
          erro: error.message,
        });
      }
      if (error instanceof Error) {
        return res.status(404).json({
          erro: error.message,
        });
      }
      return res.status(500).json({
        erro: "erro interno",
      });
    }
  });

  router.post("/:id/enviar", async (req: Request<PedidoIdParams>, res) => {
    try {
      const command = new MarcaPedidoComoEnviadoCommand(Number(req.params.id));

      const resultado =
        await container.handlers.marcarPedidoComoEnviadoHandler.executar(
          command,
        );

      return res.status(200).json(resultado);
    } catch (error) {
      if (error instanceof DomainException) {
        return res.status(422).json({
          erro: error.message,
        });
      }
      if (error instanceof Error) {
        return res.status(404).json({
          erro: error.message,
        });
      }
      return res.status(500).json({
        erro: "erro interno",
      });
    }
  });

  router.post("/:id/entregar", async (req: Request<PedidoIdParams>, res) => {
    try {
      const command = new MarcaPedidoComoEntregueCommand(Number(req.params.id));

      const resultado =
        await container.handlers.marcarPedidoComoEntregueHandler.executar(
          command,
        );

      return res.status(200).json(resultado);
    } catch (error) {
      if (error instanceof DomainException) {
        return res.status(422).json({
          erro: error.message,
        });
      }
      if (error instanceof Error) {
        return res.status(404).json({
          erro: error.message,
        });
      }
      return res.status(500).json({
        erro: "erro interno",
      });
    }
  });
  return router;
}
