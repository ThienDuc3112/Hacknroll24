import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Room from "./components/Room";
import New from "./components/New";
import SearchPopUp from "./components/SearchPopUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:room" element={<Room />} />
      <Route path="/new" element={<New />} />
      <Route path="/test" element={<SearchPopUp />} />
    </Routes>
  );
}

export default App;
