import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import CreatePlaylist from "./pages/CreatePlaylist";
import Login from "./pages/Login";
import GlobalStyle from "./styles/global";

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
