import { useAuthContext } from "../hooks/useAuthContext";

interface Props<In, Out> {
  action: (data: In) => Promise<Out> | Out;
}

export function useValidateRequest<In, Out>({ action }: Props<In, Out>) {
  const { verifyUserAuth } = useAuthContext();
  return async function (data: In): Promise<Out | undefined> {
    try {
      return await action(data);
    } catch (error) {
      const { status } = error as { status: number };
      if (status === 401) {
        await verifyUserAuth();
        return;
      }
      throw error
    }
  };
}
