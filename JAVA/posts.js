import express from 'express';
import { Op } from 'sequelize'; 
import Post from '../ORM/postsORM.js';
import Subscription from '../ORM/subscriptionsORM.js'; 

const router = express.Router();

// Ruta para obtener el feed de publicaciones (GET)
router.get('/feed/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Primero, obtenemos los mundiales a los que el usuario está suscrito
        const userSubs = await Subscription.findAll({
            where: { id_user: userId }
        });
        
        // Extraemos solo los IDs de esos mundiales
        const subscribedWorldCupIds = userSubs.map(sub => sub.id_world_cup);

        // Luego, buscamos los posts que sean del usuario o de los mundiales a los que está suscrito
        const posts = await Post.findAll({
            where: {
                [Op.or]: [
                    { id_user: userId }, // Posts hechos por el usuario
                    { id_world_cup: { [Op.in]: subscribedWorldCupIds } } // Posts de mundiales que sigo
                ]
            },
            order: [['created_at', 'DESC']] 
        });

        res.json(posts);
    } catch (error) {
        console.error("Error al generar el feed:", error);
        res.status(500).json({ error: 'Error al cargar el muro' });
    }
});

// ruta para crear un nuevo post (POST)
router.post('/', async (req, res) => {
    try {
        const { title, content, id_user, id_world_cup, id_category,image_url,
            video_url } = req.body;
        
        const newPost = await Post.create({
            title,
            content,
            id_user,
            id_world_cup,
            id_category,image_url,
            video_url
        });
        
        res.status(200).send('Post created succesfully boi');
    } catch (error) {
        console.error("Error al crear post:", error);
        res.status(500).json({ error: 'No se pudo guardar la publicación' });
    }

    // Obtiene publicaciones de un mundial específico
router.get('/worldcup/:worldCupId', async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { id_world_cup: req.params.worldCupId },
            order: [['created_at', 'DESC']]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener posts del mundial' });
    }
});

});

export default router;