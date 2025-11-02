import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class funcionario {
    @PrimaryGeneratedColumn()
    cpf: number;

    @Column()
    nome: string;
    
    @Column()
    dtNascimento: Date;

    @Column()
    dtCadastro: Date;

    @Column()
    dtAtualizado: Date;

    @Column()
    dtRemocao: Date;

    constructor(nome: string, dtNascimento: Date, dtCadastro: Date, dtAtualizado: Date, dtRemocao: Date) {
        this.nome = nome;
        this.dtNascimento = dtNascimento;
        this.dtCadastro = dtCadastro;
        this.dtAtualizado = dtAtualizado;
        this.dtRemocao = dtRemocao;
    }
}

export default funcionario;