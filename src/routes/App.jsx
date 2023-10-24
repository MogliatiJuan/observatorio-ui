import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, DetailView } from "@Components";
import { Home, Upload, LegalForm, Browser } from "@Pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/cargafallo" element={<Upload />} />
          <Route path="/fallo-formulario" element={<LegalForm />} />
          <Route path="/buscador" element={<Browser />} />
          <Route path="/buscador/detalle/:id" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
