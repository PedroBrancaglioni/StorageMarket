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
 *         - cpf
 *         - nome
 *       properties:
 *         cpf:
 *           type: string
 *           description: CPF do usuário
 *           example: "99999999999"
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *           example: "Pedro"

 *     LoginResponse:
 *       type: object
 *       properties:
 *         cpf:
 *           type: string
 *           description: CPF do usuário autenticado
 *           example: "99999999999"
 *         nome:
 *           type: string
 *           description: Nome do usuário autenticado
 *           example: "Pedro"
 *         message:
 *           type: string
 *           example: "Login realizado com sucesso"
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
 *                   example: "CPF e Nome são obrigatórios"
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CPF ou Nome incorretos"
 *       500:
 *         description: Erro interno do servidor
 */