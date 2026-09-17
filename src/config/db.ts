import { Pool } from "pg";
import 'dotenv/config';

// Aqui eu faço minha conexão com o backend e o banco!

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.on('connect', () => {
    console.log("Conectado ao banco PostgreSQL! Query bem sucedida!");  
})