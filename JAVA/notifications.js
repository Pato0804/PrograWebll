import express from 'express';
import Notification from '../ORM/notificationsORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const notifications= await Notification.findAll();
    res.json(notifications);
});

router.get('/:id',async(req, res) => {
    const notifications= await Notification.findByPk(req.params.id);
    res.json(notifications);
});

router.post('/',async(req, res) => {
    const {id_user,message,type,is_read,created_at}=req.body;
    const newNotificacion=await Notification.create({
        id_user,message,type,is_read,created_at
    });
    res.send(`Notification created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const notifications=await Notification.findByPk(req.params.id);
    await notifications.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const notifications=await Notification.findByPk(req.params.id);
 

    await notifications.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
