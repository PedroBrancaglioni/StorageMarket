import express, { Request, Response } from "express";
import funcionarioRouter from "./Rotas/funcionario.route";
import localArmazenamentoRouter from "./Rotas/localArmazenamento.route";
import produtoRouter from "./Rotas/produto.route";
import authRouter from "./Rotas/auth.route";
import logger from "./middlewares/registro.middleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/config';

const app = express();
app.use(express.json());
app.use(logger.logDeRegistro);

// Swagger ANTES das rotas de API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Storage Market API Docs'
}));

app.use("/v1/funcionarios",funcionarioRouter);
app.use("/v1/locais", localArmazenamentoRouter);
app.use("/v1/produtos", produtoRouter);
app.use("/v1/auth", authRouter);

app.get("/",(req: Request, res: Response) => {
    res.send("Rota padrão");
});

app.use((req: Request, res: Response) => {
    res.send("API ta funcionando parceiro");
});

export default app;