import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@Components";
import { Home, Upload } from "@Pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/cargafallo" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
