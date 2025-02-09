import { MigrationInterface, QueryRunner } from "typeorm";

export class User1739112923700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "tb_users" (
            "id" TEXT PRIMARY KEY,
            "first_name" TEXT NOT NULL,
            "last_name" TEXT NOT NULL,
            "email" TEXT NOT NULL UNIQUE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "tb_users";
        `);
  }
}
