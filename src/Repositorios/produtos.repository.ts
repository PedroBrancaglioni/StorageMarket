import produto from "../Modelos/produto.model";

const produtos: produto[] = []; // Used to simulate database

function getProdutoById(id: number) : produto | undefined {
    return produtos.find(produtos => produtos.id === id);    
}

function getProdutos() {
    return produtos;
}

function createProduto(preco: number, nome: string, qtdEstoque: number, tipo: string, dtInsercao: Date, dtAtualizado: Date, dtRemocao: Date) : produto {
    const prod = new produto(preco,nome,qtdEstoque,tipo,dtInsercao,dtAtualizado,dtRemocao);

    produtos.push(prod);

    return prod;
}

function deleteProduto(id:number, dtRemocao:Date){
    const prod = produtos.find(produtos => produtos.id === id);
    const dataHoje = new Date();

     if (prod === undefined) {
        return false;
    }else{
        prod.dtRemocao = dataHoje;
        return true;
    }

}

function atualizaProdutoById(id: number, preco: number, nome: string, qtdEstoque: number, tipo: string){
    const prod = produtos.find(produtos => produtos.id === id);
    const dataHoje = new Date();

    if(prod === undefined){
        return false;
    }else{
        prod.nome = nome;
        prod.dtAtualizado = dataHoje;
        prod.preco = preco;
        prod.qtdEstoque = qtdEstoque;
        prod.tipo = tipo;
        return prod;
    }
    
}

export default {
    getProdutoById,
    getProdutos,
    createProduto,
    deleteProduto,
    atualizaProdutoById,
}