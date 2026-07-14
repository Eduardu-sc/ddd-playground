import { Router } from "express";
import type { criarContainer } from "../../../infrastructure/fakes/fake-infrastructure-extensions.js";
import { CriarPedidoCommand } from "../../../application/commands/pedidosCommands/criarPedido/criar-pedido.command.js";
import { DomainException } from "../../../domain/common/exceptions/domain-exception.js";
import { AdicionarItemAoPedidoCommand } from "../../../application/commands/pedidosCommands/adicionarItemAoPedido/adicionar-itemAoPedido.command.js";

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
        produtoId: i.id,
        nomeProduto: i.nome,
        precoUnitario: i.valorUnitario,
        quantidade: i.quantidade,
        valorTotal: i.calcularTotal(),
      })),

      pagamento: pedido.getPagamento(),
    };
    return res.status(200).json(resultado);
  });

  router.post("/", async (req, res) => {
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

  router.post("/:id/itens", async (req, res) => {
    try {
      console.log("passou aqui");
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
  });
  return router;
}
