import { User } from "../../infra/entities";
import { AppDataSource } from "../config";
import { createPlaylistFactory } from "../factories/services/create-playlist";
import * as fs from "node:fs";

export default async () => {
  const userRepo = await AppDataSource.getRepository(User);
  const user = await userRepo.find();
  console.log(user)
  if (user[0]) {
    const file = fs.readFileSync(`${__dirname}/../../../test-image/test.jpg`);
    const fileTobase64 = file.toString("base64");
    const createPlaylist = createPlaylistFactory();
    await createPlaylist.create({
      description: "test",
      isPublic: true,
      name: "test",
      userId: user[0].id,
      coverImageUrlBase64: fileTobase64,
      imageExt: "jpg",
    });
  }
};
