import express from 'express';
import cors from 'cors';
import sequelize from './database.js';
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

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

sequelize.authenticate()
.then(()=> console.log('Conectado al Mysql con sequelize'))
.catch(err=> console.error('Error de dase de datos',err));
app.use('/usuarios',usuariosRouter);
app.use('/tipo_usuarios',TipoUsuariosRouter);
app.use('/amistades',amistadesRouter);
app.use('/categorias',categoriasRouter);
app.use('/comentarios',comentariosRouter);
app.use('/mundiales',mundialesRouter);
app.use('/notificaciones',notificacionesRouter);
app.use('/publicaciones',publicacionesRouter);
app.use('/reacciones',reaccionesRouter);
app.use('/suscripciones_mundiales',suscripcionesRouter);


app.use('/usuarios', usuariosRouter);
app.use('/mundiales', mundialesRouter); 

app.listen(port,() =>{
    console.log(`Servidor corriendo en  http://localhost:${port}`);
});