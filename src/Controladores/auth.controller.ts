import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../datasource";
import funcionario from "../Modelos/funcionario.model";

dotenv.config();

const repository = AppDataSource.getRepository(funcionario);

export async function login(req: Request, res: Response) {
    try {
        const { cpf, nome } = req.body;

        // Validar entrada
        if (!cpf || !nome) {
            return res.status(400).json({ error: "CPF e nome são obrigatórios." });
        }

        // Buscar funcionário pelo CPF
        const func = await repository.findOneBy({ cpf: Number(cpf) });

        if (!func) {
            return res.status(401).json({ error: "Funcionário não encontrado." });
        }

        // Validar nome
        if (func.nome !== nome) {
            return res.status(401).json({ error: "Nome inválido." });
        }

        // Criar token JWT
        const token = jwt.sign(
            {
                cpf: func.cpf,
                nome: func.nome
            },
            String(process.env.JWT_SECRET),
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
            funcionario: func
        });

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro interno no login." });
    }
}

export default { login };
