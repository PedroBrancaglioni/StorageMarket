import express, { Request, Response } from "express"
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import router from "./Rotas/patient.route";
import userRouter from "./Rotas/user.route";
import authRouter from "./Rotas/auth.route";
import logger from "./middlewares/logger.middleware";

const app = express();
app.use(express.json());
app.use(logger.consoleLoggerMiddleware);

//Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Storage Market API',
      version: '1.0.0',
      description: 'API para marketplace de armazenamento',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: [
    './src/swagger.schemas.ts',
    './src/Rotas/*.ts'
  ],
};

const spec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

app.use("/v1/patient",router);
app.use("/v1/users", userRouter);
app.use("/v1/auth", authRouter);

app.get("/",(req: Request, res: Response) => {
    res.send("This is the root route!");
});

app.use((req: Request, res: Response) => {
    res.send("API is running...nothing here!");
});

export default app;