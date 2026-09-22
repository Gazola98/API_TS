import { useEffect, useState, type FormEvent } from "react";
import type { Usuario } from "./types/Usuario";

import UsuarioTable from "./components/UsuarioTable";
import UsuarioForm from "./components/UsuarioForm";

import {
  buscarUsuarios,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
} from "./services/usuarioService";

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [deletandoId, setDeletandoId] = useState<number | null>(null);

  // Estados do formulário
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [profissao, setProfissao] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const dados = await buscarUsuarios();

        setUsuarios(dados);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }

    carregarUsuarios();
  }, []);

  async function deletarUsuario(id: number) {
    setDeletandoId(id);

    try {
      await excluirUsuario(id);

      setUsuarios((usuariosAtuais) =>
        usuariosAtuais.filter((usuario) => usuario.id !== id),
      );
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    } finally {
      setDeletandoId(null);
    }
  }

  async function cadastrarUsuario(event: FormEvent) {
    event.preventDefault();

    try {
      const novoUsuario = {
        usuario,
        email,
        profissao,
        cidade,
        pais,
      };

      if (editandoId === null) {
        const usuarioCriado = await criarUsuario(novoUsuario);

        setUsuarios((usuariosAtuais) => [
          ...usuariosAtuais,
          usuarioCriado,
        ]);
      } else {
        const usuarioAtualizado = await atualizarUsuario(
          editandoId,
          novoUsuario,
        );

        setUsuarios((usuariosAtuais) =>
          usuariosAtuais.map((usuarioAtual) =>
            usuarioAtual.id === usuarioAtualizado.id
              ? usuarioAtualizado
              : usuarioAtual,
          ),
        );
      }

      limparFormulario();
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  }

  function editarUsuario(usuario: Usuario) {
    setEditandoId(usuario.id);

    setUsuario(usuario.usuario);
    setEmail(usuario.email);
    setProfissao(usuario.profissao);
    setCidade(usuario.cidade);
    setPais(usuario.pais);

    setModalAberto(true);
  }

  function limparFormulario() {
    setUsuario("");
    setEmail("");
    setProfissao("");
    setCidade("");
    setPais("");
    setEditandoId(null);
  }

  function cancelarEdicao() {
    limparFormulario();
    setModalAberto(false);
  }

  function abrirModalNovoUsuario() {
    limparFormulario();
    setModalAberto(true);
  }

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 p-4 text-3xl font-bold text-gray-700">
          Usuários
        </h1>

        <button
          onClick={abrirModalNovoUsuario}
          className="mb-6 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          + Novo usuário
        </button>

        <UsuarioTable
          usuarios={usuarios}
          deletandoId={deletandoId}
          deletarUsuario={deletarUsuario}
          editarUsuario={editarUsuario}
        />

        {modalAberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="relative w-full max-w-2xl">
              <button
                type="button"
                onClick={cancelarEdicao}
                className="absolute right-4 top-4 z-10 text-2xl font-bold text-gray-500 transition hover:text-gray-800"
                aria-label="Fechar"
              >
                ×
              </button>

              <UsuarioForm
                usuario={usuario}
                email={email}
                profissao={profissao}
                cidade={cidade}
                pais={pais}
                setUsuario={setUsuario}
                setEmail={setEmail}
                setProfissao={setProfissao}
                setCidade={setCidade}
                setPais={setPais}
                editandoId={editandoId}
                cadastrarUsuario={cadastrarUsuario}
                cancelarEdicao={cancelarEdicao}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;