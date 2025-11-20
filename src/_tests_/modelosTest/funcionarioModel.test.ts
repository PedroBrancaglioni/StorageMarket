import funcionario from "../../Modelos/funcionario.model";

describe('Funcionario model', () => {
    it('deveria criar uma instancia de funcionario com propriedades básicas', () => {
        const func = new funcionario();
        func.cpf = '12345678901';
        func.nome = 'João Silva';
        func.cargo = 'Analista';
        func.dtNascimento = new Date('1990-01-01');

        expect(func.cpf).toBe('12345678901');
        expect(func.nome).toBe('João Silva');
        expect(func.cargo).toBe('Analista');
        expect(func.dtNascimento).toEqual(new Date('1990-01-01'));

        // As datas automáticas devem ser undefined até serem definidas pelo TypeORM
        expect(func.dtCadastro).toBeUndefined();
        expect(func.dtAtualizado).toBeUndefined();
        expect(func.dtRemocao).toBeUndefined();
    });

    it('deveria alterar todas as propriedades', () => {
        const func = new funcionario();
        
        func.cpf = '12345678901';
        func.nome = 'João Silva';
        func.cargo = 'Analista';
        func.dtNascimento = new Date('1990-01-01');
        func.dtCadastro = new Date('2023-01-01');
        func.dtAtualizado = new Date('2023-06-01');
        func.dtRemocao = new Date('2024-01-01');

        expect(func.cpf).toBe('12345678901');
        expect(func.nome).toBe('João Silva');
        expect(func.cargo).toBe('Analista');
        expect(func.dtNascimento).toEqual(new Date('1990-01-01'));
        expect(func.dtCadastro).toEqual(new Date('2023-01-01'));
        expect(func.dtAtualizado).toEqual(new Date('2023-06-01'));
        expect(func.dtRemocao).toEqual(new Date('2024-01-01'));
    });
});