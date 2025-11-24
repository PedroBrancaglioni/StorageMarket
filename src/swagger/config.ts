import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Storage Market API',
      version: '1.0.0',
      description: 'API para gerenciamento de mercado de armazenamento',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/swagger/*.swagger.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);