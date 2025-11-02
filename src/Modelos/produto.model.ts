import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    preco: number;

    @Column()
    qtdEstoque: number;

    @Column()
    tipo: string;

    @Column()
    dtInsercao: Date;

    @Column()
    dtAtualizado: Date;

    @Column()
    dtRemocao: Date;

    constructor(preco: number, nome: string, qtdEstoque: number, tipo: string, dtInsercao: Date, dtAtualizado: Date, dtRemocao: Date) {
        this.nome = nome;
        this.preco = preco;
        this.qtdEstoque = qtdEstoque;
        this.tipo = tipo;
        this.dtInsercao = dtInsercao;
        this.dtAtualizado = dtAtualizado;
        this.dtRemocao = dtRemocao;
    }
}

export default produto;