import { Profile } from "passport";
import { UserRepository } from "../infra/repository/user-repository";
import { Log } from "../main/config";
import { profile } from "winston";

export class CreateGoogleUser {
  constructor(protected repository: UserRepository, protected log: Log) {}

  public async create(data: Profile): Promise<void> {
    try {
      console.log(profile);
      const email = data!.emails![0].value;
      const userExists = await this.repository.findByEmail(email);
      if (userExists) return;
      await this.repository.create({
        email,
        firstName: data.name?.givenName!,
        lastName: data.name?.familyName!,
      });
      this.log.info(`Google user created successfully`);
    } catch (error) {
      this.log.error(`Error on create google user ${error}`);
    }
  }
}
