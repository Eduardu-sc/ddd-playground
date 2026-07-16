import express from "express";
import { pedidoRouter } from "./endpoints/pedidos/pedidos-endpoints.js";
import { criarContainer } from "../infrastructure/fakes/fake-infrastructure-extensions.js";
import { configurarSwagger } from "./swagger.js";
import { AppDatabase } from "../infrastructure/persistence/config/database.js";

const app = express();
AppDatabase.conectar();
AppDatabase.executarMigrations();

const container = criarContainer();
app.use(express.json());
configurarSwagger(app);
app.use("/pedidos", pedidoRouter(container));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`API disponível em http://localhost:${port}`);
  console.log(`Swagger disponível em http://localhost:${port}/docs`);
});
