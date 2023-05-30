import { BrowserRouter, Route, Routes } from "react-router-dom";
import Consulta from "./maps/Consulta";
import Reporte from "./maps/Reporte";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container mt-2">
          <Routes>
            <Route index element={<Consulta/>}/>
            <Route path="/reporte" element={<Reporte/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
