/**
 * @swagger
 * tags:
 *   name: Local de Armazenamento
 *   description: Gerenciamento de locais de armazenamento
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LocalArmazenamento:
 *       type: object
 *       required:
 *         - corredor
 *         - capacidade
 *       properties:
 *         corredor:
 *           type: string
 *           description: Identificador do corredor
 *           example: "A1"
 *         prateleira:
 *           type: string
 *           description: Número da prateleira
 *           example: "P01"
 *         capacidade:
 *           type: integer
 *           description: Capacidade máxima do local
 *           example: 100
 *         ocupado:
 *           type: integer
 *           description: Quantidade ocupada
 *           example: 75
 *         disponivel:
 *           type: boolean
 *           description: Se o local está disponível
 *           example: true
 *         descricao:
 *           type: string
 *           description: Descrição do local
 *           example: "Local para produtos eletrônicos"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /local-armazenamento/{corredor}:
 *   get:
 *     summary: Busca local de armazenamento por corredor
 *     tags: [Local de Armazenamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: corredor
 *         required: true
 *         description: Identificador do corredor
 *         schema:
 *           type: string
 *           example: "A1"
 *     responses:
 *       200:
 *         description: Local encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocalArmazenamento'
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Local não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /local-armazenamento:
 *   get:
 *     summary: Lista todos os locais de armazenamento
 *     tags: [Local de Armazenamento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de locais retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocalArmazenamento'
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 *   post:
 *     summary: Cria um novo local de armazenamento
 *     tags: [Local de Armazenamento]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocalArmazenamento'
 *     responses:
 *       201:
 *         description: Local criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocalArmazenamento'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /local-armazenamento/{corredor}:
 *   put:
 *     summary: Atualiza um local de armazenamento existente
 *     tags: [Local de Armazenamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: corredor
 *         required: true
 *         description: Identificador do corredor a ser atualizado
 *         schema:
 *           type: string
 *           example: "A1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocalArmazenamento'
 *     responses:
 *       200:
 *         description: Local atualizado com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Local não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Remove um local de armazenamento
 *     tags: [Local de Armazenamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: corredor
 *         required: true
 *         description: Identificador do corredor a ser removido
 *         schema:
 *           type: string
 *           example: "A1"
 *     responses:
 *       200:
 *         description: Local removido com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Local não encontrado
 *       500:
 *         description: Erro interno do servidor
 */