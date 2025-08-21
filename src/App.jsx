import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import ChatbotWidget from "./components/ChatbotWidget";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:city" element={<CityPage />} />
      </Routes>
      <ChatbotWidget/>
      <Footer />
    </BrowserRouter>
  );
}
