import { Router } from "express";

import {
    criarUsuario,
    buscarUsuarioPorId,
    atualizarUsuario,
    atualizarParcialmenteUsuario,
    deletarUsuario
} from '../controllers/usuarioController';

import { validarId } from '../middleware/validarId';

const router = Router();

router.post('/usuarios', criarUsuario);

router.get('usuarios/:id', validarId, buscarUsuarioPorId);

router.put('/usuarios', validarId, atualizarUsuario);

router.patch('/usuarios', validarId, atualizarParcialmenteUsuario);

router.delete('/usuarios', validarId, deletarUsuario);

export default router;