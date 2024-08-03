import Home from "./pages/Home";
// import Test from "./components/Test";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Interaction from "./pages/Interaction";
import NoPage from "./components/NoPage";

import Splash from "./pages/Splash";
import Location from "./pages/Location";
import DelearDetails from "./pages/DelearDetails";
import PainterLocation from "./pages/PainterLocation";
import PainterDetails from "./pages/PainterDetails";

import Quiz from "./pages/Quiz";

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

          {/* <Route path="/test" element={<Test/>} /> */}



          <Route
            path="/get-painter-using-location"
            element={<PainterLocation />}
          />

          <Route
            path="/get-your-nearest-painters"
            element={<PainterDetails />}
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
