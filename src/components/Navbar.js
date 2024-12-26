import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

function Navbar({ onNavClick }) {
  const [dateTime, setDateTime] = useState("");
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const floatingMenuRef = useRef(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("pt-BR");
      setDateTime(`${formattedDate} ${formattedTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        floatingMenuRef.current &&
        !floatingMenuRef.current.contains(event.target)
      ) {
        setShowFloatingMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRegisterClick = () => {
    setShowFloatingMenu(!showFloatingMenu);
  };

  const handleOptionClick = (option) => {
    onNavClick(option);
    setShowFloatingMenu(false);
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        <button onClick={handleRegisterClick}>Registrar</button>
        <button onClick={() => onNavClick("Consultar")}>Consultar</button>
        <button onClick={() => onNavClick("Pedidos em Aberto")}>
          Pedidos em Aberto
        </button>
        <button onClick={() => onNavClick("Estoque")}>Estoque</button>
      </div>
      <div className="nav-date">{dateTime}</div>
      {showFloatingMenu && (
        <div className="floating-menu" ref={floatingMenuRef}>
          <button onClick={() => handleOptionClick("RegistrarCliente")}>
            Cliente
          </button>
          <button onClick={() => handleOptionClick("RegistrarProduto")}>
            Produto
          </button>
          <button onClick={() => handleOptionClick("RegistrarPedido")}>
            Pedido
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
