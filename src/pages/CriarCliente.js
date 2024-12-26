import React, { useState } from "react";
import "../styles/CriarCliente.css";

const CriarCliente = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cliente criado:", formData);
    // Aqui da pra enviar os dados para API 
    setFormData({ name: "", phone: "", email: "", address: "" });
  };

  return (
    <div className="criar-cliente">
      <h2>Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Digite o telefone"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite o email (opcional)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Digite o endereço (opcional)"
          />
        </div>
        <button type="submit" className="submit-button">Criar</button>
      </form>
    </div>
  );
};

export default CriarCliente;
