import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { RootState } from "./services/store";

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Router>
      <Routes>
        {/* Page de connexion */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Redirection si l'utilisateur n'est pas authentifié */}
        {!isAuthenticated ? (
          <Route path="/*" element={<Navigate to="/login" />} />
        ) : (
          <Route path="/*" element={<AppLayout isAdmin={user && user.is_admin} />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
