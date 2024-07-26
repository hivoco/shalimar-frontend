import Home from "./pages/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Interaction from "./pages/Interaction";
import NoPage from "./components/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/interaction" element={<Interaction />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
