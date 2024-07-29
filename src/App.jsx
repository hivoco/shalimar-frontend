import Home from "./pages/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Interaction from "./pages/Interaction";
import NoPage from "./components/NoPage";
import Splash from "./pages/Splash";
import Location from "./pages/Location";
import DelearDetails from "./pages/DelearDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/interaction" element={<Interaction />} />
          <Route path="/explore-your-experience" element={<Splash />} />
          <Route path="/enter-your-location" element={<Location />} />
          <Route path="/get-your-nearest-dealers" element={<DelearDetails />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
