import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Block from "./pages/Block";
import Verify from "./pages/Verify";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/block" element={<Block />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/admin-panel-secret" element={<Admin />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
