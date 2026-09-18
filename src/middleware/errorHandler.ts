import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(error);

    if(error.code === '23505') {
        return res.status(409).json({
            erro: 'Este email já está cadastrado!'
        });
    }

    if(error.message === 'EMAIL_JA_CADASTRADO') {
        return res.status(404).json({
            erro: 'Este email já está cadastrado!'
        });
    }

    res.status(500).json({
        erro: 'Erro interno no servidor!'
    });
}