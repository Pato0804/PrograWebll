import express from 'express';
import Comment from '../ORM/commentsORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const comments= await Comment.findAll();
    res.json(comments);
});


router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { id_post: req.params.postId },
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

router.post('/', async (req, res) => {
    try {
        const { content, id_user, id_post,created_at } = req.body;

        if (!content || !id_user || !id_post) {
            return res.status(400).json({ error: 'Faltan datos' });
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



router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        const { content, id_user } = req.body;

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

router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        const { id_user } = req.body;

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
