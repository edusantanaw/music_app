import { MigrationInterface, QueryRunner } from "typeorm";

export class Playlist1739228687537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "playlist" (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NULL,
                is_public BOOLEAN DEFAULT FALSE,
                cover_image_url TEXT NULL,
                is_created_on_spotify BOOLEAN DEFAULT FALSE,
                spotify_id TEXT NULL,
                owner_id TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                CONSTRAINT fk_playlist_owner FOREIGN KEY (owner_id) REFERENCES "tb_users" (id) ON DELETE CASCADE
            );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF NOT EXISTS playlist;
    `);
  }
}
