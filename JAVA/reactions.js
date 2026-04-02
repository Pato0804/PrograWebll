import express from 'express';
import Reaction from '../ORM/reactionsORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const reactions= await Reaction.findAll();
    res.json(reactions);
});

router.get('/:id',async(req, res) => {
    const reactions= await Reaction.findByPk(req.params.id);
    res.json(reactions);
});

router.post('/',async(req, res) => {
    const {id_user,id_post,type,created_at}=req.body;
    const newReaction=await Reaction.create({
        id_user,id_post,type,created_at
    });
    res.send(`Reaction created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const reactions=await Reaction.findByPk(req.params.id);
    await reactions.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const reactions=await Reaction.findByPk(req.params.id);
 

    await reactions.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
