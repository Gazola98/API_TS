import type { Usuario } from "../types/Usuario";
import { API_URL } from "../config/api";

const USUARIOS_URL = `${API_URL}/usuarios`;

export async function buscarUsuarios(): Promise<Usuario[]> {
  const response = await fetch(USUARIOS_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  const dados: Usuario[] = await response.json();

  return dados;
}

export async function criarUsuario(
novoUsuario: Omit<Usuario, "id">,
): Promise<Usuario> {
  const response = await fetch(USUARIOS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoUsuario),
  });

  if (!response.ok) {
    const erro = await response.json();

    throw new Error(erro.erro);
  }

  const usuarioCriado: Usuario = await response.json();

  return usuarioCriado;
}

export async function atualizarUsuario(
  id: number,
  dadosUsuario: Omit<Usuario, "id">
): Promise<Usuario> {
  const response = await fetch(`${USUARIOS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosUsuario),
  });

  if (!response.ok) {
    const erro = await response.json();

    throw new Error(erro.erro);
  }

  const usuarioAtualizado: Usuario = await response.json();

  return usuarioAtualizado;
}

export async function excluirUsuario(id: number): Promise<void> {
  const response = await fetch(`${USUARIOS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar usuário.");
  }
}
