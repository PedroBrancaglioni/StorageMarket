import produto from "../../Modelos/produto.model";

describe('Produto model', () => {
    it('deveria criar uma instancia de produto', () => {
        const nome = 'Produto Teste';
        const preco = 99.99;
        const qtdEstoque = 50;
        const tipo = 'Eletrônico';
        const dtInsercao = new Date();
        const dtAtualizado = new Date();
        const dtRemocao = new Date();

        const prod = new produto(preco, nome, qtdEstoque, tipo, dtInsercao, dtAtualizado, dtRemocao);

        expect(prod.nome).toBe(nome);
        expect(prod.preco).toBe(preco);
        expect(prod.qtdEstoque).toBe(qtdEstoque);
        expect(prod.tipo).toBe(tipo);
        expect(prod.dtInsercao).toBe(dtInsercao);
        expect(prod.dtAtualizado).toBe(dtAtualizado);
        expect(prod.dtRemocao).toBe(dtRemocao);

        expect(prod.id).toBeUndefined();
    });

    it('deveria alterar a propriedade id apenas', () => {
        const prod = new produto(99.99, 'Produto Teste', 50, 'Eletrônico', new Date(), new Date(), new Date());
        prod.id = 999;

        expect(prod.id).toBe(999);
        expect(prod.nome).toBe('Produto Teste');
        expect(prod.preco).toBe(99.99);
        expect(prod.qtdEstoque).toBe(50);
        expect(prod.tipo).toBe('Eletrônico');
    });
});