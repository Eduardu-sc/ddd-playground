import type { Express } from "express";
import swaggerUi from "swagger-ui-express";

export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "DDD Playground API",
    version: "1.0.0",
    description: "API para gerenciamento do ciclo de vida de pedidos.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Ambiente local",
    },
  ],
  tags: [{ name: "Pedidos", description: "Operações relacionadas a pedidos" }],
  paths: {
    "/pedidos/fake-ids": {
      get: {
        tags: ["Pedidos"],
        summary: "Lista IDs disponíveis para testes",
        operationId: "listarIdsFake",
        responses: {
          200: {
            description: "Clientes, endereços e produtos disponíveis",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FakeIdsResponse" },
              },
            },
          },
        },
      },
    },
    "/pedidos": {
      get: {
        tags: ["Pedidos"],
        summary: "Lista todos os pedidos",
        operationId: "listarPedidos",
        responses: {
          200: {
            description: "Lista de pedidos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/PedidoResumo" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Pedidos"],
        summary: "Cria um pedido",
        operationId: "criarPedido",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CriarPedidoRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "Pedido criado",
            headers: {
              Location: {
                description: "URL do pedido criado",
                schema: { type: "string", example: "/pedidos/1" },
              },
            },
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CriarPedidoResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
    "/pedidos/{id}": {
      get: {
        tags: ["Pedidos"],
        summary: "Obtém um pedido pelo ID",
        operationId: "obterPedido",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        responses: {
          200: {
            description: "Detalhes do pedido",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PedidoDetalhado" },
              },
            },
          },
          404: { description: "Pedido não encontrado" },
        },
      },
    },
    "/pedidos/{id}/endereco-entrega": {
      patch: {
        tags: ["Pedidos"],
        summary: "Atualiza o endereco de entrega do pedido",
        operationId: "atualizarEnderecoEntregaDoPedido",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Endereco" },
            },
          },
        },
        responses: {
          200: {
            description: "Endereco atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/StatusPedidoResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
    "/pedidos/{id}/itens": {
      post: {
        tags: ["Pedidos"],
        summary: "Adiciona um item ao pedido",
        operationId: "adicionarItemAoPedido",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AdicionarItemRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "Item adicionado",
            headers: {
              Location: {
                description: "URL do pedido atualizado",
                schema: { type: "string", example: "/pedidos/1" },
              },
            },
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AdicionarItemResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
    "/pedidos/{id}/itens/{itemId}": {
      delete: {
        tags: ["Pedidos"],
        summary: "Remove um item do pedido",
        operationId: "removerItemDoPedido",
        parameters: [
          { $ref: "#/components/parameters/PedidoId" },
          { $ref: "#/components/parameters/ItemId" },
        ],
        responses: {
          200: {
            description: "Item removido",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RemoverItemResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
    "/pedidos/{id}/pagamento": {
      post: {
        tags: ["Pedidos"],
        summary: "Inicia o pagamento de um pedido",
        operationId: "iniciarPagamento",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/IniciarPagamentoRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Pagamento iniciado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/IniciarPagamentoResponse",
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
    "/pedidos/{id}/pagamento/comfirmar": {
      post: {
        tags: ["Pedidos"],
        summary: "Confirma o pagamento de um pedido",
        description:
          "A rota preserva a grafia `comfirmar` usada atualmente pela API.",
        operationId: "confirmarPagamento",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ConfirmarPagamentoRequest",
              },
            },
          },
        },
        responses: {
          200: { description: "Pagamento confirmado" },
          404: { $ref: "#/components/responses/NaoEncontrado" },
        },
      },
    },
    "/pedidos/{id}/cancelar": {
      post: {
        tags: ["Pedidos"],
        summary: "Cancela um pedido",
        operationId: "cancelarPedido",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CancelarPedidoRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Pedido cancelado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/StatusPedidoResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
    "/pedidos/{id}/separar": {
      post: {
        tags: ["Pedidos"],
        summary: "Marca o pedido como em separacao",
        operationId: "marcarPedidoComoEmSeparacao",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        responses: {
          200: {
            description: "Pedido marcado como em separacao",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/StatusPedidoResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
    "/pedidos/{id}/enviar": {
      post: {
        tags: ["Pedidos"],
        summary: "Marca o pedido como enviado",
        operationId: "marcarPedidoComoEnviado",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        responses: {
          200: {
            description: "Pedido marcado como enviado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/StatusPedidoResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
    "/pedidos/{id}/entregar": {
      post: {
        tags: ["Pedidos"],
        summary: "Marca o pedido como entregue",
        operationId: "marcarPedidoComoEntregue",
        parameters: [{ $ref: "#/components/parameters/PedidoId" }],
        responses: {
          200: {
            description: "Pedido marcado como entregue",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/StatusPedidoResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NaoEncontrado" },
          422: { $ref: "#/components/responses/RegraDeNegocio" },
          500: { $ref: "#/components/responses/ErroInterno" },
        },
      },
    },
  },
  components: {
    parameters: {
      PedidoId: {
        name: "id",
        in: "path",
        required: true,
        description: "ID do pedido",
        schema: { type: "integer", format: "int32", minimum: 1, example: 1 },
      },
      ItemId: {
        name: "itemId",
        in: "path",
        required: true,
        description: "ID do item do pedido",
        schema: { type: "integer", format: "int32", minimum: 1, example: 1 },
      },
    },
    responses: {
      NaoEncontrado: {
        description: "Recurso não encontrado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Erro" },
          },
        },
      },
      RegraDeNegocio: {
        description: "Regra de negócio violada",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Erro" },
          },
        },
      },
      ErroInterno: {
        description: "Erro interno do servidor",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Erro" },
          },
        },
      },
    },
    schemas: {
      Erro: {
        type: "object",
        required: ["erro"],
        properties: {
          erro: { type: "string", example: "Pedido não encontrado" },
        },
      },
      CriarPedidoRequest: {
        type: "object",
        required: ["clienteId", "enderecoId"],
        properties: {
          clienteId: { type: "integer", minimum: 1, example: 1 },
          enderecoId: { type: "integer", minimum: 1, example: 1 },
        },
      },
      AdicionarItemRequest: {
        type: "object",
        required: ["produtoId", "quantidade"],
        properties: {
          produtoId: { type: "integer", minimum: 1, example: 1 },
          quantidade: { type: "integer", minimum: 1, example: 2 },
        },
      },
      IniciarPagamentoRequest: {
        type: "object",
        required: ["metodoPagamento"],
        properties: {
          metodoPagamento: {
            type: "integer",
            enum: [0, 1, 2],
            example: 0,
            description: "0 = PIX, 1 = BOLETO, 2 = DINHEIRO",
          },
        },
      },
      ConfirmarPagamentoRequest: {
        type: "object",
        required: ["pagamentoId"],
        properties: {
          pagamentoId: { type: "integer", minimum: 1, example: 1 },
        },
      },
      CancelarPedidoRequest: {
        type: "object",
        required: ["codigoMotivo"],
        properties: {
          codigoMotivo: {
            type: "integer",
            enum: [1, 2, 3, 4, 5, 6, 7, 99],
            example: 1,
          },
        },
      },
      CriarPedidoResponse: {
        type: "object",
        required: [
          "pedidoId",
          "numeroPedido",
          "dataCriacao",
          "valorTotal",
          "status",
        ],
        properties: {
          pedidoId: { type: "integer", example: 1 },
          numeroPedido: { type: "string", example: "PED-000001" },
          dataCriacao: { type: "string", format: "date-time" },
          valorTotal: { type: "number", format: "double", example: 0 },
          status: { $ref: "#/components/schemas/StatusPedido" },
        },
      },
      AdicionarItemResponse: {
        type: "object",
        required: ["pedidoId", "valorTotal", "status"],
        properties: {
          pedidoId: { type: "integer", example: 1 },
          valorTotal: { type: "number", format: "double", example: 17000 },
          status: { $ref: "#/components/schemas/StatusPedido" },
        },
      },
      IniciarPagamentoResponse: {
        type: "object",
        required: [
          "pedidoId",
          "pagamentoId",
          "statusPedido",
          "statusPagamento",
        ],
        properties: {
          pedidoId: { type: "integer", example: 1 },
          pagamentoId: { type: "integer", example: 1 },
          statusPedido: { $ref: "#/components/schemas/StatusPedido" },
          statusPagamento: {
            type: "string",
            enum: ["PENDENTE", "APROVADO", "REJEITADO"],
            example: "PENDENTE",
          },
        },
      },
      StatusPedidoResponse: {
        type: "object",
        required: ["pedidoId", "statusPedido"],
        properties: {
          pedidoId: { type: "integer", example: 1 },
          statusPedido: { $ref: "#/components/schemas/StatusPedido" },
        },
      },
      RemoverItemResponse: {
        type: "object",
        required: ["pedidoId", "valorTotal", "pedidoStatus"],
        properties: {
          pedidoId: { type: "integer", example: 1 },
          valorTotal: { type: "number", format: "double", example: 8500 },
          pedidoStatus: { $ref: "#/components/schemas/StatusPedido" },
        },
      },
      PedidoResumo: {
        type: "object",
        required: [
          "id",
          "numeroPedido",
          "clienteId",
          "valorTotal",
          "status",
          "dataCriacao",
          "totalItens",
        ],
        properties: {
          id: { type: "integer", example: 1 },
          numeroPedido: { type: "string", example: "PED-000001" },
          clienteId: { type: "integer", example: 1 },
          valorTotal: { type: "number", format: "double", example: 17000 },
          status: { $ref: "#/components/schemas/StatusPedido" },
          dataCriacao: { type: "string", format: "date-time" },
          totalItens: { type: "integer", example: 2 },
        },
      },
      PedidoDetalhado: {
        allOf: [
          { $ref: "#/components/schemas/PedidoResumo" },
          {
            type: "object",
            required: ["endereco", "itens"],
            properties: {
              dataAtualizacao: {
                type: "string",
                format: "date-time",
                nullable: true,
              },
              endereco: { $ref: "#/components/schemas/Endereco" },
              itens: {
                type: "array",
                items: { $ref: "#/components/schemas/ItemPedido" },
              },
              pagamento: {
                type: "object",
                nullable: true,
                additionalProperties: true,
              },
            },
          },
        ],
      },
      Endereco: {
        type: "object",
        properties: {
          logradouro: { type: "string", example: "Avenida Paulista" },
          numero: { type: "string", example: "1578" },
          bairro: { type: "string", example: "Bela Vista" },
          cidade: { type: "string", example: "São Paulo" },
          uf: { type: "string", minLength: 2, maxLength: 2, example: "SP" },
          cep: { type: "string", example: "01310-200" },
          pais: { type: "string", example: "Brasil" },
          complemento: { type: "string", nullable: true },
        },
      },
      ItemPedido: {
        type: "object",
        properties: {
          produtoId: { type: "integer", example: 1 },
          nomeProduto: { type: "string", example: "Notebook Gamer RTX 4060" },
          precoUnitario: { type: "number", format: "double", example: 8500 },
          quantidade: { type: "integer", example: 2 },
          valorTotal: { type: "number", format: "double", example: 17000 },
        },
      },
      StatusPedido: {
        type: "string",
        enum: [
          "PENDENTE",
          "PAGAMENTOCONFIMADO",
          "EMSEPACAO",
          "ENVIADO",
          "ENTREGUE",
          "CANCELADO",
        ],
        example: "PENDENTE",
      },
      FakeIdsResponse: {
        type: "object",
        properties: {
          clientes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                clienteId: { type: "integer", example: 1 },
                enderecos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      enderecoId: { type: "integer", example: 1 },
                      descricao: { type: "string" },
                    },
                  },
                },
              },
            },
          },
          produtos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                produtoId: { type: "integer", example: 1 },
                descricao: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

export function configurarSwagger(app: Express): void {
  app.get("/docs-json", (_req, res) => res.json(openApiDocument));
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument, {
      customSiteTitle: "DDD Playground API - Swagger",
      swaggerOptions: { persistAuthorization: true },
    }),
  );
}
