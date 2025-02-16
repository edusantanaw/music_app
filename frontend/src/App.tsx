import { Navigate, Route, Routes } from "react-router-dom";
import CreatePlaylist from "./pages/CreatePlaylist";
import Login from "./pages/Login";
import GlobalStyle from "./styles/global";
import { useAuthContext } from "./shared/hooks/useAuthContext";

function App() {
  const { authenticated } = useAuthContext();

  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? <CreatePlaylist /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
