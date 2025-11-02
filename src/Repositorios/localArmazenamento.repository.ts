import localArmazenamento from "../Modelos/localArmazenamento.model";

const locaisArmazenamento: localArmazenamento[] = []; // Used to simulate database

function getLocalByCorredor(corredor: number) : localArmazenamento | undefined {
    return locaisArmazenamento.find(locaisArmazenamento => locaisArmazenamento.corredor === corredor);    
}

function getLocais() {
    return locaisArmazenamento;
}

function createLocalArmazenamento(descricao: string, capacidade: number, dtReposicao: Date, fechado: boolean) : localArmazenamento {
    const local = new localArmazenamento(descricao,capacidade,dtReposicao,fechado);

    locaisArmazenamento.push(local);

    return local;
}

function deleteLocal(corredor:number){
    const local = locaisArmazenamento.find(locaisArmazenamento => locaisArmazenamento.corredor === corredor);

    if(local == undefined){
        return false;
    }else{
        local.fechado = true;
        return true;
    }
}

function atualizaLocalByCorredor(corredor: number, descricao: string, capacidade: number, dtReposicao: Date, fechado: boolean){
    const local = locaisArmazenamento.find(locaisArmazenamento => locaisArmazenamento.corredor === corredor);

    if(local === undefined){
        return false;
    }else{
        local.descricao = descricao;
        local.capacidade = capacidade;
        local.dtReposicao = dtReposicao;
        local.fechado = fechado;
        return local;
    }
    
}

export default {
    getLocalByCorredor,
    getLocais,
    createLocalArmazenamento,
    deleteLocal,
    atualizaLocalByCorredor,
}