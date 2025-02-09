import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { AppDataSource } from "../../main/config";
import { User } from "../entities";

interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
}

export class UserRepository {
  protected repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  public async create(data: ICreateUser) {
    const user = this.repository.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      id: randomUUID(),
    });
    await this.repository.save(user);
    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
