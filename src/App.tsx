import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Lexon Tech Solution</h1>
      <p>IT Company Africa - ERP Systems</p>
    </div>
  );
}

function Church() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Church Management Software Africa</h1>
      <p>Lexon Church ERP System for members, donations & accounting.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/church-management-software" element={<Church />} />
    </Routes>
  );
}
