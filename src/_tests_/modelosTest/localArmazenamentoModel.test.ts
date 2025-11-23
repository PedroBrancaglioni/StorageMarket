import localArmazenamento from "../../Modelos/localArmazenamento.model";

describe('LocalArmazenamento model', () => {
    it('deveria criar uma instancia de localArmazenamento', () => {
        const descricao = 'Corredor Principal';
        const capacidade = 100;
        const dtReposicao = new Date();
        const fechado = false;

        const local = new localArmazenamento(descricao, capacidade, dtReposicao, fechado);

        expect(local.descricao).toBe(descricao);
        expect(local.capacidade).toBe(capacidade);
        expect(local.dtReposicao).toBe(dtReposicao);
        expect(local.fechado).toBe(fechado);

        expect(local.corredor).toBeUndefined();
    });

    it('deveria alterar a propriedade corredor apenas', () => {
        const local = new localArmazenamento('Corredor A', 100, new Date(), false);
        local.corredor = 999;

        expect(local.corredor).toBe(999);
        expect(local.descricao).toBe('Corredor A');
        expect(local.capacidade).toBe(100);
        expect(local.fechado).toBe(false);
    });
});