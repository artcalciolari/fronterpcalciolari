import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Pedidos from "./components/Pedidos";
import Estoque from "./components/Estoque";
import OverlayPage from "./components/OverlayPage";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState(null); 

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  const closeOverlay = () => {
    setActivePage(null);
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Navbar onNavClick={handleNavClick} />

        <div className="content-sections">
          <Pedidos pedidos={[]} /> 
          <div className="right-section">
            <Estoque estoque={[]} /> 
          </div>
        </div>
      </div>


      {activePage && <OverlayPage page={activePage} onClose={closeOverlay} />}
    </div>
  );
}

export default App;
