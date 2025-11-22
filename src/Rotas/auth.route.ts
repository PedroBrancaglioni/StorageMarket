import express from "express"
import authController from "../Controladores/auth.controller"

const route = express.Router();

/**
 * @swagger
 * /v1/auth/login:
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
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Dados de entrada inválidos
 */

route.post("/login",authController.login);

export default route;