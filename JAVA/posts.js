import express from 'express';
import { Op, Sequelize } from 'sequelize'; 
import Post from '../ORM/postsORM.js';
import Subscription from '../ORM/subscriptionsORM.js'; 
import User from '../ORM/usersORM.js'; 
import Friendship from '../ORM/friendshipsORM.js';
import multer from 'multer';
import { verificarToken } from '../JAVA/middlewares/authMiddleware.js';

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

// Relaciones
Post.belongsTo(User, { foreignKey: 'id_user' });


//feed de publicaciones
router.get('/feed/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const filter = req.query.filter || 'recent'; 
        
        const userSubs = await Subscription.findAll({
            where: { id_user: userId }
        });
        
        const subscribedWorldCupIds = userSubs.map(sub => sub.id_world_cup);

        let whereClause = {
            [Op.or]: [
                { id_user: userId }, 
                { id_world_cup: { [Op.in]: subscribedWorldCupIds } } 
            ]
        };

        if (filter === 'friends') {
            const friendships = await Friendship.findAll({
                where: {
                    [Op.or]: [{ requester_id: userId }, { receiver_id: userId }],
                    status: { [Op.in]: ['accepted', 'aceptada'] } 
                }
            });
            
            const friendIds = friendships.map(f => f.requester_id == userId ? f.receiver_id : f.requester_id);
            friendIds.push(userId); 

            whereClause = { id_user: { [Op.in]: friendIds } }; 
        }

        let orderClause = [['created_at', 'DESC']]; 

        if (filter === 'oldest') {
            orderClause = [['created_at', 'ASC']];
        } else if (filter === 'popular') {
            orderClause = [[Sequelize.literal('(SELECT COUNT(*) FROM reactions WHERE reactions.id_post = Post.id_post AND reactions.type = "like")'), 'DESC']];
        }

        const posts = await Post.findAll({
            where: whereClause,
            include: [{ model: User, attributes: ['full_name', 'photo_url'] }],
            order: orderClause 
        });

        res.json(posts);
    } catch (error) {
        console.error("Error al generar el feed:", error);
        res.status(500).json({ error: 'Error al cargar el muro' });
    }
});
   
//obtener posts de un mundial filtro
router.get('/worldcup/:worldCupId', async (req, res) => {
    try {
        const filter = req.query.filter || 'recent';
        const userId = req.query.userId; 

        let whereClause = { id_world_cup: req.params.worldCupId };

        if (filter === 'friends' && userId) {
            const friendships = await Friendship.findAll({
                where: {
                    [Op.or]: [{ requester_id: userId }, { receiver_id: userId }],
                    status: { [Op.in]: ['accepted', 'aceptada'] }
                }
            });
            
            const friendIds = friendships.map(f => f.requester_id == userId ? f.receiver_id : f.requester_id);
            friendIds.push(userId);

            whereClause.id_user = { [Op.in]: friendIds }; 
        }

        let orderClause = [['created_at', 'DESC']];

        if (filter === 'oldest') {
            orderClause = [['created_at', 'ASC']];
        } else if (filter === 'popular') {
            orderClause = [[Sequelize.literal('(SELECT COUNT(*) FROM reactions WHERE reactions.id_post = Post.id_post AND reactions.type = "like")'), 'DESC']];
        }

        const posts = await Post.findAll({
            where: whereClause,
            include: [{ model: User, attributes: ['full_name', 'photo_url'] }],
            order: orderClause
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener posts del mundial' });
    }
});


// Ruta para crear nuevo post 
router.post('/', verificarToken, upload.array('media'), async(req, res) => {
    try {
        const { title, content, id_user, id_world_cup, id_category } = req.body;
        let media_urls = [];

        // Validaciones añadidas por tu compañero
        if(!title || title.trim().length < 3){
            return res.status(400).json({
                error: 'El título debe tener mínimo 3 caracteres'
            });
        }

        if(!content || content.trim().length < 5){
            return res.status(400).json({
                error: 'El contenido debe tener mínimo 5 caracteres'
            });
        }

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

// Editar post
router.put('/:id', verificarToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body;
        const id_user = req.user.id; // Extraído de forma segura del token

        const post = await Post.findByPk(postId);

        if (!post) { return res.status(404).json({ error: 'Post no encontrado' }); }
        
        // Verificación segura de identidad
        if (post.id_user != req.user.id) { 
            return res.status(403).json({ error: 'No tienes permiso para editar este post' }); 
        }

        await post.update({ title, content });
        res.json({ message: 'Post actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el post' });
    }
});

//Eliminar post
router.delete('/:id', verificarToken, async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findByPk(postId);

        if (!post) { return res.status(404).json({ error: 'Post no encontrado' }); }
        
        // Verificación segura de identidad
        if (post.id_user != req.user.id) { 
            return res.status(403).json({ error: 'No tienes permiso para eliminar este post' }); 
        }

        await post.destroy();
        res.json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
});

//Banear post por el admin
router.patch('/:id/toggle-ban', verificarToken, async (req, res) => {
    try {
        const postId = req.params.id;

        // Buscar usuario basándose en el token
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar admin
        if (user.id_user_type != 2) {
            return res.status(403).json({ error: 'No tienes permisos' });
        }

        // Buscar post
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        // Alternar estado de aprobación
        const nuevoEstado = !post.is_approved;

        await post.update({
            is_approved: nuevoEstado,
            approved_at: nuevoEstado ? new Date() : null
        });

        res.json({
            message: nuevoEstado ? 'Post baneado' : 'Post desbaneado',
            is_approved: nuevoEstado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cambiar estado del post' });
    }
});

export default router;