import GetSpotifyToken from "../../services/get-spotify-token";

export default async () => {
  const spotifyAuth =  GetSpotifyToken.getInstance();
  const credentials = await spotifyAuth.getCredentials();
  console.log(credentials)
};
