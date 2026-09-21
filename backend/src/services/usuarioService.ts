import {buscarTodosUsuarios as buscarTodosUsuarios, 
        buscarUsuarioPorId as buscarUsuarioPorIdRepository, 
        buscarUsuarioPorEmail as buscarUsuarioPorEmailRepository,
        buscarUsuarioPorEmailIgnorandoId as buscarUsuarioPorEmailIgnorandoIdRepository,
        criarUsuario as criarUsuarioRepository, 
        atualizarUsuario as atualizarUsuarioRepository,
        atualizarParcialmenteUsuario as atualizarParcialmenteUsuarioRepository,
        deletarUsuario as deletarUsuarioRepository
    } from '../repositories/usuarioRepository';


export async function buscarUsuarios() {

    const usuariosExistentes = await buscarTodosUsuarios();

    return usuariosExistentes;
}

export async function criarUsuario(
    usuario: string,
    email: string,
    profissao: string,
    cidade: string,
    pais: string
) {
    const usuarioExistente = await buscarUsuarioPorEmailRepository(email);

    if(usuarioExistente) {
        throw new Error('EMAIL_JA_CADASTRADO');
    }

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
    const usuarioComEmail = await buscarUsuarioPorEmailIgnorandoIdRepository(email, id);

    if(usuarioComEmail) {
        throw new Error('EMAIL_JA_CADASTRADO');
    }

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
    const indiceEmail = campos.indexOf('email');

    if(indiceEmail !== -1) {
        const email = valores[indiceEmail];

        const usuarioComEmail = await buscarUsuarioPorEmailIgnorandoIdRepository(email, id);

        if(usuarioComEmail) {
            throw new Error('EMAIL_JA_CADASTRADO');
        }
    }
    
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