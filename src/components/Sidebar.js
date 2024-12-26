import React from "react";
import { ReactComponent as Logo } from "../assets/[INSTITUCIONAL]LOGO-HORIZONTAL.svg";
import { FaTruck, FaGift, FaUtensils, FaUserFriends } from "react-icons/fa";

function Sidebar() {
  const handleSidebarButtonClick = (action) => {
    console.log(`Ação selecionada: ${action}`);
  };

  return (
    <div
      className="sidebar"
      style={{
        background: "#2c3a2c",
        color: "#F7F7EB",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
      }}
    >
      <Logo
        style={{
          fill: "#F7F7EB",
          marginTop: "70px",
          marginBottom: "70px",
          width: "240px", 
          height: "auto", 
        }}
        className="logo"
      />
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          textAlign: "center",
          width: "100%", 
        }}
      >
        {[
          { icon: <FaTruck />, label: "Lalamove", action: "Lalamove" },
          { icon: <FaGift />, label: "Cartões Presente", action: "Cartão-Presente" },
          { icon: <FaUtensils />, label: "Modo de Preparo", action: "Modo de Preparo" },
          { icon: <FaUserFriends />, label: "Cliente da Casa", action: "Cliente da Casa" },
        ].map((item, index) => (
          <li
            key={index}
            onClick={() => handleSidebarButtonClick(item.action)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: index < 3 ? "30px" : "0", 
              cursor: "pointer",
            }}
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span> {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
