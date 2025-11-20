import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import funcionario  from "../Modelos/funcionario.model";

const repository = AppDataSource.getRepository(funcionario);

async function createFuncionario(req: Request, res: Response) {
    try {
        const { cpf, nome, cargo, dtNascimento } = req.body;

        if (!cpf || !nome || !cargo || !dtNascimento) {
            return res.status(400).json({ error: "CPF, nome, cargo e data de nascimento são obrigatórios." });
        }

        const existingFunc = await repository.findOneBy({ cpf: cpf });
        if (existingFunc) {
            return res.status(409).json({ error: "Já existe um funcionário com este CPF." });
        }

        const func = repository.create({ cpf: cpf, nome, cargo, dtNascimento: new Date(dtNascimento) });
        const saved = await repository.save(func);


        return res.status(201).json(saved);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar."});
    }
}


async function getFuncionarios(req: Request, res: Response) {
    try {
        const funcionarios = await repository.find();
        return res.status(200).json(funcionarios);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar funcionários." });
    }
}


async function getFuncionarioByCPF(req: Request, res: Response) {
    try {
        const cpf = req.params.cpf;

        if (!cpf) {
            return res.status(400).json({ error: "CPF inválido." });
        }

        const funcionario = await repository.findOneBy({ cpf });

        if (!funcionario) {
            return res.status(404).json({ error: "Funcionário não encontrado." });
        }

        return res.status(200).json(funcionario);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar funcionário." });
    }
}

async function updateFuncionario(req: Request, res: Response) {
    try {
        const cpf = req.params.cpf;
        const data = req.body;

        if (!cpf) {
            return res.status(400).json({ error: "CPF inválido." });
        }

        const funcionario = await repository.findOneBy({ cpf });

        if (!funcionario) {
            return res.status(404).json({ error: "Funcionário não encontrado." });
        }

        // Atualiza campos
        Object.assign(funcionario, data);
        funcionario.dtAtualizado = new Date();

        const updated = await repository.save(funcionario);

        return res.status(200).json(updated);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar funcionário." });
    }
}


async function deleteFuncionario(req: Request, res: Response) {
    try {
        const cpf = req.params.cpf;

        if (!cpf) {
            return res.status(400).json({ error: "CPF inválido." });
        }

        const funcionario = await repository.findOneBy({ cpf });

        if (!funcionario) {
            return res.status(404).json({ error: "Funcionário não encontrado." });
        }

        funcionario.dtRemocao = new Date();

        await repository.save(funcionario);

        return res.status(200).json({ message: "Funcionário removido (soft delete)." });

    } catch (error) {
        return res.status(500).json({ error: "Erro ao remover funcionário." });
    }
}


export default {
    getFuncionarioByCPF,
    getFuncionarios,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario
}
