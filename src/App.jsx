import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [livros, setLivros] = useState([]);
  const { handleSubmit, register, reset} = useForm();


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

  async function salvarLivro(dados) {
    await fetch("http://localhost:3000/livros", {
      method: "Post",
      headers: {"content-type": "application/json"},
      body:JSON.stringify({dados})
    });
    loadata();
    reset();
    
  }
  

  useEffect(() => {
    loadata();
  }, []);

  return (
    <div>
      <h1><strong> Livros </strong></h1>

      <form onSubmit={handleSubmit(salvarLivro)}>
        <div>
          <label htmlFor="titulo">Titulo</label> <br />
          <input type="text" id="titulo" {...register("titulo")} />
        </div>
        <div>
          <label htmlFor="autor">Autor</label> <br />
          <input type="text" id="autor" {...register("autor")} />
        </div>
        <div>
          <label htmlFor="paginas">Paginas</label> <br />
          <input type="text" id="paginas" {...register("paginas")} />
        </div>
        <div>
          <label htmlFor="categoria">Categoria</label> <br />
          <select id="categoria" {...register("categoria")}>
            <option value="Ação">Ação</option>
            <option value="Terror">Terror</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div>
          <label htmlFor="dataPublicacao">Data de Publicacao</label> <br />
          <input type="text" id="dataPublicacao" {...register("dataPublicacao")} />
        </div>
        <div>
          <label htmlFor="isbn">ISBN</label> <br />
          <input type="text" id="isbn" {...register("isbn")} />
        </div>
        <button>
          Adicionar
        </button>
      </form> <br />

      

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
