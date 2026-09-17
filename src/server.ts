import express from 'express';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api', userRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
})