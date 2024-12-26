import React, { useState, useEffect } from "react";
import "../styles/ListarPedidos.css";

const ListaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const mockPedidos = [
      {
        id: 1,
        customerName: "João Silva",
        deliveryDate: "2024-12-25T00:00:00.000Z",
        status: "Em Aberto",
        items: [
          { itemName: "Item A", quantity: 2 },
          { itemName: "Item B", quantity: 1 },
        ],
      },
      {
        id: 2,
        customerName: "Maria Oliveira",
        deliveryDate: "2024-12-26T00:00:00.000Z",
        status: "OK",
        items: [{ itemName: "Item C", quantity: 5 }],
      },
      {
        id: 3,
        customerName: "Carlos Pereira",
        deliveryDate: "2024-12-27T00:00:00.000Z",
        status: "Em Aberto",
        items: [{ itemName: "Item D", quantity: 3 }],
      },
    ];

    setTimeout(() => {
      setPedidos(mockPedidos);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(`Simulando exclusão do pedido com ID: ${id}`);
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));
      console.log("Pedido excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
    }
  };

  const handleChangeStatus = (id) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status: "OK" } : pedido
      )
    );
  };

  if (loading) {
    return <div>Carregando pedidos...</div>;
  }

  const filteredPedidos = pedidos.filter(
    (pedido) =>
      pedido.status === "Em Aberto" &&
      (pedido.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.id.toString().includes(searchTerm))
  );

  if (filteredPedidos.length === 0) {
    return <div>Nenhum pedido em aberto encontrado</div>;
  }

  return (
    <div className="lista-pedidos">
      <div className="lista-pedidos-container">
        <h2>Pedidos Em Aberto</h2>
        <input
          type="text"
          placeholder="Pesquisar por ID ou Nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="table-container">
          <table className="pedidos-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Data de Entrega</th>
                <th>Itens</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.customerName}</td>
                  <td>{new Date(pedido.deliveryDate).toLocaleDateString()}</td>
                  <td>
                    <ul>
                      {pedido.items.map((item, index) => (
                        <li key={index}>
                          {item.itemName} - {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{pedido.status}</td>
                  <td>
                    <button
                      className="change-status-button"
                      onClick={() => handleChangeStatus(pedido.id)}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    >
                      Marcar como OK
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(pedido.id)}
                      style={{ cursor: "pointer" }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaPedidos;
