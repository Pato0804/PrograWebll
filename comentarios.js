import express from 'express';
import Comment from './ORM/comentarios.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const comments= await Comment.findAll();
    res.json(comments);
});

router.get('/:id',async(req, res) => {
    const comments= await Comment.findByPk(req.params.id);
    res.json(comments);
});

router.post('/',async(req, res) => {
    const {content,created_at,id_user,id_post,pais}=req.body;
    const newComment=await Comment.create({
        content,
        created_at,
        id_user,
        id_post,
        pais
    });
    res.send(`Comment created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const comments=await Comment.findByPk(req.params.id);
    await comments.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const comments=await Comment.findByPk(req.params.id);
 

    await comments.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
