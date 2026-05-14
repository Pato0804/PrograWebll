import express from 'express';
import { Op } from 'sequelize'; 
import Post from '../ORM/postsORM.js';
import Subscription from '../ORM/subscriptionsORM.js'; 
import User from '../ORM/usersORM.js'; // IMPORTAMOS EL MODELO USER
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// DEFINIMOS LA RELACIÓN (Un Post pertenece a un User)
Post.belongsTo(User, { foreignKey: 'id_user' });

// Ruta para obtener el feed de publicaciones (GET)
router.get('/feed/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const userSubs = await Subscription.findAll({
            where: { id_user: userId }
        });
        
        const subscribedWorldCupIds = userSubs.map(sub => sub.id_world_cup);

        const posts = await Post.findAll({
            where: {
                [Op.or]: [
                    { id_user: userId }, 
                    { id_world_cup: { [Op.in]: subscribedWorldCupIds } } 
                ]
            },
            // AGREGAMOS EL CRUCE DE DATOS CON USER
            include: [{ model: User, attributes: ['full_name', 'photo_url'] }],
            order: [['created_at', 'DESC']] 
        });

        res.json(posts);
    } catch (error) {
        console.error("Error al generar el feed:", error);
        res.status(500).json({ error: 'Error al cargar el muro' });
    }
});

// ruta para crear un nuevo post (POST)
router.post('/', upload.array('media', 10), async (req, res) => {
    try {
        const { title, content, id_user, id_world_cup, id_category } = req.body;
        let media_urls = [];

        if(req.files && req.files.length > 0){
            req.files.forEach(file=>{
                const mediaType = file.mimetype.startsWith("image") ? "image" : "video";
                media_urls.push({
                    type: mediaType,
                    url: `/uploads/${file.filename}`
                });
            });
        }

        await Post.create({
            title, content, id_user, id_world_cup, id_category,
            media_urls: JSON.stringify(media_urls)
        });

        res.status(200).send("Post creado");
    } catch(error){
        console.error(error);
        res.status(500).json({ error:"No se pudo guardar" });
    }
});
   
router.get('/worldcup/:worldCupId', async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { id_world_cup: req.params.worldCupId },
            // AGREGAMOS EL CRUCE DE DATOS CON USER
            include: [{ model: User, attributes: ['full_name', 'photo_url'] }],
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

        if (!post) { return res.status(404).json({ error: 'Post no encontrado' }); }
        if (post.id_user != id_user) { return res.status(403).json({ error: 'No tienes permiso para editar este post' }); }

        await post.update({ title, content });
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

        if (!post) { return res.status(404).json({ error: 'Post no encontrado' }); }
        if (post.id_user != id_user) { return res.status(403).json({ error: 'No tienes permiso para eliminar este post' }); }

        await post.destroy();
        res.json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
});

export default router;