import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


declare global {
    namespace Express {
        interface Request {
            user?: { cpf: number; nome: string };
        }
    }
}

export function verificarToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: "Acesso negado. Nenhum token fornecido." });
    }

    try {;
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("A chave secreta JWT não foi definida no .env");
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded as { cpf: number; nome: string };

        next();

    } catch (error) {
        console.error("Erro na verificação do token:", error);
        return res.status(401).json({ error: "Token inválido ou expirado." });
    }
}