/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de autenticação e autorização
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "usuario@email.com"
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: "senha123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT para autenticação
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "12345678901"
 *             nome:
 *               type: string
 *               example: "João Silva"
 *             email:
 *               type: string
 *               example: "joao@email.com"
 *         message:
 *           type: string
 *           example: "Login realizado com sucesso"
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - cpf
 *         - nome
 *         - email
 *         - password
 *       properties:
 *         cpf:
 *           type: string
 *           description: CPF do usuário
 *           example: "12345678901"
 *         nome:
 *           type: string
 *           description: Nome completo do usuário
 *           example: "João Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "joao@email.com"
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: "senha123"
 *         telefone:
 *           type: string
 *           description: Telefone do usuário
 *           example: "(11) 99999-9999"
 *         cargo:
 *           type: string
 *           description: Cargo do funcionário
 *           example: "Vendedor"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email e senha são obrigatórios"
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email ou senha incorretos"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário registrado com sucesso"
 *                 user:
 *                   type: object
 *                   properties:
 *                     cpf:
 *                       type: string
 *                       example: "12345678901"
 *                     nome:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "joao@email.com"
 *       400:
 *         description: Dados inválidos ou usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário já existe com este CPF/email"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna informações do usuário logado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     cpf:
 *                       type: string
 *                       example: "12345678901"
 *                     nome:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "joao@email.com"
 *                     cargo:
 *                       type: string
 *                       example: "Vendedor"
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token não fornecido"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Realiza logout do usuário
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout realizado com sucesso"
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */