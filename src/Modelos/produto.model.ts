import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'

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

    @CreateDateColumn()
    dtInsercao: Date;

    @UpdateDateColumn()
    dtAtualizado: Date;

    @DeleteDateColumn()
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