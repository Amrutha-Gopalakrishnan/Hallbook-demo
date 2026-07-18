import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import Awards from "./components/Awards";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Services from "./components/Services";
import Hall from "./components/Hall";
import Gallery from "./components/Gallery";
import BookingSection from "./components/BookingSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import RoomsPage from "./pages/RoomsPage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";

const HomePage = () => (
  <>
    <ScrollProgress />
    <Navbar />
    <Hero />
    {/* <Awards /> */}
    <About />
    <Services />
    <Hall />
    <Rooms />
    <Gallery />
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
