import * as env from "dotenv";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { createGoogleUserFactory } from "../factories/services/create-google-user";
import { Log } from "./log";

env.config();

export class GoogleStrategy {
  public static configure() {
    try {
      const googleClientId = process.env.GOOGLE_CLIENT_ID!;
      const googleSecret = process.env.GOOGLE_CLIENT_SECRET!;
      const googleCallbackUR = process.env.GOOGLE_CALLBACK_URL!;

      passport.use(
        new Strategy(
          {
            clientID: googleClientId,
            clientSecret: googleSecret,
            callbackURL: googleCallbackUR,
          },
          async (_, __, profile, done) => {
            const createGoogleUser = createGoogleUserFactory();
            const user = await createGoogleUser.create(profile);
            if (!user) throw new Error("Error on create user");
            return done(null, user);
          }
        )
      );

      passport.serializeUser((user, done) => done(null, user));
      passport.deserializeUser((obj, done) => done(null, obj as any));
    } catch (error) {
      const log = new Log("google-strategy")
      log.error(`Error on configure user ${error}`)
    }
  }
}
