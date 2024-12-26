import React, { useState } from "react";
import Navbar from "./Navbar";
import OverlayPage from "./OverlayPage";

function AppContainer() {
  const [overlayPage, setOverlayPage] = useState(null);

  const handleOpenOverlay = (page) => {
    setOverlayPage(page); 
  };

  const handleCloseOverlay = () => {
    setOverlayPage(null); 
  };

  return (
    <div className="app-container">
      <Navbar onOpenOverlay={handleOpenOverlay} />
      {overlayPage && (
        <OverlayPage page={overlayPage} onClose={handleCloseOverlay} />
      )}
    </div>
  );
}

export default AppContainer;
