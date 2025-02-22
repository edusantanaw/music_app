import { UserRepository } from "../../../infra/repository/user-repository";
import { CreateGoogleUser } from "../../../services/create-google-user";
import { Log } from "../../config";

export function createGoogleUserFactory(): CreateGoogleUser {
  const userRepository = new UserRepository();
  const log = new Log("google-user");
  return new CreateGoogleUser(userRepository, log);
}
