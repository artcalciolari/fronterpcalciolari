import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    const mockPedidos = [
      {
        orderNumber: 1,
        customerName: "João Silva",
        orderDate: "2024-12-15", 
        deliveryDate: "2024-12-18",
        status: "Em Aberto", 
        items: [
          { name: "Produto A", quantity: 2 },
          { name: "Produto B", quantity: 1 },
        ],
      },
      {
        orderNumber: 2,
        customerName: "Maria Souza",
        orderDate: "2024-12-14",
        deliveryDate: "2024-12-17",
        status: "OK",
        items: [{ name: "Produto C", quantity: 3 }],
      },
      {
        orderNumber: 3,
        customerName: "Carlos Pereira",
        orderDate: "2024-12-13",
        deliveryDate: "2024-12-16",
        status: "Em Aberto",
        items: [
          { name: "Produto D", quantity: 1 },
          { name: "Produto E", quantity: 4 },
        ],
      },
    ];
    setPedidos(mockPedidos);
  }, []);

  const handleEditClick = (index) => {
    setEditingRow(index);
  };

  const handleSaveClick = () => {
    setEditingRow(null);
  };

  const handleDeleteClick = (orderNumber) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este pedido?");
    if (confirmDelete) {
      const updatedPedidos = pedidos.filter((pedido) => pedido.orderNumber !== orderNumber);
      setPedidos(updatedPedidos);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido, i) =>
        i === index ? { ...pedido, [name]: value } : pedido
      )
    );
  };

  return (
    <div className="pedidos">
      <h2>Pedidos</h2>
      <table>
        <thead>
          <tr>
            <th>Número do Pedido</th>
            <th>Cliente</th>
            <th>Pedido em </th>
            <th>Data de Entrega</th>
            <th>Status</th>
            <th>Itens</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido, index) => (
              <tr key={index}>
                <td>{pedido.orderNumber}</td>
                <td>
                  {editingRow === index ? (
                    <input
                      type="text"
                      name="customerName"
                      value={pedido.customerName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    pedido.customerName
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <input
                      type="date"
                      name="orderDate"
                      value={pedido.orderDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    pedido.orderDate
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <input
                      type="date"
                      name="deliveryDate"
                      value={pedido.deliveryDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    pedido.deliveryDate
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <select
                      name="status"
                      value={pedido.status}
                      onChange={(e) => handleChange(e, index)}
                    >
                      <option value="Em Aberto">Em Aberto</option>
                      <option value="OK">OK</option>
                    </select>
                  ) : (
                    pedido.status
                  )}
                </td>
                <td>
                  <ul>
                    {(pedido.items || []).map((item, idx) => (
                      <li key={idx}>{`${item.name} (Quantidade: ${item.quantity})`}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {editingRow === index ? (
                    <button onClick={handleSaveClick} style={{ marginRight: "10px", cursor: "pointer" }}>
                      <FaSave /> Salvar
                    </button>
                  ) : (
                    <button onClick={() => handleEditClick(index)} style={{ marginRight: "10px", cursor: "pointer" }}>
                      <FaEdit /> Editar
                    </button>
                  )}
                  <button onClick={() => handleDeleteClick(pedido.orderNumber)} style={{ cursor: "pointer" }}>
                    <FaTrash /> Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Nenhum pedido encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Pedidos;
