import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Room from "./components/Room";
import Create from "./components/Create";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:room" element={<Room />} />
      <Route path="/callback" element={<Create />} />
    </Routes>
  );
}

export default App;
