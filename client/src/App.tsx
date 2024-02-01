import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Room from "./components/Room";
import SearchPopUp from "./components/SearchPopUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:room" element={<Room />} />
      <Route path="/test" element={<SearchPopUp />} />
    </Routes>
  );
}

export default App;
