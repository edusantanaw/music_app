import getSpotifyToken from "../routines/get-spotify-token";

type IRoutine = {
  name: string;
  action: (args: unknown) => Promise<unknown> | unknown;
};

const availablesRoutines: IRoutine[] = [
  {
    name: "GetSpotifyToken",
    action: getSpotifyToken,
  },
];

function printAvailablesRoutines() {
  console.log("***** Availables routines *****");
  availablesRoutines.forEach((e) => console.log(e));
}

async function runCli() {
  const args = process.argv.slice(2);

  const routine = args[0];

  if (!routine) {
    printAvailablesRoutines();
    return;
  }
  const routineExists = availablesRoutines.find((e) => e.name === routine);
  if (!routineExists) {
    console.log("Routine not found");
    printAvailablesRoutines();
    return;
  }
  await routineExists.action(args.slice(1))
}

(async () => {
  await runCli();
})();
