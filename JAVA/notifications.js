import express from 'express';
import Notification from '../ORM/notificationsORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const notifications= await Notification.findAll();
    res.json(notifications);
});
// jalaba todo, para eso es este, para que jale solo las notis del usuario
router.get('/user/:id_user', async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { id_user: req.params.id_user },
            order: [['created_at', 'DESC']] 
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).send("Error al obtener registros");
    }
});
router.get('/:id',async(req, res) => {
    const notifications= await Notification.findByPk(req.params.id);
    res.json(notifications);
});

router.post('/', async(req, res) => {
    try {
        const { id_user, message, type, is_read } = req.body; 
        const newNotificacion = await Notification.create({
            id_user, 
            message, 
            type, 
            is_read: is_read || false
        });
        res.send(`Notification created successfully xd`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno: " + error.message);
    }
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
