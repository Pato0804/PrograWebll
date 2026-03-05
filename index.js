//este es el de route

import express from 'express';
import cors from 'cors';
import sequelize from './database.js';


import usuariosRouter from './usuarios.js';

const app=express();
const port=3000;


app.use(cors());
app.use(express.json());
console.log('Iniciando server...');
console.log('Conectando a la database...');

sequelize.authenticate()
.then(()=> console.log('Conectado al Mysql con sequelize'))
.catch(err=> console.error('Error de dase de datos',err));
app.use('/usuarios',usuariosRouter);

app.get('/',(req,res) =>{
    res.send('El backend si jalo brou');
});

app.listen(port,() =>{
    console.log(`Servidor corriendo en  http://localhost:${port}`);
});
