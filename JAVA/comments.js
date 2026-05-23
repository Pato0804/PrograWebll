import express from 'express';
import Comment from '../ORM/commentsORM.js';
import User from '../ORM/usersORM.js';
import { verificarToken } from '../JAVA/middlewares/authMiddleware.js';
const router =express.Router();



router.get('/',async(req, res) => {
    const comments= await Comment.findAll();
    res.json(comments);
});


//esta es la relación entre Comment y User para poder incluir los datos del usuario en las consultas de comentarios
Comment.belongsTo(User, { foreignKey: 'id_user' });

router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { id_post: req.params.postId },
            //Incluimos los datos del usuario
            include: [{ model: User, attributes: ['full_name', 'photo_url'] }],
            order: [['created_at', 'ASC']]
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
});

router.get('/:id',async(req, res) => {
    const comments= await Comment.findByPk(req.params.id);
    res.json(comments);
});

router.post('/', verificarToken, async (req, res) => {
    try {
        const { content,  id_post,created_at } = req.body;
const id_user = req.user.id;
        if (!content || !id_user || !id_post) {
            return res.status(400).json({ error: 'Faltan datos' });
        }
if(!content || content.trim().length < 2){

    return res.status(400).json({
        error:'Comentario demasiado corto'
    });

}
        const newComment = await Comment.create({
            content,
            id_user,
            id_post,
            created_at
        });

        res.json(newComment);

    } catch (error) {
        console.error("ERROR CREANDO COMENTARIO:", error);
        res.status(500).json({ error: 'Error al crear comentario' });
    }
});



router.put('/:id',verificarToken, async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        const { content } = req.body;
        const id_user = req.user.id;

        if (!comment) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        if (comment.id_user != id_user) {
            return res.status(403).json({ error: 'No puedes editar este comentario' });
        }

        await comment.update({ content });

        res.json({ message: 'Comment upgraded' });

    } catch (error) {
        res.status(500).json({ error: 'Error al editar comentario' });
    }
});

router.delete('/:id', verificarToken,async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        const id_user = req.user.id;

        if (!comment) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        if (comment.id_user != id_user) {
            return res.status(403).json({ error: 'No puedes eliminar este comentario' });
        }

        await comment.destroy();

        res.json({ message: 'Comment deleted' });

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar comentario' });
    }
});





export default router;
