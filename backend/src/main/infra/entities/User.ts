import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from "crypto";

interface UserData {
  firstName: string;
  lastName: string;
  id?: string;
  email: string;
}

@Entity("tb-users")
export class User {
  @PrimaryColumn({})
  id: string;

  @Column({ nullable: false, type: "string" })
  protected firstName: string;

  @Column({ nullable: false, type: "string" })
  protected lastName: string;

  @Column({ nullable: false, type: "string", unique: true })
  protected email: string;

  constructor(data: UserData) {
    this.id = data.id ?? randomUUID();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }
}
