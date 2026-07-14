import express from "express";
import { pedidoRouter } from "./endpoints/pedidos/pedidos-endpoints.js";
import { criarContainer } from "../infrastructure/fakes/fake-infrastructure-extensions.js";

const app = express();
const container = criarContainer();
app.use(express.json());
app.use("/pedidos", pedidoRouter(container));
app.listen(3000);
