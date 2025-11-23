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
 *         - email
 *       properties:
 *         cpf:
 *           type: string
 *           description: CPF do funcionário
 *           example: "12345678901"
 *         nome:
 *           type: string
 *           description: Nome completo do funcionário
 *           example: "João Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do funcionário
 *           example: "joao@email.com"
 *         telefone:
 *           type: string
 *           description: Telefone do funcionário
 *           example: "(11) 99999-9999"
 *         cargo:
 *           type: string
 *           description: Cargo do funcionário
 *           example: "Vendedor"
 */

/**
 * @swagger
 * /funcionarios/{cpf}:
 *   get:
 *     summary: Busca funcionário por CPF
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
 *       500:
 *         description: Erro interno do servidor
 *   post:
 *     summary: Cria um novo funcionário
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
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /funcionarios/{cpf}:
 *   put:
 *     summary: Atualiza um funcionário existente
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
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Remove um funcionário
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
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */