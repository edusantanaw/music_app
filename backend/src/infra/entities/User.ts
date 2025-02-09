import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb-users")
export class User {
  @PrimaryColumn({ type: "text" })
  id!: string;

  @Column({ nullable: false, type: "text" })
  firstName!: string;

  @Column({ nullable: false, type: "text" })
  lastName!: string;

  @Column({ nullable: false, type: "text", unique: true })
  email!: string;
}
