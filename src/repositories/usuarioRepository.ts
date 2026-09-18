import { pool } from "../config/db";

export async function buscarTodosUsuarios() {
    const result = await pool.query(
        'SELECT * FROM usuarios'
    );

    return result.rows ?? null;
}

export async function buscarUsuarioPorId(id: number) {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE id = $1',
        [id]
    );

    return result.rows[0] ?? null;
}

export async function buscarUsuarioPorEmail(email: string) {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1', [email]
    );

    return result.rows[0] ?? null;
}

export async function buscarUsuarioPorEmailIgnorandoId(email: string, id: number) {
    const result = await pool.query(
        `SELECT * FROM usuarios 
        WHERE email = $1
        AND id <> $2`, [email, id]
    );

    return result.rows[0] ?? null;
}

export async function criarUsuario(
    usuario: string,
    email: string,
    profissao: string,
    cidade: string,
    pais: string
) {
    const result = await pool.query(
        `INSERT INTO usuarios
        (usuario, email, profissao, cidade, pais)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
            usuario,
            email,
            profissao,
            cidade,
            pais
        ]
    );

    return result.rows[0];
}

export async function atualizarUsuario(
    id: number,
    usuario: string,
    email: string,
    profissao: string,
    cidade: string,
    pais: string
) {
    const result = await pool.query(
        `UPDATE usuarios
         SET usuario = $1,
             email = $2,
             profissao = $3,
             cidade = $4,
             pais = $5
         WHERE id = $6
         RETURNING *`,
           [
            usuario,
            email,
            profissao,
            cidade,
            pais,
            id
        ]
    );

    return result.rows[0] ?? null;
}

export async function atualizarParcialmenteUsuario(
    id: number,
    campos: string[],
    valores: string[]
) {
    const sets = campos.map((campo, index) => {
        return `${campo} = $${index + 1}`;
    });

    valores.push(String(id));

    const result = await pool.query(
        `UPDATE usuarios
         SET ${sets.join(', ')}
         WHERE id = $${valores.length}
         RETURNING *`,
        valores
    );

    return result.rows[0] ?? null;
}

export async function deletarUsuario(id: number) {
    const result = await pool.query(
        'DELETE FROM usuarios WHERE id = $1',
        [id]
    );

    return result.rowCount;
}