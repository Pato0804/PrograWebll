import express from 'express';
import cors from 'cors';
import sequelize from './database.js';
<<<<<<< HEAD


import usersRouter from './usuarios.js';
import TypeUserRouter from './tipo_usuarios.js';
import friendshipsRouter from './amistades.js';
import categoriesRouter from './categorias.js';
import commentsRouter from './comentarios.js';
import worldcupsRouter from './mundiales.js';
import notificationsRouter from './notificaciones.js';
import postRouter from './publicaciones.js';
import reactionsRouter from './reacciones.js';
import subscriptionsRouter from './suscripciones_mundiales.js';
=======
import mundialesRouter from './rutasMundiales.js'; 
import usuariosRouter from './usuarios.js';
import TipoUsuariosRouter from './tipo_usuarios.js';
import amistadesRouter from './amistades.js';
import categoriasRouter from './categorias.js';
import comentariosRouter from './comentarios.js';
import mundialesRouter from './mundiales.js';
import notificacionesRouter from './notificaciones.js';
import publicacionesRouter from './publicaciones.js';
import reaccionesRouter from './reacciones.js';
import suscripcionesRouter from './suscripciones_mundiales.js';
>>>>>>> d99d68c4dccc57518ece6e47e855991f56c784a1

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
console.log('Starting server...');
console.log('Conecting to database...');
=======
>>>>>>> d99d68c4dccc57518ece6e47e855991f56c784a1

sequelize.authenticate()
.then(()=> console.log('Conected to Mysql with sequelize'))
.catch(err=> console.error('Error in database',err));
app.use('/usuarios',usersRouter);
app.use('/tipo_usuarios',TypeUserRouter);
app.use('/amistades',friendshipsRouter);
app.use('/categorias',categoriesRouter);
app.use('/comentarios',commentsRouter);
app.use('/mundiales',worldcupsRouter);
app.use('/notificaciones',notificationsRouter);
app.use('/publicaciones',postRouter);
app.use('/reacciones',reactionsRouter);
app.use('/suscripciones_mundiales',subscriptionsRouter);


<<<<<<< HEAD
app.get('/',(req,res) =>{
    res.send('the backend works broski');
});

app.listen(port,() =>{
    console.log(`Server running on  http://localhost:${port}`);
});
=======
app.use('/usuarios', usuariosRouter);
app.use('/mundiales', mundialesRouter); 

app.listen(port,() =>{
    console.log(`Servidor corriendo en  http://localhost:${port}`);
});
>>>>>>> d99d68c4dccc57518ece6e47e855991f56c784a1
