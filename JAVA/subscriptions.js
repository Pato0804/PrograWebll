import express from 'express';
import Subscription from '../ORM/subscriptionsORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const subscriptions= await Subscription.findAll();
    res.json(subscriptions);
});

router.get('/:id',async(req, res) => {
    const subscriptions= await Subscription.findByPk(req.params.id);
    res.json(subscriptions);
});

router.post('/',async(req, res) => {
    const {id_user,id_world_cup,subscription_date}=req.body;
    const newSubscription=await Subscription.create({
        id_user,id_world_cup,subscription_date
    });
    res.send(`Subscription created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const subscriptions=await Subscription.findByPk(req.params.id);
    await subscriptions.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const subscriptions=await Subscription.findByPk(req.params.id);
 

    await subscriptions.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
