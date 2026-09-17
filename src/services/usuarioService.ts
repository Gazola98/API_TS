import { pool } from '../config/db';
import { buscarUsuarioPorId as buscarUsuarioPorIdRepository, 
        criarUsuario as criarUsuarioRepository, 
        atualizarUsuario as atualizarUsuarioRepository,
        atualizarParcialmenteUsuario as atualizarParcialmenteUsuarioRepository,
        deletarUsuario as deletarUsuarioRepository
    } from '../repositories/usuarioRepository';


export async function criarUsuario(
    usuario: string,
    email: string,
    profissao: string,
    cidade: string,
    pais: string
) {
    const usuarioCriado = await criarUsuarioRepository(
        usuario,
        email,
        profissao,
        cidade,
        pais
    )

    return usuarioCriado;
}

export async function buscarUsuarioPorId(id: number) {
    const usuario = await buscarUsuarioPorIdRepository(id);

    return usuario;
}

export async function atualizarUsuario(
    id: number,
    usuario: string,
    email: string,
    profissao: string,
    cidade: string,
    pais: string
) {
    const usuarioAtualizado = await atualizarUsuarioRepository(
        id,
        usuario,
        email,
        profissao,
        cidade,
        pais
    );

    return usuarioAtualizado;
}

export async function atualizarParcialmenteUsuario(
    id: number,
    campos: string[],
    valores: string[]
) {
    const usuarioAtualizado = await atualizarParcialmenteUsuarioRepository(
        id,
        campos,
        valores
    )

    return usuarioAtualizado;
}

export async function deletarUsuario(id: number) {
    const usuarioDeletado = await deletarUsuarioRepository(id);

    return usuarioDeletado;
}