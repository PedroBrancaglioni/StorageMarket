import { describe, it, expect, afterEach, jest } from '@jest/globals';
import { Response, Request } from "express";
import localArmazenamento from "../../Modelos/localArmazenamento.model";

const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn()
}

jest.mock('../../datasource', () => ({
    AppDataSource: {
        getRepository: jest.fn(() => mockRepository)
    }
}));

import {
    createLocalArmazenamento,
    getLocais,
    getLocalByCorredor,
    updateLocal,
    deleteLocal
} from "../../Controladores/localArmazenamentoTypeorm.controller";

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

describe('LocalArmazenamento Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createLocalArmazenamento', () => {
        it('deve criar um novo local de armazenamento e retornar status 201', async () => {
            const novoLocal = { 
                corredor: 101, 
                descricao: 'Corredor Principal', 
                capacidade: 100, 
                fechado: false 
            };
            const localSalvo = { ...novoLocal, dtReposicao: new Date() };

            (mockRepository as any).create.mockReturnValue(novoLocal);
            (mockRepository as any).save.mockResolvedValue(localSalvo);

            const { req, res } = mockRequestResponse({ body: novoLocal });

            await createLocalArmazenamento(req, res);

            expect(mockRepository.create).toHaveBeenCalledWith(novoLocal);
            expect(mockRepository.save).toHaveBeenCalledWith(novoLocal);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(localSalvo);
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const novoLocal = { 
                corredor: 101, 
                descricao: 'Corredor Principal', 
                capacidade: 100 
            };

            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ body: novoLocal });

            await createLocalArmazenamento(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar local de armazenamento." });
        });
    });

    describe('getLocais', () => {
        it('deve retornar uma lista de locais e status 200', async () => {
            const locais = [
                { 
                    corredor: 101, 
                    descricao: 'Corredor A', 
                    capacidade: 100, 
                    fechado: false,
                    dtReposicao: new Date()
                },
                { 
                    corredor: 102, 
                    descricao: 'Corredor B', 
                    capacidade: 150, 
                    fechado: false,
                    dtReposicao: new Date()
                },
            ];

            (mockRepository as any).find.mockResolvedValue(locais);

            const { req, res } = mockRequestResponse();

            await getLocais(req, res);

            expect(mockRepository.find).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(locais);
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            (mockRepository as any).find.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse();

            await getLocais(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar locais de armazenamento." });
        });
    });

    describe('getLocalByCorredor', () => {
        it('deve retornar um local específico e status 200', async () => {
            const local = { 
                corredor: 101, 
                descricao: 'Corredor A', 
                capacidade: 100, 
                fechado: false,
                dtReposicao: new Date()
            };

            (mockRepository as any).findOneBy.mockResolvedValue(local);

            const { req, res } = mockRequestResponse({ params: { corredor: '101' } });

            await getLocalByCorredor(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ corredor: 101 });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(local);
        });

        it('deve retornar status 400 se o corredor for inválido', async () => {
            const { req, res } = mockRequestResponse({ params: { corredor: 'abc' } });

            await getLocalByCorredor(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Corredor inválido." });
        });

        it('deve retornar status 404 se o local não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { corredor: '999' } });

            await getLocalByCorredor(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Local não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            (mockRepository as any).findOneBy.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ params: { corredor: '101' } });

            await getLocalByCorredor(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar local." });
        });
    });

    describe('updateLocal', () => {
        it('deve atualizar um local existente e retornar status 200', async () => {
            const localExistente = { 
                corredor: 101, 
                descricao: 'Corredor A', 
                capacidade: 100, 
                fechado: false 
            };
            const dadosAtualizacao = { 
                descricao: 'Corredor A - Atualizado', 
                capacidade: 150 
            };
            const localAtualizado = { 
                ...localExistente, 
                ...dadosAtualizacao 
            };

            (mockRepository as any).findOneBy.mockResolvedValue(localExistente);
            (mockRepository as any).save.mockResolvedValue(localAtualizado);

            const { req, res } = mockRequestResponse({ 
                params: { corredor: '101' },
                body: dadosAtualizacao 
            });

            await updateLocal(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ corredor: 101 });
            expect(mockRepository.save).toHaveBeenCalledWith(localAtualizado);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(localAtualizado);
        });

        it('deve retornar status 404 se o local não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ 
                params: { corredor: '999' },
                body: { descricao: 'Atualizado' } 
            });

            await updateLocal(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Local não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const localExistente = { 
                corredor: 101, 
                descricao: 'Corredor A', 
                capacidade: 100, 
                fechado: false 
            };

            (mockRepository as any).findOneBy.mockResolvedValue(localExistente);
            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ 
                params: { corredor: '101' },
                body: { descricao: 'Atualizado' } 
            });

            await updateLocal(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao atualizar local." });
        });
    });

    describe('deleteLocal', () => {
        it('deve marcar um local como fechado (soft delete) e retornar status 200', async () => {
            const localExistente = { 
                corredor: 101, 
                descricao: 'Corredor A', 
                capacidade: 100, 
                fechado: false 
            };
            const localFechado = { 
                ...localExistente, 
                fechado: true 
            };

            (mockRepository as any).findOneBy.mockResolvedValue(localExistente);
            (mockRepository as any).save.mockResolvedValue(localFechado);

            const { req, res } = mockRequestResponse({ params: { corredor: '101' } });

            await deleteLocal(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ corredor: 101 });
            expect(mockRepository.save).toHaveBeenCalledWith({ ...localExistente, fechado: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Local marcado como fechado (soft delete)." });
        });

        it('deve retornar status 404 se o local não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { corredor: '999' } });

            await deleteLocal(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Local não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const localExistente = { 
                corredor: 101, 
                descricao: 'Corredor A', 
                capacidade: 100, 
                fechado: false 
            };

            (mockRepository as any).findOneBy.mockResolvedValue(localExistente);
            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ params: { corredor: '101' } });

            await deleteLocal(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao remover local." });
        });
    });
});