import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaSuaMigration1763665877411 implements MigrationInterface {
    name = 'NomeDaSuaMigration1763665877411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local_armazenamento" DROP COLUMN "capacidade"`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ADD "capacidade" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" DROP COLUMN "fechado"`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ADD "fechado" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local_armazenamento" DROP COLUMN "fechado"`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ADD "fechado" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" DROP COLUMN "capacidade"`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ADD "capacidade" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
