import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaSuaMigration1763665477547 implements MigrationInterface {
    name = 'NomeDaSuaMigration1763665477547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto" ALTER COLUMN "dtInsercao" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "produto" ALTER COLUMN "dtAtualizado" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "produto" ALTER COLUMN "dtRemocao" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" DROP COLUMN "capacidade"`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ADD "capacidade" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ALTER COLUMN "dtReposicao" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" DROP COLUMN "fechado"`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ADD "fechado" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local_armazenamento" DROP COLUMN "fechado"`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ADD "fechado" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ALTER COLUMN "dtReposicao" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" DROP COLUMN "capacidade"`);
        await queryRunner.query(`ALTER TABLE "local_armazenamento" ADD "capacidade" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produto" ALTER COLUMN "dtRemocao" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produto" ALTER COLUMN "dtAtualizado" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "produto" ALTER COLUMN "dtInsercao" DROP DEFAULT`);
    }

}
