import * as env from "dotenv";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { CreateGoogleUser } from "services/CreateGoogleUser";

env.config();

export class GoogleStrategy {

  public static configure() {
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
          const createGoogleUser = new CreateGoogleUser();
          await createGoogleUser.create(profile);
          return done(null, profile);
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj as any));
  }
}
