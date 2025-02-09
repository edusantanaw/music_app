import { UserRepository } from "infra/repository/user-repository";
import { Log } from "main/config";
import { Profile } from "passport";

export class CreateGoogleUser {
  protected repository: UserRepository;
  protected log: Log
  
  constructor() {
    this.repository = new UserRepository();
    this.log = new Log("google-user")
  }

  public async create(data: Profile) {
    const email = data!.emails![0].value;
    const userExists = await this.repository.findByEmail(email);
    if (userExists) return;

    await this.repository.create({
      email,
      firstName: data.name?.givenName!,
      lastName: data.name?.familyName!,
    });
    this.log.info(`Google user created successfully`)
  }
}
