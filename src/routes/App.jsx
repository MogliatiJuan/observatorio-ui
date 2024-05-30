import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, DetailView } from "@Components";
import { Home, LegalForm, Browser, LoginView } from "@Pages";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const expDate = new Date(decodedToken.exp * 1000); // Multiplica por 1000 para convertir segundos a milisegundos
    const currentDate = new Date();
    if (currentDate.getTime() > expDate.getTime()) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      return <Navigate to="/" />;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/inicio-sesion" element={<LoginView />} />
          <Route path="/cargafallo" element={<LegalForm />} />
          <Route path="/buscador" element={<Browser />} />
          <Route path="/buscador/detalle/:id" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
