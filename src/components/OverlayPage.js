import React from "react";
import { FaTimes } from "react-icons/fa";
import CriarCliente from "../pages/CriarCliente";
import CriarProduto from "../pages/CriarProduto";
import CriarPedido from "../pages/CriarPedido";
import ConsultarProdutos from "../pages/ConsultarProdutos";
import ListarPedidos from "../pages/ListarPedidos";

function OverlayPage({ page, onClose }) {
  const renderPageContent = () => {
    switch (page) {
      case "RegistrarCliente":
        return <CriarCliente />;
      case "RegistrarProduto":
        return <CriarProduto />;
      case "RegistrarPedido":
        return <CriarPedido />;
      case "Consultar":
        return <ConsultarProdutos />;
      case "Pedidos em Aberto":
        return <ListarPedidos />;
      case "Estoque":
        return <h2>Página de Estoque</h2>;
      default:
        return <h2>Página não encontrada</h2>;
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "overlay") {
      if (["RegistrarCliente", "RegistrarProduto", "RegistrarPedido"].includes(page)) {
        if (window.confirm("Tem certeza que deseja sair sem salvar?")) {
          onClose();
        }
      } else {
        onClose();
      }
    }
  };
  
  const handleCloseClick = () => {
    if (["RegistrarCliente", "RegistrarProduto", "RegistrarPedido"].includes(page)) {
      if (window.confirm("Tem certeza que deseja sair sem salvar?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  

  return (
    <div
      className="overlay"
      onClick={handleOverlayClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={`overlay-content ${
          page === "Pedidos em Aberto"
            ? "overlay-content-pedidos"
            : page === "Consultar"
            ? "overlay-content-consultar"
            : ""
        }`}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className="close-button" onClick={handleCloseClick}>
          <FaTimes size={24} />
        </button>
        {renderPageContent()}
      </div>
    </div>
  );
}

export default OverlayPage;
