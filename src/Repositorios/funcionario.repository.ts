import funcionario from "../Modelos/funcionario.model";
import User from "../Modelos/funcionario.model";

const funcionarios: funcionario[] = []; // Used to simulate database

function getFuncionarioByCPF(cpf: number) : funcionario | undefined {
    return funcionarios.find(funcionarios => funcionarios.cpf === cpf);    
}

function getfuncionarios() {
    return funcionarios;
}

function createFuncionario(nome: string, dtNascimento: Date, dtCadastro: Date,dtAtualizado: Date, dtRemocao: Date) : funcionario {
    const func = new funcionario(nome,dtNascimento,dtCadastro,dtAtualizado,dtRemocao);

    funcionarios.push(func);

    return func;
}

function deleteFuncionario(cpf:number, dtRemocao:Date){
    const func = funcionarios.find(funcionarios => funcionarios.cpf === cpf);
    const dataHoje = new Date();

     if (func === undefined) {
        return false;
    }else{
        func.dtRemocao = dataHoje;
        return true;
    }

}

function atualizaFuncionarioByCPF(cpf: number, nome: string, dtNascimento: Date){
    const func = funcionarios.find(funcionarios => funcionarios.cpf === cpf);
    const dataHoje = new Date();

    if(func === undefined){
        return false;
    }else{
        func.nome = nome;
        func.dtAtualizado = dataHoje;
        func.dtNascimento = dtNascimento;
        return func;
    }
    
}

export default {
    getFuncionarioByCPF,
    getfuncionarios,
    createFuncionario,
    deleteFuncionario,
    atualizaFuncionarioByCPF,
}