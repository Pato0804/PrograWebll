import express from 'express';
import cors from 'cors';
import sequelize from './database.js';

// Importación EXCLUSIVA de Rutas desde tu carpeta JAVA (Los meseros)
import usersRoutes from './JAVA/users.js';
import userTypesRoutes from './JAVA/userTypes.js';
import friendshipsRoutes from './JAVA/friendships.js';
import categoriesRoutes from './JAVA/categories.js';
import commentsRoutes from './JAVA/comments.js';
import notificationsRoutes from './JAVA/notifications.js';
import postsRoutes from './JAVA/posts.js';
import reactionsRoutes from './JAVA/reactions.js';
import subscriptionsRoutes from './JAVA/subscriptions.js';

// Rutas de Mundiales
import worldCupSearchRoutes from './JAVA/worldCupRoutes.js'; 
import worldCupsRoutes from './JAVA/worldCups.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

console.log('Starting server...');
console.log('Connecting to database...');

// Verificación de conexión
sequelize.authenticate()
    .then(() => console.log('Connected to MySQL with Sequelize (DB: webprog2)'))
    .catch(err => console.error('Error connecting to the database:', err));

// Registro de Endpoints
app.use('/world-cups', worldCupSearchRoutes); 
app.use('/world-cups', worldCupsRoutes);
app.use('/users', usersRoutes);
app.use('/user-types', userTypesRoutes);
app.use('/friendships', friendshipsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/comments', commentsRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/posts', postsRoutes);
app.use('/reactions', reactionsRoutes);
app.use('/subscriptions', subscriptionsRoutes);

app.get('/', (req, res) => {
    res.send('MundiConnect Backend is running smoothly!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});