import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import produto from "../Modelos/produto.model";

const repository = AppDataSource.getRepository(produto);

export async function createProduto(req: Request, res: Response) {
    try {
        const data = req.body;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: "Corpo da requisição não pode estar vazio." });
        }

        const produto = repository.create(data);
        const saved = await repository.save(produto);

        return res.status(201).json(saved);

    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return res.status(500).json({ error: error });
    }
}

export async function getProdutos(req: Request, res: Response) {
    try {
        const produtos = await repository.find();
        return res.status(200).json(produtos);

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return res.status(500).json({ error: "Erro ao buscar produtos." });
    }
}


export async function getProdutoById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (!id) {
            return res.status(400).json({ error: "ID inválido." });
        }

        const produto = await repository.findOneBy({ id });

        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        return res.status(200).json(produto);

    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        return res.status(500).json({ error: "Erro ao buscar produto." });
    }
}


export async function updateProduto(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body;

        const produto = await repository.findOneBy({ id });

        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        Object.assign(produto, data);
        produto.dtAtualizado = new Date();

        const updated = await repository.save(produto);

        return res.status(200).json(updated);

    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return res.status(500).json({ error: "Erro ao atualizar produto." });
    }
}


export async function deleteProduto(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        const produto = await repository.findOneBy({ id });

        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        produto.dtRemocao = new Date();

        await repository.save(produto);

        return res.status(200).json({ message: "Produto removido (soft delete)." });

    } catch (error) {
        console.error("Erro ao remover produto:", error);
        return res.status(500).json({ error: "Erro ao remover produto." });
    }
}

export default {
    createProduto,
    getProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
}