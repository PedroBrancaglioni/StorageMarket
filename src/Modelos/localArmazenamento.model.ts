import { BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
class localArmazenamento {
    @PrimaryColumn({ type: "bigint" })
    corredor: number;

    @Column()
    descricao: string;
    
    @Column()
    capacidade: number;

    @Column()
    dtReposicao: Date;

    @Column()
    fechado: boolean;

    constructor(descricao: string, capacidade: number, dtReposicao: Date, fechado: boolean) {
        this.descricao = descricao;
        this.capacidade = capacidade;
        this.dtReposicao = dtReposicao;
        this.fechado = fechado;
    }
}

export default localArmazenamento;