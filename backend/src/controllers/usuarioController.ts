import { Request, Response, NextFunction } from 'express';

import { buscarUsuarios as buscarTodosUsuarios } from '../services/usuarioService';
import { criarUsuario as criarUsuarioService } from '../services/usuarioService';
import { buscarUsuarioPorId as buscarUsuarioPorIdService } from '../services/usuarioService';
import { atualizarUsuario as atualizarUsuarioService } from '../services/usuarioService';
import { deletarUsuario as deletarUsuarioService } from '../services/usuarioService';
import { atualizarParcialmenteUsuario as atualizarParcialmenteUsuarioService } from '../services/usuarioService';


export async function buscarGeral(req: Request, res: Response, next: NextFunction) {
    try {
        const usuarios = await buscarTodosUsuarios();
        if(!usuarios) {
            return res.status(404).json({
                erro: 'Usuarios não encontrados'
            });
        }

        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }

}
export async function buscarUsuarioPorId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);

        const usuario = await buscarUsuarioPorIdService(id);

        if(!usuario) {
            return res.status(400).json({
                erro: 'Usuário não encontrado'
            });
        }

        res.status(200).json(usuario);

    } catch (error) {
        next(error);
    }
}

export async function criarUsuario(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { usuario, email, profissao, cidade, pais } = req.body;

        if (
            !usuario?.trim() ||
            !email?.trim() ||
            !profissao?.trim() ||
            !cidade?.trim() ||
            !pais?.trim()
        ) {
            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios!'
            });
        }

        const usuarioLimpo = usuario.trim();
        const emailLimpo = email.trim();
        const profissaoLimpa = profissao.trim();
        const cidadeLimpa = cidade.trim();
        const paisLimpo = pais.trim();

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);

        if (!emailValido) {
            return res.status(400).json({
                erro: 'Email inválido!'
            });
        }

        const usuarioCriado = await criarUsuarioService(
            usuarioLimpo,
            emailLimpo,
            profissaoLimpa,
            cidadeLimpa,
            paisLimpo
        );

        res.status(201).json(usuarioCriado);

    } catch (error) {
        next(error);
    }
}

export async function atualizarUsuario(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);

        const { usuario, email, profissao, cidade, pais } = req.body;

        if (
            !usuario?.trim() ||
            !email?.trim() ||
            !profissao?.trim() ||
            !cidade?.trim() ||
            !pais?.trim()
        ) {
            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios!'
            });
        }

        const usuarioLimpo = usuario.trim();
        const emailLimpo = email.trim();
        const profissaoLimpa = profissao.trim();
        const cidadeLimpa = cidade.trim();
        const paisLimpo = pais.trim();

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);

        if (!emailValido) {
            return res.status(400).json({
                erro: 'Email inválido!'
            });
        }

        const usuarioAtualizado = await atualizarUsuarioService(
            id,
            usuarioLimpo,
            emailLimpo,
            profissaoLimpa,
            cidadeLimpa,
            paisLimpo
        )

        if (!usuarioAtualizado) {
            return res.status(404).json({
                erro: 'Usuário não encontrado!'
            });
        }

        res.status(200).json(usuarioAtualizado);

    } catch (error) {
        next(error);
    }
}

export async function atualizarParcialmenteUsuario(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);

        const { usuario, email, profissao, cidade, pais } = req.body;

        const campos: string[] = [];
        const valores: string[] = [];

        if (usuario !== undefined) {
            if (typeof usuario !== 'string' || !usuario.trim()) {
                return res.status(400).json({
                    erro: 'O usuário deve ser uma string não vazia!'
                });
            }

            campos.push('usuario');
            valores.push(usuario.trim());
        }

        if (email !== undefined) {
            if (typeof email !== 'string' || !email.trim()) {
                return res.status(400).json({
                    erro: 'O email deve ser uma string não vazia!'
                });
            }

            const emailLimpo = email.trim();

            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);

            if (!emailValido) {
                return res.status(400).json({
                    erro: 'Email inválido!'
                });
            }

            campos.push('email');
            valores.push(emailLimpo);
        }

        if (profissao !== undefined) {
            if (typeof profissao !== 'string' || !profissao.trim()) {
                return res.status(400).json({
                    erro: 'A profissão deve ser uma string não vazia!'
                });
            }

            campos.push('profissao');
            valores.push(profissao.trim());
        }

        if (cidade !== undefined) {
            if (typeof cidade !== 'string' || !cidade.trim()) {
                return res.status(400).json({
                    erro: 'A cidade deve ser uma string não vazia!'
                });
            }

            campos.push('cidade');
            valores.push(cidade.trim());
        }

        if (pais !== undefined) {
            if (typeof pais !== 'string' || !pais.trim()) {
                return res.status(400).json({
                    erro: 'O país deve ser uma string não vazia!'
                });
            }

            campos.push('pais');
            valores.push(pais.trim());
        }

        if (campos.length === 0) {
            return res.status(400).json({
                erro: 'Nenhum campo foi enviado para atualização!'
            });
        }

        const usuarioAtualizado = await atualizarParcialmenteUsuarioService(
            id,
            campos,
            valores
        )
       
        if (!usuarioAtualizado) {
            return res.status(404).json({
                erro: 'Usuário não encontrado!'
            });
        }

        res.status(200).json(usuarioAtualizado);

    } catch (error) {
        next(error);
    }
}

export async function deletarUsuario(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);

        const usuarioDeletado = await deletarUsuarioService(id);


        if (usuarioDeletado === 0) {
            return res.status(404).json({
                erro: 'Usuário não encontrado!'
            });
        }

        res.status(200).json({
            message: 'Usuário deletado com sucesso!'
        });

    } catch (error) {
        next(error);
    }
}