import express from 'express';
import Friendship from './ORM/amistades.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const friendships= await Friendship.findAll();
    res.json(friendships);
});

router.get('/:id',async(req, res) => {
    const friendships= await Friendship.findByPk(req.params.id);
    res.json(friendships);
});

router.post('/',async(req, res) => {
    const {requester_id,
        receiver_id,
        status,
        request_date}=req.body;
    const newFriendship=await Friendship.create({
        requester_id,
        receiver_id,
        status,
        request_date
    });
    res.send(`Friendship created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const friendships=await Friendship.findByPk(req.params.id);
    await friendships.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const friendships=await Friendship.findByPk(req.params.id);
 

    await friendships.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;