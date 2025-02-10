import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Playlist } from "./Playlist";

@Entity("tb_users")
export class User {
  @PrimaryColumn({ type: "text" })
  id!: string;

  @Column({ nullable: false, type: "text", name: "first_name" })
  firstName!: string;

  @Column({ nullable: false, type: "text", name: "last_name" })
  lastName!: string;

  @Column({ nullable: false, type: "text", unique: true })
  email!: string;

  @OneToMany(() => Playlist, (playlist) => playlist.owner)
  playlists!: Playlist[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
