import { describe, it, expect, afterEach, jest } from '@jest/globals';
import { Response, Request } from "express";
import funcionario from "../../Modelos/funcionario.model";

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
import funcionarioController from "../../Controladores/funcionarioTypeorm.controller";

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

describe('Funcionario Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createFuncionario', () => {
        it('deve criar um novo funcionário e retornar status 201', async () => {
            const novoFuncionario = { 
                cpf: '12345678901',
                nome: 'João Silva', 
                cargo: 'Analista', 
                dtNascimento: '1990-01-01'
            };
            const funcionarioSalvo = { 
                ...novoFuncionario, 
                dtNascimento: new Date('1990-01-01'),
                dtCadastro: new Date(),
                dtAtualizado: new Date()
            };

            (mockRepository as any).findOneBy.mockResolvedValue(null);
            (mockRepository as any).create.mockReturnValue(novoFuncionario);
            (mockRepository as any).save.mockResolvedValue(funcionarioSalvo);

            const { req, res } = mockRequestResponse({ body: novoFuncionario });

            await funcionarioController.createFuncionario(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ cpf: '12345678901' });
            expect(mockRepository.create).toHaveBeenCalledWith({
                cpf: '12345678901',
                nome: 'João Silva',
                cargo: 'Analista', 
                dtNascimento: new Date('1990-01-01')
            });
            expect(mockRepository.save).toHaveBeenCalledWith(novoFuncionario);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(funcionarioSalvo);
        });

        it('deve retornar status 400 se campos obrigatórios estiverem faltando', async () => {
            const funcionarioIncompleto = { 
                cpf: '12345678901',
                nome: 'João Silva'
                // falta cargo e dtNascimento
            };

            const { req, res } = mockRequestResponse({ body: funcionarioIncompleto });

            await funcionarioController.createFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ 
                error: "CPF, nome, cargo e data de nascimento são obrigatórios." 
            });
        });

        it('deve retornar status 409 se já existir funcionário com o CPF', async () => {
            const novoFuncionario = { 
                cpf: '12345678901',
                nome: 'João Silva', 
                cargo: 'Analista', 
                dtNascimento: '1990-01-01'
            };
            const funcionarioExistente = { 
                cpf: '12345678901',
                nome: 'Maria Santos', 
                cargo: 'Gerente'
            };

            (mockRepository as any).findOneBy.mockResolvedValue(funcionarioExistente);

            const { req, res } = mockRequestResponse({ body: novoFuncionario });

            await funcionarioController.createFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ 
                error: "Já existe um funcionário com este CPF." 
            });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const novoFuncionario = { 
                cpf: '12345678901',
                nome: 'João Silva', 
                cargo: 'Analista', 
                dtNascimento: '1990-01-01'
            };

            (mockRepository as any).findOneBy.mockResolvedValue(null);
            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ body: novoFuncionario });

            await funcionarioController.createFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criat o funcionário." });
        });
    });

    describe('getFuncionarios', () => {
        it('deve retornar uma lista de funcionários e status 200', async () => {
            const funcionarios = [
                { 
                    cpf: '12345678901',
                    nome: 'João Silva', 
                    cargo: 'Analista', 
                    dtNascimento: new Date('1990-01-01'),
                    dtCadastro: new Date(),
                    dtAtualizado: new Date()
                },
                { 
                    cpf: '98765432100',
                    nome: 'Maria Santos', 
                    cargo: 'Gerente', 
                    dtNascimento: new Date('1985-05-15'),
                    dtCadastro: new Date(),
                    dtAtualizado: new Date()
                },
            ];

            (mockRepository as any).find.mockResolvedValue(funcionarios);

            const { req, res } = mockRequestResponse();

            await funcionarioController.getFuncionarios(req, res);

            expect(mockRepository.find).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(funcionarios);
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            (mockRepository as any).find.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse();

            await funcionarioController.getFuncionarios(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar funcionários." });
        });
    });

    describe('getFuncionarioByCPF', () => {
        it('deve retornar um funcionário específico e status 200', async () => {
            const funcionario = { 
                cpf: '12345678901',
                nome: 'João Silva', 
                cargo: 'Analista', 
                dtNascimento: new Date('1990-01-01'),
                dtCadastro: new Date(),
                dtAtualizado: new Date()
            };

            (mockRepository as any).findOneBy.mockResolvedValue(funcionario);

            const { req, res } = mockRequestResponse({ params: { cpf: '12345678901' } });

            await funcionarioController.getFuncionarioByCPF(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ cpf: '12345678901' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(funcionario);
        });

        it('deve retornar status 400 se o CPF for inválido', async () => {
            const { req, res } = mockRequestResponse({ params: { cpf: '' } });

            await funcionarioController.getFuncionarioByCPF(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "CPF inválido." });
        });

        it('deve retornar status 404 se o funcionário não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { cpf: '99999999999' } });

            await funcionarioController.getFuncionarioByCPF(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Funcionário não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            (mockRepository as any).findOneBy.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ params: { cpf: '12345678901' } });

            await funcionarioController.getFuncionarioByCPF(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar funcionário." });
        });
    });

    describe('updateFuncionario', () => {
        it('deve atualizar um funcionário existente e retornar status 200', async () => {
            const funcionarioExistente = { 
                cpf: '12345678901',
                nome: 'João Silva', 
                cargo: 'Analista', 
                dtNascimento: new Date('1990-01-01'),
                dtCadastro: new Date(),
                dtAtualizado: new Date()
            };
            const dadosAtualizacao = { 
                nome: 'João Silva Santos', 
                cargo: 'Senior Analyst' 
            };
            const funcionarioAtualizado = { 
                ...funcionarioExistente, 
                ...dadosAtualizacao,
                dtAtualizado: new Date()
            };

            (mockRepository as any).findOneBy.mockResolvedValue(funcionarioExistente);
            (mockRepository as any).save.mockResolvedValue(funcionarioAtualizado);

            const { req, res } = mockRequestResponse({ 
                params: { cpf: '12345678901' },
                body: dadosAtualizacao 
            });

            await funcionarioController.updateFuncionario(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ cpf: '12345678901' });
            expect(mockRepository.save).toHaveBeenCalledWith({
                ...funcionarioExistente,
                ...dadosAtualizacao,
                dtAtualizado: expect.any(Date)
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(funcionarioAtualizado);
        });

        it('deve retornar status 400 se o CPF for inválido', async () => {
            const { req, res } = mockRequestResponse({ 
                params: { cpf: '' },
                body: { nome: 'Atualizado' } 
            });

            await funcionarioController.updateFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "CPF inválido." });
        });

        it('deve retornar status 404 se o funcionário não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ 
                params: { cpf: '99999999999' },
                body: { nome: 'Atualizado' } 
            });

            await funcionarioController.updateFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Funcionário não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const funcionarioExistente = { 
                cpf: '12345678901',
                nome: 'João Silva', 
                cargo: 'Analista'
            };

            (mockRepository as any).findOneBy.mockResolvedValue(funcionarioExistente);
            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ 
                params: { cpf: '12345678901' },
                body: { nome: 'Atualizado' } 
            });

            await funcionarioController.updateFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao atualizar funcionário." });
        });
    });

    describe('deleteFuncionario', () => {
        it('deve marcar um funcionário como removido (soft delete) e retornar status 200', async () => {
            const funcionarioExistente = { 
                cpf: '12345678901',
                nome: 'João Silva', 
                cargo: 'Analista', 
                dtNascimento: new Date('1990-01-01'),
                dtCadastro: new Date(),
                dtAtualizado: new Date()
            };
            const funcionarioRemovido = { 
                ...funcionarioExistente, 
                dtRemocao: new Date() 
            };

            (mockRepository as any).findOneBy.mockResolvedValue(funcionarioExistente);
            (mockRepository as any).save.mockResolvedValue(funcionarioRemovido);

            const { req, res } = mockRequestResponse({ params: { cpf: '12345678901' } });

            await funcionarioController.deleteFuncionario(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ cpf: '12345678901' });
            expect(mockRepository.save).toHaveBeenCalledWith({
                ...funcionarioExistente,
                dtRemocao: expect.any(Date)
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Funcionário removido (soft delete)." });
        });

        it('deve retornar status 400 se o CPF for inválido', async () => {
            const { req, res } = mockRequestResponse({ params: { cpf: '' } });

            await funcionarioController.deleteFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "CPF inválido." });
        });

        it('deve retornar status 404 se o funcionário não for encontrado', async () => {
            (mockRepository as any).findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { cpf: '99999999999' } });

            await funcionarioController.deleteFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Funcionário não encontrado." });
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const funcionarioExistente = { 
                cpf: '12345678901',
                nome: 'João Silva', 
                cargo: 'Analista'
            };

            (mockRepository as any).findOneBy.mockResolvedValue(funcionarioExistente);
            (mockRepository as any).save.mockRejectedValue(new Error('Erro no banco de dados'));

            const { req, res } = mockRequestResponse({ params: { cpf: '12345678901' } });

            await funcionarioController.deleteFuncionario(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao remover funcionário." });
        });
    });
});