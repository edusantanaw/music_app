import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "playlist" })
export class Playlist {
  @PrimaryColumn({ type: "text" })
  id!: string;

  @Column({ type: "text", nullable: false, name: "name" })
  name!: string;

  @Column({ type: "text", nullable: true, name: "description" })
  description?: string;

  @Column({ type: "boolean", default: false, name: "is_created_on_spotify" })
  isCreatedOnSpotify: boolean = false;

  @Column({ type: "boolean", default: false })
  isPublic!: boolean;
  
  @Column({type: "simple-array", name: "tracks"})
  tracks: string[] =[]

  @Column({ type: "text", nullable: true })
  coverImageUrl?: string;

  @Column({ type: "text", nullable: true })
  spotifyId?: string;

  @ManyToOne(() => User, (user) => user.playlists, { nullable: false, onDelete: "CASCADE" })
  owner!: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
