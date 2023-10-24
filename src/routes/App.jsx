import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@Components";
import { Home, LegalForm } from "@Pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/cargafallo" element={<LegalForm />} />
          <Route
            path="/buscarFallo"
            element={<span>Buscador de fallos</span>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
