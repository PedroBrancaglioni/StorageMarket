import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
class funcionario {
    @PrimaryColumn({ type: "varchar", length: 11 })
    cpf: string;

    @Column()
    nome: string;
    
    @Column()
    cargo: string;

    @Column({ type: "date" })
    dtNascimento: Date;

    @CreateDateColumn()
    dtCadastro: Date;

    @UpdateDateColumn()
    dtAtualizado: Date;

    @DeleteDateColumn()
    dtRemocao: Date;


}

export default funcionario;