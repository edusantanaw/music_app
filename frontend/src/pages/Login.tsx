import { Button } from "@mui/material";

const Login = () => {
  async function handleLogin() {
    window.location.href = "http://localhost:3000/api/google";
  }
  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
