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

 

});
   
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



router.put('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, id_user } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        
        if (post.id_user != id_user) {
            return res.status(403).json({ error: 'No tienes permiso para editar este post' });
        }

        await post.update({
            title,
            content
        });

        res.json({ message: 'Post actualizado correctamente' });

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el post' });
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { id_user } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        
        if (post.id_user != id_user) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar este post' });
        }

        await post.destroy();

        res.json({ message: 'Post eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
});
export default router;
