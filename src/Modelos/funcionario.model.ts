import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
class funcionario {
    @PrimaryColumn({ type: "varchar", length: 11 })
    cpf: string;

    @Column()
    nome: string;
    
    @Column()
    cargo: string; // Adicionando cargo, que é comum para funcionário

    @Column({ type: "date" }) // Data de nascimento
    dtNascimento: Date;

    @CreateDateColumn() // Data de criação automática
    dtCadastro: Date;

    @UpdateDateColumn() // Data de atualização automática
    dtAtualizado: Date;

    @DeleteDateColumn() // Para soft delete (se for usar o softDelete do TypeORM)
    dtRemocao: Date;

    // O construtor pode ser removido ou simplificado, pois o TypeORM gerencia a criação da entidade
}

export default funcionario;