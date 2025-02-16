import { Button } from "@mui/material";
import { useAuthContext } from "../shared/hooks/useAuthContext";

const Login = () => {
  const { handleLogin } = useAuthContext();

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
