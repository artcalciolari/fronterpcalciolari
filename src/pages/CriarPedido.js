import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../styles/CriarPedido.css";

const RegistrarPedido = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    orderNumber: "",
    deliveryDate: "",
    orderDate: "", 
    status: "Em Aberto", 
    items: [{ itemName: "", quantity: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemName: "", quantity: "" }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderCreateDto = {
      customerName: formData.customerName,
      orderNumber: parseInt(formData.orderNumber, 10),
      deliveryDate: new Date(formData.deliveryDate).toISOString(),
      orderDate: new Date(formData.orderDate).toISOString(),
      status: formData.status,
      items: formData.items.map((item) => ({
        itemName: item.itemName,
        quantity: parseInt(item.quantity, 10),
      })),
    };

    console.log("Enviando pedido:", orderCreateDto);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderCreateDto),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pedido");
      }

      console.log("Pedido criado com sucesso");
      setFormData({
        customerName: "",
        orderNumber: "",
        deliveryDate: "",
        orderDate: "",
        status: "Em Aberto",
        items: [{ itemName: "", quantity: "" }],
      });
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    }
  };

  return (
    <div className="registrar-pedido">
      <h2>Registrar Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Nome do Cliente</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Digite o nome do cliente"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="orderNumber">Número do Pedido</label>
          <input
            type="number"
            id="orderNumber"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            placeholder="Digite o número do pedido"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="orderDate">Pedido em </label>
          <input
            type="date"
            id="orderDate"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryDate">Data de Entrega</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Em Aberto">Em Aberto</option>
            <option value="OK">OK</option>
          </select>
        </div>

        <h3>Itens do Pedido</h3>
        <div className="items-container">
          {formData.items.map((item, index) => (
            <div className="item-group" key={index}>
              <div className="form-group">
                <input
                  type="text"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Nome do Item"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Quantidade"
                  required
                />
              </div>
              <button
                type="button"
                className="remove-item-button"
                onClick={() => handleRemoveItem(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="add-item-button" onClick={handleAddItem}>
          Adicionar Item
        </button>
        <button type="submit" className="submit-button">
          Registrar Pedido
        </button>
      </form>
    </div>
  );
};

export default RegistrarPedido;
