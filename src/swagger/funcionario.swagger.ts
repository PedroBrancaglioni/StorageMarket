/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: Gerenciamento de funcionários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Funcionario:
 *       type: object
 *       required:
 *         - cpf
 *         - nome
 *         - cargo
 *         - dtNascimento
 *       properties:
 *         cpf:
 *           type: integer
 *           description: CPF do funcionário
 *           example: 89999999999
 *         nome:
 *           type: string
 *           description: Nome completo do funcionário
 *           example: "João da Silva"
 *         cargo:
 *           type: string
 *           description: Cargo do funcionário
 *           example: "Repositor"
 *         dtNascimento:
 *           type: integer
 *           description: Data de nascimento no formato YYYYMMDD
 *           example: 20051202
 */

/**
 * @swagger
 * /funcionarios/{cpf}:
 *   get:
 *     summary: Busca funcionário por CPF
 *     security:
 *       - bearerAuth: []
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         description: CPF do funcionário
 *         schema:
 *           type: string
 *           example: "12345678901"
 *     responses:
 *       200:
 *         description: Funcionário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       401:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Lista todos os funcionários
 *     security:
 *       - bearerAuth: []
 *     tags: [Funcionários]
 *     responses:
 *       200:
 *         description: Lista de funcionários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Funcionario'
 *       401:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 *       500:
 *         description: Erro interno do servidor
 *   post:
 *     summary: Cria um novo funcionário
 *     security:
 *       - bearerAuth: []
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /funcionarios/{cpf}:
 *   put:
 *     summary: Atualiza um funcionário existente
 *     security:
 *       - bearerAuth: []
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         description: CPF do funcionário a ser atualizado
 *         schema:
 *           type: string
 *           example: "12345678901"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Remove um funcionário
 *     security:
 *       - bearerAuth: []
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         description: CPF do funcionário a ser removido
 *         schema:
 *           type: string
 *           example: "12345678901"
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */