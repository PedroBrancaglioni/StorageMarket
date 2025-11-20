import { describe, it, expect, afterEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../app'; // Importe sua instância do app Express
import { AppDataSource } from '../datasource';
import localArmazenamento from '../Modelos/localArmazenamento.model';

// Obtém o mock do repositório
const repositoryMock = AppDataSource.getRepository(localArmazenamento);

describe('LocalArmazenamento Controller', () => {

    // Limpa os mocks depois de cada teste para evitar que um teste influencie o outro
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /locais (createLocalArmazenamento)', () => {
        it('deve criar um novo local de armazenamento e retornar status 201', async () => {
            const novoLocal = { corredor: 101, prateleira: 'A', fechado: false, capacidade: 100};
            const localSalvo = { id: 1, ...novoLocal };

            // Configura o mock para simular o comportamento do TypeORM
            (repositoryMock.create as jest.Mock).mockReturnValue(novoLocal);
            (repositoryMock.save as jest.Mock).mockResolvedValue(localSalvo);

            // Faz a requisição HTTP simulada
            const response = await request(app)
                .post('/locais')
                .send(novoLocal);

            // Asserções
            expect(response.status).toBe(201);
            expect(response.body).toEqual(localSalvo);
            expect(repositoryMock.create).toHaveBeenCalledWith(novoLocal);
            expect(repositoryMock.save).toHaveBeenCalledWith(novoLocal);
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const novoLocal = { corredor: 101, prateleira: 'A', fechado: false };
            const error = new Error('Erro no banco de dados');

            // Simula um erro ao salvar
            (repositoryMock.save as jest.Mock).mockRejectedValue(error);

            const response = await request(app)
                .post('/locais')
                .send(novoLocal);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Erro ao criar local de armazenamento." });
        });
    });

    describe('GET /locais (getLocais)', () => {
        it('deve retornar uma lista de locais e status 200', async () => {
            const locais = [
                { id: 1, corredor: 101, prateleira: 'A', fechado: false },
                { id: 2, corredor: 102, prateleira: 'B', fechado: false },
            ];

            // Simula o retorno do método find
            (repositoryMock.find as jest.Mock).mockResolvedValue(locais);

            const response = await request(app).get('/locais');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(locais);
            expect(repositoryMock.find).toHaveBeenCalledTimes(1);
        });

        it('deve retornar status 500 se ocorrer um erro', async () => {
            const error = new Error('Erro no banco de dados');
            (repositoryMock.find as jest.Mock).mockRejectedValue(error);

            const response = await request(app).get('/locais');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Erro ao buscar locais de armazenamento." });
        });
    });

    describe('GET /locais/:corredor (getLocalByCorredor)', () => {
        it('deve retornar um local específico e status 200', async () => {
            const local = { id: 1, corredor: 101, prateleira: 'A', fechado: false };
            (repositoryMock.findOneBy as jest.Mock).mockResolvedValue(local);

            const response = await request(app).get('/locais/101');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(local);
            expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ corredor: 101 });
        });

        it('deve retornar status 404 se o local não for encontrado', async () => {
            (repositoryMock.findOneBy as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/locais/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: "Local não encontrado." });
        });
    });

    // ... Você pode adicionar os testes para updateLocal e deleteLocal aqui, seguindo a mesma lógica.

});