import { MigrationInterface, QueryRunner } from "typeorm";

export class PlaylistTracks1739231445678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "playlist"
          ADD COLUMN "tracks" text DEFAULT '';
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "playlist"
          DROP COLUMN "tracks";
        `);
      }
}
