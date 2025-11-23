import { MigrationInterface, QueryRunner } from "typeorm";

export class NovaMigration1763665888550 implements MigrationInterface {
    name = 'NovaMigration1763665888550'

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
