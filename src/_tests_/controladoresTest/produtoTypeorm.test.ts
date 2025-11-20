import { describe, it, expect, afterEach, jest } from '@jest/globals';
import { Response, Request } from "express";
import produto from "../../Modelos/produto.model";

// Mock do repositório
const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn()
}

// Mock do datasource
jest.mock('../../datasource', () => ({
    AppDataSource: {
        getRepository: jest.fn(() => mockRepository)
    }
}));

// Importa o controller DEPOIS do mock
import {
    createProduto,
    getProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
} from "../../Controladores/produtoTypeorm.controller";

// Helper para mockar Request e Response
const mockRequestResponse = (reqOverrides: Partial<Request> = {}) => {
    const req: Partial<Request> = {
        params: {},
        body: {},
        ...reqOverrides
    }

    const res: Partial<Response> = {
        status: jest.fn(() => res as Response),
        json: jest.fn(() => res as Response),
        send: jest.fn(() => res as Response)
    }

    return { req: req as Request, res: res as Response };
};

describe('Produto Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createProduto', () => {
        it('deve criar um novo produto e retornar status 201', async () => {
            const novoProduto = { 
                nome: 'Produto Teste', 
                preco: 99.99, 
                qtdEstoque: 50, 
                tipo: 'Eletrônico'
            };
            const produtoSalvo = { 
                id: 1, 
                ...novoProduto, 
                dtInsercao: new Date(), 
                dtAtualizado: new Date() 
            };

            (mockRepository as any).create.mockReturnValue(novoProduto);
            (mockRepository as any).save.mockResolvedValue(produtoSalvo);

            const { req, res } = mockRequestResponse({ body: novoProduto });

            await createProduto(req, res);

            expect(mockRepository.create).toHaveBeenCalledWith(novoProduto);
            expect(mockRepository.save).toHaveBeenCalledWith(novoProduto);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(produtoSalvo);
        });

        it('deve retornar status 400 se o corpo da requisição estiver vazio', async () => {
            const { req, res } = mockRequestResponse({ body: {} });

            await createProduto(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Corpo da requisição não pode estar vazio." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const novoProduto = { 
                nome: 'Produto Teste', 
                preco: 99.99, 
                qtdEstoque: 50 
            };

            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ body: novoProduto });

            await createProduto(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar produto." });
        });
    });

    describe('getProdutos', () => {
        it('deve retornar uma lista de produtos e status 200', async () => {
            const produtos = [
                { 
                    id: 1, 
                    nome: 'Produto A', 
                    preco: 99.99, 
                    qtdEstoque: 50, 
                    tipo: 'Eletrônico',
                    dtInsercao: new Date(),
                    dtAtualizado: new Date()
                },
                { 
                    id: 2, 
                    nome: 'Produto B', 
                    preco: 49.99, 
                    qtdEstoque: 100, 
                    tipo: 'Vestuário',
                    dtInsercao: new Date(),
                    dtAtualizado: new Date()
                },
            ];

            (mockRepository as any).find.mockResolvedValue(produtos);

            const { req, res } = mockRequestResponse();

            await getProdutos(req, res);

            expect(mockRepository.find).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(produtos);
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            (mockRepository as any).find.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse();

            await getProdutos(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar produtos." });
        });
    });

    describe('getProdutoById', () => {
        it('deve retornar um produto específico e status 200', async () => {
            const produto = { 
                id: 1, 
                nome: 'Produto A', 
                preco: 99.99, 
                qtdEstoque: 50, 
                tipo: 'Eletrônico',
                dtInsercao: new Date(),
                dtAtualizado: new Date()
            };

            (mockRepository as any).findOneBy.mockResolvedValue(produto);

            const { req, res } = mockRequestResponse({ params: { id: '1' } });

            await getProdutoById(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(produto);
        });

        it('deve retornar status 400 se o ID for inválido', async () => {
            const { req, res } = mockRequestResponse({ params: { id: 'abc' } });

            await getProdutoById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "ID inválido." });
        });

        it('deve retornar status 404 se o produto não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { id: '999' } });

            await getProdutoById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Produto não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            (mockRepository as any).findOneBy.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ params: { id: '1' } });

            await getProdutoById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar produto." });
        });
    });

    describe('updateProduto', () => {
        it('deve atualizar um produto existente e retornar status 200', async () => {
            const produtoExistente = { 
                id: 1, 
                nome: 'Produto A', 
                preco: 99.99, 
                qtdEstoque: 50, 
                tipo: 'Eletrônico',
                dtInsercao: new Date(),
                dtAtualizado: new Date()
            };
            const dadosAtualizacao = { 
                nome: 'Produto A - Atualizado', 
                preco: 89.99 
            };
            const produtoAtualizado = { 
                ...produtoExistente, 
                ...dadosAtualizacao,
                dtAtualizado: new Date()
            };

            (mockRepository as any).findOneBy.mockResolvedValue(produtoExistente);
            (mockRepository as any).save.mockResolvedValue(produtoAtualizado);

            const { req, res } = mockRequestResponse({ 
                params: { id: '1' },
                body: dadosAtualizacao 
            });

            await updateProduto(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(mockRepository.save).toHaveBeenCalledWith({
                ...produtoExistente,
                ...dadosAtualizacao,
                dtAtualizado: expect.any(Date)
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(produtoAtualizado);
        });

        it('deve retornar status 404 se o produto não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ 
                params: { id: '999' },
                body: { nome: 'Atualizado' } 
            });

            await updateProduto(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Produto não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const produtoExistente = { 
                id: 1, 
                nome: 'Produto A', 
                preco: 99.99, 
                qtdEstoque: 50, 
                tipo: 'Eletrônico'
            };

            (mockRepository as any).findOneBy.mockResolvedValue(produtoExistente);
            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ 
                params: { id: '1' },
                body: { nome: 'Atualizado' } 
            });

            await updateProduto(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao atualizar produto." });
        });
    });

    describe('deleteProduto', () => {
        it('deve marcar um produto como removido (soft delete) e retornar status 200', async () => {
            const produtoExistente = { 
                id: 1, 
                nome: 'Produto A', 
                preco: 99.99, 
                qtdEstoque: 50, 
                tipo: 'Eletrônico',
                dtInsercao: new Date(),
                dtAtualizado: new Date()
            };
            const produtoRemovido = { 
                ...produtoExistente, 
                dtRemocao: new Date() 
            };

            (mockRepository as any).findOneBy.mockResolvedValue(produtoExistente);
            (mockRepository as any).save.mockResolvedValue(produtoRemovido);

            const { req, res } = mockRequestResponse({ params: { id: '1' } });

            await deleteProduto(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(mockRepository.save).toHaveBeenCalledWith({
                ...produtoExistente,
                dtRemocao: expect.any(Date)
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Produto removido (soft delete)." });
        });

        it('deve retornar status 404 se o produto não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { id: '999' } });

            await deleteProduto(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Produto não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const produtoExistente = { 
                id: 1, 
                nome: 'Produto A', 
                preco: 99.99, 
                qtdEstoque: 50, 
                tipo: 'Eletrônico'
            };

            (mockRepository as any).findOneBy.mockResolvedValue(produtoExistente);
            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ params: { id: '1' } });

            await deleteProduto(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao remover produto." });
        });
    });
});