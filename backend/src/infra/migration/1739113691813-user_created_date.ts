import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreatedDate1739113691813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "tb_users"
                ADD COLUMN "created_at" TIMESTAMP DEFAULT now();
              
                ALTER TABLE "tb_users"
                ADD COLUMN "updated_at" TIMESTAMP DEFAULT now();
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "tb_users"
                DROP COLUMN "created_at";

                ALTER TABLE "tb_users"
                DROP COLUMN "updated_at";
            `);
  }
}
