//este es el de route

import express from 'express';
import cors from 'cors';
import sequelize from './database.js';

import usuariosRouter from './usuarios.js';
import mundialesRouter from './rutasMundiales.js'; 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

sequelize.authenticate()
.then(()=> console.log('Conectado al Mysql con sequelize'))
.catch(err=> console.error('Error de dase de datos',err));

app.use('/usuarios', usuariosRouter);
app.use('/mundiales', mundialesRouter); 

app.listen(port,() =>{
    console.log(`Servidor corriendo en  http://localhost:${port}`);
});