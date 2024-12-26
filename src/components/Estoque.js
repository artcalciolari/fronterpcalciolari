import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function Estoque() {
  const [estoque, setEstoque] = useState([]);
  const [editingRow, setEditingRow] = useState(null); 
  const [reabastecendoItem, setReabastecendoItem] = useState(null); 
  const [abatendoItem, setAbatendoItem] = useState(null); 

  useEffect(() => {
    const mockEstoque = [
      { codigo: "AR123", nome: "Arroz", quantidade: 50 },
      { codigo: "DE456", nome: "Detergente", quantidade: 30 },
      { codigo: "OL789", nome: "Óleo de cozinha", quantidade: 20 },
    ];
    setEstoque(mockEstoque);
  }, []);

  const handleEditClick = (index) => {
    setEditingRow(index);
  };

  const handleSaveClick = () => {
    setEditingRow(null);
  };

  const handleReabastecerClick = (item) => {
    setReabastecendoItem({ ...item, quantidadeAdicionada: "" });
  };

  const handleAbaterClick = (item) => {
    setAbatendoItem({ ...item, quantidadeAbatida: "" });
  };

  const handleReabastecerSubmit = (e) => {
    e.preventDefault();
    const updatedEstoque = estoque.map((item) =>
      item.codigo === reabastecendoItem.codigo
        ? {
            ...item,
            quantidade:
              Number(item.quantidade) +
              Number(reabastecendoItem.quantidadeAdicionada || 0),
          }
        : item
    );
    setEstoque(updatedEstoque);
    setReabastecendoItem(null);
  };

  const handleAbaterSubmit = (e) => {
    e.preventDefault();
    const updatedEstoque = estoque.map((item) =>
      item.codigo === abatendoItem.codigo
        ? {
            ...item,
            quantidade: Math.max(
              0,
              Number(item.quantidade) - Number(abatendoItem.quantidadeAbatida || 0)
            ),
          }
        : item
    );
    setEstoque(updatedEstoque);
    setAbatendoItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstoque((prevEstoque) =>
      prevEstoque.map((item, index) =>
        index === editingRow ? { ...item, [name]: value } : item
      )
    );
  };

  return (
    <div className="estoque">
      <h2>Estoque</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((item, index) => (
            <tr key={index}>
              <td>{item.codigo}</td>
              <td>
                {editingRow === index ? (
                  <input
                    type="text"
                    name="nome"
                    value={item.nome}
                    onChange={handleChange}
                  />
                ) : (
                  item.nome
                )}
              </td>
              <td>{item.quantidade}</td> {/* Estoque não é editável */}
              <td>
                {editingRow === index ? (
                  <button onClick={handleSaveClick}>
                    <FaSave /> Salvar
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(index)}>
                    <FaEdit /> Editar
                  </button>
                )}
                <button onClick={() => handleReabastecerClick(item)}>
                  <FaPlusCircle /> Reabastecer
                </button>
                <button onClick={() => handleAbaterClick(item)}>
                  <FaMinusCircle /> Abater
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reabastecendoItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reabastecer Estoque</h3>
            <form onSubmit={handleReabastecerSubmit}>
              <div>
                <label>Nome: </label>
                <span>{reabastecendoItem.nome}</span>
              </div>
              <div>
                <label>Adicionar:</label>
                <input
                  type="number"
                  name="quantidadeAdicionada"
                  value={reabastecendoItem.quantidadeAdicionada || ""}
                  onChange={(e) =>
                    setReabastecendoItem({
                      ...reabastecendoItem,
                      quantidadeAdicionada: e.target.value,
                    })
                  }
                />
              </div>
              <button type="submit">Confirmar</button>
              <button type="button" onClick={() => setReabastecendoItem(null)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {abatendoItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>Abater Estoque</h3>
            <form onSubmit={handleAbaterSubmit}>
              <div>
                <label>Nome: </label>
                <span>{abatendoItem.nome}</span>
              </div>
              <div>
                <label>Abater:</label>
                <input
                  type="number"
                  name="quantidadeAbatida"
                  value={abatendoItem.quantidadeAbatida || ""}
                  onChange={(e) =>
                    setAbatendoItem({
                      ...abatendoItem,
                      quantidadeAbatida: e.target.value,
                    })
                  }
                />
              </div>
              <button type="submit">Confirmar</button>
              <button type="button" onClick={() => setAbatendoItem(null)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Estoque;
