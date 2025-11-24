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
 *         - fechado
 *       properties:
 *         corredor:
 *           type: integer
 *           description: Número do corredor
 *           example: 2
 *         descricao:
 *           type: string
 *           description: Descrição do local
 *           example: "Corredor de eletrônicos"
 *         capacidade:
 *           type: integer
 *           description: Capacidade máxima do local
 *           example: 300
 *         fechado:
 *           type: boolean
 *           description: Indica se o local está fechado
 *           example: false
 */

/**
 * @swagger
 * /locais/{corredor}:
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
 *         description: Local não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /locais:
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
 * /locais/{corredor}:
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
 *         description: Local não encontrado
 *       500:
 *         description: Erro interno do servidor
 */