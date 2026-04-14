import express from 'express';
import Reaction from '../ORM/reactionsORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const reactions= await Reaction.findAll();
    res.json(reactions);
});

router.get('/post/:postId/count', async (req, res) => {
    const { postId } = req.params;

    try {
        const likes = await Reaction.count({
            where: { id_post: postId, type: "like" }
        });

        const dislikes = await Reaction.count({
            where: { id_post: postId, type: "dislike" }
        });

        res.json({ likes, dislikes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error contando reacciones" });
    }
});

router.get('/:id',async(req, res) => {
    const reactions= await Reaction.findByPk(req.params.id);
    res.json(reactions);
});

router.post('/', async (req, res) => {
    const { id_user, id_post, type } = req.body;

    try {
        const existing = await Reaction.findOne({
            where: { id_user, id_post }
        });

        
        if (!existing) {
            const newReaction = await Reaction.create({
                id_user,
                id_post,
                type
            });
            return res.json({ action: "created", reaction: newReaction });
        }

        
        if (existing.type === type) {
            await existing.destroy();
            return res.json({ action: "deleted" });
        }

        
        await existing.update({ type });
        return res.json({ action: "updated", reaction: existing });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en reacción" });
    }
});

router.patch('/:id',async(req, res) => {
    const reactions=await Reaction.findByPk(req.params.id);
    await reactions.update(req.body);

    
    res.json({ message: "updated" });
});

router.delete('/:id',async(req, res) => {
    const reactions=await Reaction.findByPk(req.params.id);
 

    await reactions.destroy();
    res.json({ message: "deleted" });
});

export default router;
