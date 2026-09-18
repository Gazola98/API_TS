import { Router } from "express";

import {
    criarUsuario,
    buscarUsuarioPorId,
    atualizarUsuario,
    atualizarParcialmenteUsuario,
    deletarUsuario,
    buscarGeral
} from '../controllers/usuarioController';

import { validarId } from '../middleware/validarId';

const router = Router();

router.get('/usuarios', buscarGeral);

router.post('/usuarios', criarUsuario);

router.get('usuarios/:id', validarId, buscarUsuarioPorId);

router.put('/usuarios/:id', validarId, atualizarUsuario);

router.patch('/usuarios/:id', validarId, atualizarParcialmenteUsuario);

router.delete('/usuarios/:id', validarId, deletarUsuario);

export default router;