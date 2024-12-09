import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [livros, setLivros] = useState([]);

  async function loadata() {
    const resposta = await fetch("http://localhost:3000/livros");
    const dados = await resposta.json();
    setLivros(dados);
  }

  async function excluirlivro(id) {
    const resposta = await fetch(`http://localhost:3000/livros/${id}` ,{
      method: "DELETE"
    }); 
    
  }

  async function editarlivro(id) {
    const titulo = window.prompt("Digite um novo titulo");
    await fetch(`http://localhost:3000/livros/${id}` ,{
      method: "PUT",
      headers: {"content-type": "application/json"},
      body:JSON.stringify({titulo})
  });
  loadata();

  }
  

  useEffect(() => {
    loadata();
  }, []);

  return (
    <div>
      <h1>Livros</h1>

      <table>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.paginas}</td>
              <td>{livro.categoria}</td>
              <td>
                <button onClick={() => editarlivro(livro.id)}><strong> Editar </strong> </button>
              </td>
              <td>
                <button onClick={() => excluirlivro(livro.id)}><strong> Excluir </strong> </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
