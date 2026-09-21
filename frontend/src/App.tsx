import { useEffect, useState, type FormEvent } from "react";
import type { Usuario } from "./types/Usuario";

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Erros
  const [erro, setErro] = useState<string | null>(null);
  const [erroDelete, setErroDelete] = useState<string | null>(null);
  const [deletandoId, setDeletandoId] = useState<number | null>(null);
  const [erroCadastro, setErroCadastro] = useState<string | null>(null);

  // estados do formulário
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [profissao, setProfissao] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const response = await fetch("http://localhost:3000/api/usuarios");

        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }

        const dados: Usuario[] = await response.json();

        setUsuarios(dados);
      } catch (error) {
        setErro("Não foi possível carregar os usuários.");
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuarios();
  }, []);

  async function deletarUsuario(id: number) {
    setErroDelete(null);
    setDeletandoId(id);

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar usuário.");
      }

      setUsuarios((usuariosAtuais) =>
        usuariosAtuais.filter((usuario) => usuario.id !== id),
      );
    } catch (error) {
      setErroDelete("Não foi possível excluir o usuário.");
    } finally {
      setDeletandoId(null);
    }
  }

  async function cadastrarUsuario(event: FormEvent) {
    event.preventDefault();

    setErroCadastro(null);

    try {
      const novoUsuario = {
        usuario,
        email,
        profissao,
        cidade,
        pais,
      };

      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (!response.ok) {
        const erro = await response.json();

        throw new Error(erro.message);
      }

      const novoUsuarioCriado: Usuario = await response.json();

      setUsuarios((usuariosAtuais) => [...usuariosAtuais, novoUsuarioCriado]);

      setUsuario("");
      setEmail("");
      setProfissao("");
      setCidade("");
      setPais("");
    } catch (error) {
      if (error instanceof Error) {
        setErroCadastro(error.message);
      }
    }
  }

  return (
    <div>
      <h1>Usuários</h1>

      {carregando && <p>Carregando usuários...</p>}

      {erro && <p>{erro}</p>}

      {erroDelete && <p>{erroDelete}</p>}

      {erroCadastro && <p>{erroCadastro}</p>}

      <form onSubmit={cadastrarUsuario}>
        <div>
          <label>Usuário</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Profissão</label>
          <input
            type="text"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
          />
        </div>

        <div>
          <label>Cidade</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>

        <div>
          <label>País</label>
          <input
            type="text"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {!carregando && !erro && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuário</th>
              <th>Email</th>
              <th>Profissão</th>
              <th>Cidade</th>
              <th>País</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.email}</td>
                <td>{usuario.profissao}</td>
                <td>{usuario.cidade}</td>
                <td>{usuario.pais}</td>

                <td>
                  <button
                    disabled={deletandoId === usuario.id}
                    onClick={() => {
                      const confirmar = window.confirm(
                        `Deseja realmente excluir o usuário ${usuario.usuario}?`,
                      );

                      if (confirmar) {
                        deletarUsuario(usuario.id);
                      }
                    }}
                  >
                    {deletandoId === usuario.id ? "Excluindo..." : "Excluir"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
