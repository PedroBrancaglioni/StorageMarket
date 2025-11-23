import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import localArmazenamento from "../Modelos/localArmazenamento.model";

const repository = AppDataSource.getRepository(localArmazenamento);



export async function createLocalArmazenamento(req: Request, res: Response) {
    try {
        const data = req.body;

        const local = repository.create(data);
        const saved = await repository.save(local);

        return res.status(201).json(saved);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar local de armazenamento." });
    }
}


export async function getLocais(req: Request, res: Response) {
    try {
        const locais = await repository.find();
        return res.status(200).json(locais);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar locais de armazenamento." });
    }
}


export async function getLocalByCorredor(req: Request, res: Response) {
    try {
        const corredor = Number(req.params.corredor);

        if (!corredor) {
            return res.status(400).json({ error: "Corredor inválido." });
        }

        const local = await repository.findOneBy({ corredor });

        if (!local) {
            return res.status(404).json({ error: "Local não encontrado." });
        }

        return res.status(200).json(local);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar local." });
    }
}


export async function updateLocal(req: Request, res: Response) {
    try {
        const corredor = Number(req.params.corredor);
        const data = req.body;

        const local = await repository.findOneBy({ corredor });

        if (!local) {
            return res.status(404).json({ error: "Local não encontrado." });
        }

        Object.assign(local, data);

        const updated = await repository.save(local);

        return res.status(200).json(updated);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar local." });
    }
}


export async function deleteLocal(req: Request, res: Response) {
    try {
        const corredor = Number(req.params.corredor);

        const local = await repository.findOneBy({ corredor });

        if (!local) {
            return res.status(404).json({ error: "Local não encontrado." });
        }

        local.fechado = true;

        await repository.save(local);

        return res.status(200).json({ message: "Local marcado como fechado (soft delete)." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao remover local." });
    }
}

export default {
    createLocalArmazenamento,
    getLocais,
    getLocalByCorredor,
    updateLocal,
    deleteLocal
}